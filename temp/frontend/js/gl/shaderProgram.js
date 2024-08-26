'use strict';

/**
 * Represents a shader program, encapsulating vertex and fragment shaders in WebGL.
 */
export class ShaderProgram {
    /**
     * The WebGL rendering context for WebGL API calls.
     * @type {WebGLRenderingContext}
     */
    gl;

    /**
     * Path to the vertex shader source file.
     * @type {string}
     */
    vertexPath;

    /**
     * Path to the fragment shader source file.
     * @type {string}
     */
    fragmentPath;

    /**
     * Compiled vertex shader. Null until compiled successfully.
     * @type {?WebGLShader}
     */
    vertexShader = null;

    /**
     * Compiled fragment shader. Null until compiled successfully.
     * @type {?WebGLShader}
     */
    fragmentShader = null;

    /**
     * WebGL program combining the shaders. Null until shaders are linked successfully.
     * @type {?WebGLProgram}
     */
    glShaderProgram = null;

    /**
     * Creates a ShaderProgram instance.
     * @param {WebGLRenderingContext} gl - The WebGL context.
     * @param {string} vertexPath - Path to the vertex shader file.
     * @param {string} fragmentPath - Path to the fragment shader file.
     */
    constructor(gl, vertexPath, fragmentPath) {
        this.gl = gl;
        this.vertexPath = vertexPath;
        this.fragmentPath = fragmentPath;
    }

    /**
     * Initializes the shader program by loading, compiling, and creating the shader program.
     * @returns {Promise<WebGLProgram>} A promise resolving to the created shader program.
     */
    async init() {
        const vertexCode = await this.fetchShaderCode(this.vertexPath);
        const fragmentCode = await this.fetchShaderCode(this.fragmentPath);

        this.vertexShader = this.compileShader(this.gl.VERTEX_SHADER, vertexCode);
        this.fragmentShader = this.compileShader(this.gl.FRAGMENT_SHADER, fragmentCode);

        this.glShaderProgram = this.createShaderProgram();
        return this.glShaderProgram;
    }

    /**
     * Fetches shader code from the specified path.
     * @param {string} path - File path for the shader code.
     * @returns {Promise<string>} A promise resolving to the shader code as a string.
     */
    async fetchShaderCode(path) {
        const response = await fetch(path);
        return await response.text();
    }

    /**
     * Compiles a shader from the provided GLSL source code.
     * @param {number} type - Type of the shader (VERTEX_SHADER or FRAGMENT_SHADER).
     * @param {string} source - GLSL source code for the shader.
     * @returns {?WebGLShader} The compiled shader or null if compilation fails.
     */
    compileShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('An error occurred compiling the shaders: ' + this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    /**
     * Creates and links the shader program using the compiled shaders.
     * @returns {?WebGLProgram} The linked shader program or null if linking fails.
     */
    createShaderProgram() {
        const program = this.gl.createProgram();
        this.gl.attachShader(program, this.vertexShader);
        this.gl.attachShader(program, this.fragmentShader);
        this.gl.linkProgram(program);

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error('Unable to initialize the shader program: ' + this.gl.getProgramInfoLog(program));
            return null;
        }

        return program;
    }
}