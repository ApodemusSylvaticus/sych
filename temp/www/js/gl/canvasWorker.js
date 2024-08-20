"use strict";
(() => {
  // frontend/js/gl/shaderProgram.js
  var ShaderProgram = class {
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
        console.error("An error occurred compiling the shaders: " + this.gl.getShaderInfoLog(shader));
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
        console.error("Unable to initialize the shader program: " + this.gl.getProgramInfoLog(program));
        return null;
      }
      return program;
    }
  };

  // frontend/js/gl/shaderManager.js
  var ShaderManager = class {
    /**
     * @private
     * @type {WebGL2RenderingContext}
     */
    #gl;
    /**
     * @private
     * @type {Map<string, ShaderProgram>}
     */
    #shaderPrograms;
    /**
     * Creates an instance of ShaderManager.
     * @param {WebGL2RenderingContext} gl - The WebGL context.
     */
    constructor(gl) {
      this.#gl = gl;
      this.#shaderPrograms = /* @__PURE__ */ new Map();
    }
    /**
     * Creates and initializes shader programs from a list of shader specifications.
     * @param {{name: string, vertexPath: string, fragmentPath: string}[]} shaderSpecs - An array of objects, each containing the name, vertex shader path, and fragment shader path.
     * @param {Function} ShaderConstructor - The constructor function for creating new shader programs.
     * @returns {Promise<Map<string, ShaderProgram>>} A promise that resolves to a map of created ShaderProgram instances, indexed by their names.
     */
    async createShaderPrograms(shaderSpecs, ShaderConstructor) {
      const programPromises = shaderSpecs.map(async ({
        name,
        vertexPath,
        fragmentPath
      }) => {
        const shaderProgram = new ShaderConstructor(this.#gl, vertexPath, fragmentPath);
        await shaderProgram.init();
        return { name, shaderProgram };
      });
      const programs = await Promise.all(programPromises);
      programs.forEach(({ name, shaderProgram }) => {
        this.#shaderPrograms.set(name, shaderProgram);
      });
      return this.#shaderPrograms;
    }
    /**
     * Retrieves a shader program by its name.
     * @param {string} name - The name of the shader program.
     * @returns {ShaderProgram|null} The requested ShaderProgram, or null if not found.
     */
    getShaderProgram(name) {
      return this.#shaderPrograms.get(name);
    }
    /**
     * Deletes all shader programs managed by this ShaderManager.
     */
    destructor() {
      for (const [_, program] of this.#shaderPrograms) {
        this.#gl.deleteProgram(program.glShaderProgram);
      }
      this.#shaderPrograms.clear();
    }
  };

  // frontend/js/gl/widget.js
  var Widget = class _Widget {
    /**
     * @type {Float32Array} Internal storage for position [x, y].
     * @private
     */
    #position;
    /**
     * @type {Float32Array} Internal storage for size [width, height].
     * @private
     */
    #size;
    /**
     * @type {number} Internal storage for z-level.
     * @private
     */
    #z;
    /**
     * @type {Float32Array} Internal storage for bounding box [x, y, width, height].
     * @private
     */
    #bbox;
    /**
     * Creates a widget.
     * @param {number} x - The x coordinate of the widget.
     * @param {number} y - The y coordinate of the widget.
     * @param {number} width - The width of the widget.
     * @param {number} height - The height of the widget.
     * @throws {TypeError} If an instance of the base class Widget is directly created.
     */
    constructor(x, y, width, height) {
      if (new.target === _Widget) {
        throw new TypeError("Cannot construct instances of abstract class Widget.");
      }
      this.#position = new Float32Array([x, y]);
      this.#size = new Float32Array([width, height]);
      this.#z = 0;
      this.#bbox = new Float32Array(4);
      this._updateBBox();
    }
    /**
     * Gets the bounding box of the widget.
     * @returns {Float32Array} The bounding box as a typed array.
     */
    get bbox() {
      return this.#bbox;
    }
    /**
     * Gets or sets the z-level of the widget.
     */
    get z() {
      return this.#z;
    }
    set z(newZ) {
      this.#z = newZ;
    }
    /**
     * Gets or sets the x-coordinate of the widget's position.
     */
    get x() {
      return this.#position[0];
    }
    set x(newX) {
      this.#position[0] = newX;
      this._updateBBox();
    }
    /**
     * Gets or sets the y-coordinate of the widget's position.
     */
    get y() {
      return this.#position[1];
    }
    set y(newY) {
      this.#position[1] = newY;
      this._updateBBox();
    }
    /**
     * Gets or sets the width of the widget.
     */
    get width() {
      return this.#size[0];
    }
    set width(newWidth) {
      this.#size[0] = newWidth;
      this._updateBBox();
    }
    /**
     * Gets or sets the height of the widget.
     */
    get height() {
      return this.#size[1];
    }
    set height(newHeight) {
      this.#size[1] = newHeight;
      this._updateBBox();
    }
    /**
     * Moves the widget to a new position.
     * @param {number} newX - The new x coordinate.
     * @param {number} newY - The new y coordinate.
     */
    move(newX, newY) {
      this.x = newX;
      this.y = newY;
    }
    /**
     * Resizes the widget to a new size.
     * @param {number} newWidth - The new width.
     * @param {number} newHeight - The new height.
     */
    resize(newWidth, newHeight) {
      this.width = newWidth;
      this.height = newHeight;
    }
    /**
     * Abstract method to render the widget.
     * @throws {Error} If the method is not implemented by the subclass.
     */
    render() {
      throw new Error("Method 'render()' must be implemented by subclasses.");
    }
    /**
     * Abstract method to delete the widget.
     * @throws {Error} If the method is not implemented by the subclass.
     */
    delete() {
      throw new Error("Method 'delete()' must be implemented by subclasses.");
    }
    /**
     * Updates the bounding box based on the current position and size.
     * @private
     */
    _updateBBox() {
      this.#bbox.set([...this.#position, ...this.#size]);
    }
  };

  // frontend/js/gl/videoShader.js
  var VideoShader = class extends ShaderProgram {
    constructor(gl, vertexPath, fragmentPath) {
      super(gl, vertexPath, fragmentPath);
    }
    /**
     * Binds textures to the shader.
     * @param {WebGLTexture} textureDay - The texture for u_textureDay.
     * @param {WebGLTexture} textureHeat - The texture for u_textureHeat.
     */
    bindTextures(textureDay, textureHeat) {
      this.gl.useProgram(this.glShaderProgram);
      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.bindTexture(this.gl.TEXTURE_2D, textureDay);
      this.gl.uniform1i(this.gl.getUniformLocation(this.glShaderProgram, "u_textureDay"), 0);
      this.gl.activeTexture(this.gl.TEXTURE1);
      this.gl.bindTexture(this.gl.TEXTURE_2D, textureHeat);
      this.gl.uniform1i(this.gl.getUniformLocation(this.glShaderProgram, "u_textureHeat"), 1);
    }
  };

  // frontend/js/gl/videoFrameRect.js
  var VideoFrameRect = class extends Widget {
    gl = null;
    shader = null;
    /**
     * Creates a VideoFrameRect widget.
     * @param {WebGL2RenderingContext} gl - The WebGL rendering context.
     * @param {VideoShader} shader - The WebGL program to use for rendering.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     * @param {number} width - The width of the widget.
     * @param {number} height - The height of the widget.
     */
    constructor(gl, shader, x, y, width, height) {
      super(x, y, width, height);
      this.gl = gl;
      this.shader = shader;
      this.setupVertices();
      this.initializeBuffer();
    }
    /**
     * Sets up the vertices for the rectangle.
     */
    setupVertices() {
      const bbox = this.bbox;
      this.vertices = new Float32Array([
        bbox[0],
        bbox[1],
        0,
        0,
        // x, y
        bbox[0] + bbox[2],
        bbox[1],
        1,
        0,
        // x + width, y
        bbox[0],
        bbox[1] + bbox[3],
        0,
        1,
        // x, y + height
        bbox[0] + bbox[2],
        bbox[1],
        1,
        0,
        // x + width, y
        bbox[0],
        bbox[1] + bbox[3],
        0,
        1,
        // x, y + height
        bbox[0] + bbox[2],
        bbox[1] + bbox[3],
        1,
        1
        // x + width, y + height
      ]);
    }
    /**
     * Initializes the buffer for the vertices.
     */
    initializeBuffer() {
      this.vbo = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertices, this.gl.STATIC_DRAW);
      this.setupAttributes();
    }
    /**
     * Updates the buffer with the new vertex data.
     */
    updateBuffer() {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);
      this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.vertices);
    }
    /**
     * Sets up the vertex attributes for position and texture coordinates.
     */
    setupAttributes() {
      const gl = this.gl;
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 16, 0);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 16, 8);
      gl.enableVertexAttribArray(1);
    }
    /**
     * Resizes the widget and updates the vertex buffer.
     * @param {number} width - The new width.
     * @param {number} height - The new height.
     */
    resize(width, height) {
      super.resize(width, height);
      this.setupVertices();
      this.updateBuffer();
    }
    /**
     * Moves the widget and updates the vertex buffer.
     * @param {number} x - The new x coordinate.
     * @param {number} y - The new y coordinate.
     */
    move(x, y) {
      super.move(x, y);
      this.setupVertices();
      this.updateBuffer();
    }
    /**
     * Renders the video frame rectangle.
     */
    render() {
      const gl = this.gl;
      gl.useProgram(this.shader.glShaderProgram);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
      this.setupAttributes();
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    /**
     * Deletes the vertex buffer object.
     */
    delete() {
      this.gl.deleteBuffer(this.vbo);
    }
  };

  // frontend/js/gl/widgetManager.js
  var WidgetManager = class {
    /**
     * Creates a WidgetManager.
     * @param {WebGL2RenderingContext} gl - The WebGL rendering context.
     */
    constructor(gl) {
      this.gl = gl;
      this.widgets = [];
    }
    /**
     * Adds a new VideoFrameRect widget to the manager.
     * @param {VideoShader} shaderProgram - The ShaderProgram object for the widget.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     * @param {number} width - The width of the widget.
     * @param {number} height - The height of the widget.
     * @returns {VideoFrameRect} The newly created widget.
     */
    addVideoRect(shaderProgram, x, y, width, height) {
      const newWidget = new VideoFrameRect(this.gl, shaderProgram, x, y, width, height);
      this.widgets.push(newWidget);
      return newWidget;
    }
    /**
     * Moves a widget to a new position.
     * @param {Widget} widget - The widget to move.
     * @param {number} x - The new x coordinate.
     * @param {number} y - The new y coordinate.
     */
    move(widget, x, y) {
      const index = this.widgets.indexOf(widget);
      if (index !== -1) {
        this.widgets[index].move(x, y);
      }
    }
    /**
     * Resizes a widget.
     * @param {Widget} widget - The widget to resize.
     * @param {number} width - The new width.
     * @param {number} height - The new height.
     */
    resize(widget, width, height) {
      const index = this.widgets.indexOf(widget);
      if (index !== -1) {
        this.widgets[index].resize(width, height);
      }
    }
    /**
     * Sets the z-level for a widget.
     * @param {Widget} widget - The widget to set the z-level for.
     * @param {number} newZLevel - The new z-level.
     */
    setZLevel(widget, newZLevel) {
      const index = this.widgets.indexOf(widget);
      if (index !== -1) {
        this.widgets[index].z = newZLevel;
        this.sortWidgetsByZLevel();
      }
    }
    /**
     * Sorts widgets by their z-level.
     */
    sortWidgetsByZLevel() {
      this.widgets.sort((a, b) => a.z - b.z);
    }
    /**
     * Deletes a widget.
     * @param {Widget} widget - The widget to delete.
     */
    delete(widget) {
      const index = this.widgets.indexOf(widget);
      if (index !== -1) {
        this.widgets[index].delete();
        this.widgets.splice(index, 1);
      }
    }
    /**
     * Deletes all widgets.
     */
    delete_all() {
      this.widgets.forEach((widget) => widget.delete());
      this.widgets = [];
    }
    /**
     * Deletes all widgets.
     */
    destructor() {
      this.widgets.forEach((widget) => widget.delete());
      this.widgets = [];
    }
    /**
     * Renders all widgets.
     */
    render() {
      this.widgets.forEach((widget) => widget.render());
    }
  };

  // frontend/js/gl/textureUtils.js
  var TextureUtils = class {
    /**
     * Creates a new video texture.
     * @param {WebGL2RenderingContext} gl - The WebGL rendering context.
     * @param {number} width - The width of the texture.
     * @param {number} height - The height of the texture.
     * @returns {WebGLTexture} The created video texture.
     */
    static createVideoTexture(gl, width, height) {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      this.#setupVideoTexture(gl, width, height);
      return texture;
    }
    /**
     * Updates a day video texture with new frame data.
     * @param {WebGL2RenderingContext} gl - The WebGL rendering context.
     * @param {WebGLTexture} texture - The texture to update.
     * @param {number} width - The width of the texture.
     * @param {number} height - The height of the texture.
     * @param {VideoFrame} frame - The new frame data for the texture.
     */
    static updateVideoTextureDay(gl, texture, width, height, frame) {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width, height, 0, gl.RGB, gl.UNSIGNED_BYTE, frame);
    }
    /**
     * Updates a heat map video texture with new frame data.
     * @param {WebGL2RenderingContext} gl - The WebGL rendering context.
     * @param {WebGLTexture} texture - The texture to update.
     * @param {number} width - The width of the texture.
     * @param {number} height - The height of the texture.
     * @param {VideoFrame} frame - The new frame data for the texture.
     */
    static updateVideoTextureHeat(gl, texture, width, height, frame) {
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width, height, 0, gl.RGB, gl.UNSIGNED_BYTE, frame);
    }
    /**
     * Sets up the initial parameters for a video texture.
     * @param {WebGL2RenderingContext} gl - The WebGL rendering context.
     * @param {number} width - The width of the texture.
     * @param {number} height - The height of the texture.
     * @private
     */
    static #setupVideoTexture(gl, width, height) {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width, height, 0, gl.RGB, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
  };

  // frontend/js/gl/textureManager.js
  var TextureManager = class {
    /**
     * The WebGL rendering context used for texture operations.
     * @type {WebGL2RenderingContext}
     * @private
     */
    #ctx;
    /**
     * Texture object for the day frame.
     * @type {?WebGLTexture}
     * @private
     */
    #texture_day;
    /**
     * Texture object for the heat frame.
     * @type {?WebGLTexture}
     * @private
     */
    #texture_heat;
    /**
     * Configuration for the day texture.
     * @type {Object}
     * @private
     */
    #dayConfig;
    /**
     * Configuration for the heat texture.
     * @type {Object}
     * @private
     */
    #heatConfig;
    /**
     * Last processed video frame for the day texture.
     * @type {?VideoFrame}
     * @private
     */
    #last_day_frame;
    /**
     * Last processed video frame for the heat texture.
     * @type {?VideoFrame}
     * @private
     */
    #last_heat_frame;
    /**
     * Flag to indicate if the day frame texture needs updating.
     * @type {boolean}
     * @private
     */
    #dayFrameDirty = false;
    /**
     * Flag to indicate if the heat frame texture needs updating.
     * @type {boolean}
     * @private
     */
    #heatFrameDirty = false;
    /**
     * Initializes the TextureManager with a WebGL context and configurations for day and heat textures.
     * @param {WebGL2RenderingContext} ctx - The WebGL rendering context.
     * @param {Object} dayConfig - Configuration for the day texture.
     * @param {Object} heatConfig - Configuration for the heat texture.
     */
    constructor(ctx, dayConfig, heatConfig) {
      this.#ctx = ctx;
      this.#dayConfig = dayConfig;
      this.#heatConfig = heatConfig;
      this.initializeTextures();
    }
    /**
     * Initializes textures for day and heat maps using provided configurations.
     * @private
     */
    initializeTextures() {
      this.#texture_day = TextureUtils.createVideoTexture(this.#ctx, this.#dayConfig.codedWidth, this.#dayConfig.codedHeight);
      this.#texture_heat = TextureUtils.createVideoTexture(this.#ctx, this.#heatConfig.codedWidth, this.#heatConfig.codedHeight);
    }
    /**
     * Updates the day texture if the frame data is marked as dirty (changed).
     */
    updateDayTextureIfNeeded() {
      if (this.#dayFrameDirty) {
        TextureUtils.updateVideoTextureDay(this.#ctx, this.#texture_day, this.#dayConfig.codedWidth, this.#dayConfig.codedHeight, this.#last_day_frame);
        this.#dayFrameDirty = false;
      }
    }
    /**
     * Updates the heat texture if the frame data is marked as dirty (changed).
     */
    updateHeatTextureIfNeeded() {
      if (this.#heatFrameDirty) {
        TextureUtils.updateVideoTextureHeat(this.#ctx, this.#texture_heat, this.#heatConfig.codedWidth, this.#heatConfig.codedHeight, this.#last_heat_frame);
        this.#heatFrameDirty = false;
      }
    }
    /**
     * Sets up texture units for rendering. Binds the day and heat textures to their respective texture units.
     */
    setupTextureUnits() {
      this.#ctx.activeTexture(this.#ctx.TEXTURE0);
      this.#ctx.bindTexture(this.#ctx.TEXTURE_2D, this.#texture_day);
      this.#ctx.activeTexture(this.#ctx.TEXTURE1);
      this.#ctx.bindTexture(this.#ctx.TEXTURE_2D, this.#texture_heat);
    }
    /**
     * Gets the texture for the day frame.
     * @returns {WebGLTexture} The day texture.
     */
    getDayTexture() {
      return this.#texture_day;
    }
    /**
     * Gets the texture for the heat frame.
     * @returns {WebGLTexture} The heat texture.
     */
    getHeatTexture() {
      return this.#texture_heat;
    }
    /**
     * Processes a new day frame for rendering, updating the day texture.
     * @param {VideoFrame} frame - The new day frame to be rendered.
     */
    newDayFrame(frame) {
      this.#last_day_frame?.close();
      this.#last_day_frame = frame;
      this.#dayFrameDirty = true;
    }
    /**
     * Processes a new heat frame for rendering, updating the heat texture.
     * @param {VideoFrame} frame - The new heat frame to be rendered.
     */
    newHeatFrame(frame) {
      this.#last_heat_frame?.close();
      this.#last_heat_frame = frame;
      this.#heatFrameDirty = true;
    }
    /**
     * Cleans up resources, specifically textures and frames, when the TextureManager is no longer needed.
     */
    destructor() {
      if (this.#texture_day) {
        this.#ctx.deleteTexture(this.#texture_day);
        this.#texture_day = null;
      }
      if (this.#texture_heat) {
        this.#ctx.deleteTexture(this.#texture_heat);
        this.#texture_heat = null;
      }
      this.#last_day_frame?.close();
      this.#last_heat_frame?.close();
    }
  };

  // frontend/js/gl/webGLRenderer.js
  var LayoutType = {
    HEAT_WITH_DAY_PIP: "heat with day pip",
    DAY_WITH_HEAT_PIP: "day with heat pip",
    DAY: "day",
    HEAT: "heat"
  };
  var WebGLRenderer = class {
    /**
     * @type {HTMLCanvasElement}
     */
    #canvas;
    /**
     * @type {WebGL2RenderingContext}
     */
    #ctx;
    /**
     * @type {ShaderManager}
     */
    #shaderManager;
    /**
     * @type {WidgetManager}
     */
    #widgetManager;
    /**
     * @type {TextureManager}
     */
    #textureManager;
    /**
     * @type {boolean}
     */
    #shadersReady = false;
    /**
     * @type {string}
     */
    #shaderProgramNameDay;
    /**
     * @type {string}
     */
    #shaderProgramNameHeat;
    /**
     * @type {VideoDecoderConfig}
     */
    #heatConfig;
    /**
     * @type {VideoDecoderConfig}
     */
    #dayConfig;
    /**
     * @type {Widget}
     */
    #heatRect;
    /**
     * @type {Widget}
     */
    #dayRect;
    /**
     * @type {LayoutType}
     */
    #layoutType;
    /**
     * Constructs a WebGLRenderer.
     * @param {Object} config - Configuration object.
     * @param {HTMLCanvasElement} config.canvas - The canvas element for rendering.
     * @param {VideoDecoderConfig} config.dayConfig - Configuration for the day shader.
     * @param {VideoDecoderConfig} config.heatConfig - Configuration for the heat shader.
     * @param {LayoutType} layoutType - The layout type for rendering.
     */
    constructor({ canvas, dayConfig, heatConfig }, layoutType = LayoutType.DAY_WITH_HEAT_PIP) {
      this.#canvas = canvas;
      this.#ctx = canvas.getContext("webgl2", {
        antialias: true,
        premultipliedAlpha: false,
        alpha: false
      });
      this.#shaderManager = new ShaderManager(this.#ctx);
      this.#widgetManager = new WidgetManager(this.#ctx);
      this.#heatConfig = heatConfig;
      this.#dayConfig = dayConfig;
      this.#layoutType = layoutType;
      this.#textureManager = new TextureManager(this.#ctx, dayConfig, heatConfig);
      this.#initialize().then(() => {
        this.#shadersReady = true;
        this.#bindShaderTextures();
        this.applyLayout();
      });
    }
    /**
     * Applies the selected layout to the renderer.
     */
    applyLayout() {
      switch (this.#layoutType) {
        case LayoutType.HEAT_WITH_DAY_PIP:
          this.#layoutHWDPIP_init();
          break;
        case LayoutType.DAY_WITH_HEAT_PIP:
          this.#layoutDWHPIP_init();
          break;
        case LayoutType.DAY:
          this.#layoutDay_init();
          break;
        case LayoutType.HEAT:
          this.#layoutHeat_init();
          break;
        default:
          throw new Error("Invalid layout type provided");
      }
    }
    /**
     * Apply next layout.
     */
    NextLayout() {
      switch (this.#layoutType) {
        case LayoutType.HEAT_WITH_DAY_PIP:
          this.#layoutType = LayoutType.DAY_WITH_HEAT_PIP;
          this.#layoutDWHPIP_init();
          break;
        case LayoutType.DAY_WITH_HEAT_PIP:
          this.#layoutType = LayoutType.DAY;
          this.#layoutDay_init();
          break;
        case LayoutType.DAY:
          this.#layoutType = LayoutType.HEAT;
          this.#layoutHeat_init();
          break;
        case LayoutType.HEAT:
          this.#layoutType = LayoutType.HEAT_WITH_DAY_PIP;
          this.#layoutHWDPIP_init();
          break;
        default:
          throw new Error("Invalid layout type provided");
      }
    }
    /**
     * Binds textures to their respective shader programs.
     * @private
     */
    #bindShaderTextures() {
      const textureDay = this.#textureManager.getDayTexture();
      const textureHeat = this.#textureManager.getHeatTexture();
      const shaderProgramDay = this.#shaderManager.getShaderProgram(this.#shaderProgramNameDay);
      shaderProgramDay?.bindTextures(textureDay, textureHeat);
      const shaderProgramHeat = this.#shaderManager.getShaderProgram(this.#shaderProgramNameHeat);
      shaderProgramHeat?.bindTextures(textureDay, textureHeat);
    }
    /**
     * Initializes shaders, textures, and other WebGL settings.
     * @private
     */
    async #initialize() {
      this.#shaderProgramNameDay = "defaultShaderDay";
      this.#shaderProgramNameHeat = "defaultShaderHeat";
      this.#initializeGL();
      await this.#initializeShaders();
      this.#textureManager.setupTextureUnits();
      this.#setCanvasSize();
    }
    /**
     * Initializes and creates shader programs.
     * @private
     */
    async #initializeShaders() {
      await this.#shaderManager.createShaderPrograms([
        {
          name: this.#shaderProgramNameDay,
          vertexPath: "./shaders/vertexShaderDay.glsl",
          fragmentPath: "./shaders/fragmentShaderDay.glsl"
        },
        {
          name: this.#shaderProgramNameHeat,
          vertexPath: "./shaders/vertexShaderHeat.glsl",
          fragmentPath: "./shaders/fragmentShaderHeat.glsl"
        }
      ], VideoShader);
    }
    /**
     * Sets up initial WebGL context state.
     * @private
     */
    #initializeGL() {
      const gl = this.#ctx;
      gl.clearColor(0, 1, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }
    /**
     *
     * @param {VideoDecoderConfig} rectConfig - The configuration for the rectangle widget.
     * @param {Widget} rectWidget - The rectangle widget to update.
     */
    #updateLayout(rectConfig, rectWidget) {
      const canvasAspectRatio = this.#canvas.width / this.#canvas.height;
      const rectAspectRatio = rectConfig.codedWidth / rectConfig.codedHeight;
      let rectWidth, rectHeight;
      if (rectAspectRatio > canvasAspectRatio) {
        rectWidth = this.#canvas.width / 2;
        rectHeight = rectWidth / rectAspectRatio;
      } else {
        rectHeight = this.#canvas.height / 2;
        rectWidth = rectHeight * rectAspectRatio;
      }
      const rectWidthNDC = rectWidth / (this.#canvas.width / 2);
      const rectHeightNDC = rectHeight / (this.#canvas.height / 2);
      const rectXNDC = 1 - rectWidthNDC;
      const rectYNDC = 0.5 - rectHeightNDC;
      if (rectWidget) {
        rectWidget.resize(rectWidthNDC, rectHeightNDC);
        rectWidget.move(rectXNDC, rectYNDC);
      }
    }
    /**
     * Updates the layout for the day widget and heat widget.
     */
    #layoutDWHPIP_update() {
      this.#updateLayout(this.#heatConfig, this.#heatRect);
    }
    /**
     * Updates the layout for the day widget and heat widget.
     */
    #layoutHWDPIP_update() {
      this.#updateLayout(this.#dayConfig, this.#dayRect);
    }
    /**
     * Initializes widgets for rendering with proper positioning and sizing.
     * The day widget is maximized to cover the entire canvas, while the heat widget
     * is placed at half size in the top right corner. Heat widget maintains its
     * aspect ratios.
     * @private
     */
    #layoutDWHPIP_init() {
      const shaderProgramDay = this.#shaderManager.getShaderProgram(this.#shaderProgramNameDay);
      const shaderProgramHeat = this.#shaderManager.getShaderProgram(this.#shaderProgramNameHeat);
      this.#widgetManager.delete_all();
      const dayWidth = 2;
      const dayHeight = 2;
      this.#dayRect = this.#widgetManager.addVideoRect(shaderProgramDay, -1, -1, dayWidth, dayHeight);
      this.#heatRect = this.#widgetManager.addVideoRect(shaderProgramHeat, 0, 0, 1, 1);
      this.#layoutDWHPIP_update();
    }
    /**
     * Initializes widgets for rendering with proper positioning and sizing.
     * The heat widget is maximized to cover the entire canvas, while the day widget
     * is placed at half size in the top right corner. Heat widget maintains its
     * aspect ratios.
     * @private
     */
    #layoutHWDPIP_init() {
      const shaderProgramDay = this.#shaderManager.getShaderProgram(this.#shaderProgramNameDay);
      const shaderProgramHeat = this.#shaderManager.getShaderProgram(this.#shaderProgramNameHeat);
      this.#widgetManager.delete_all();
      const heatWidth = 2;
      const heatHeight = 2;
      this.#heatRect = this.#widgetManager.addVideoRect(shaderProgramHeat, -1, -1, heatWidth, heatHeight);
      this.#dayRect = this.#widgetManager.addVideoRect(shaderProgramDay, 0, 0, 1, 1);
      this.#layoutHWDPIP_update();
    }
    /**
     * Initializes widgets for rendering with proper positioning and sizing.
     * The day widget is maximized to cover the entire canvas
     * @private
     */
    #layoutDay_init() {
      const shaderProgramDay = this.#shaderManager.getShaderProgram(this.#shaderProgramNameDay);
      this.#widgetManager.delete_all();
      const dayWidth = 2;
      const dayHeight = 2;
      this.#dayRect = this.#widgetManager.addVideoRect(shaderProgramDay, -1, -1, dayWidth, dayHeight);
    }
    /**
     * Initializes widgets for rendering with proper positioning and sizing.
     * The heat widget is maximized to cover the entire canvas
     * @private
     */
    #layoutHeat_init() {
      const shaderProgramHeat = this.#shaderManager.getShaderProgram(this.#shaderProgramNameHeat);
      this.#widgetManager.delete_all();
      const heatWidth = 2;
      const heatHeight = 2;
      this.#heatRect = this.#widgetManager.addVideoRect(shaderProgramHeat, -1, -1, heatWidth, heatHeight);
    }
    /**
     * Sets the canvas to its specified size.
     * @private
     */
    #setCanvasSize() {
      const { width, height } = this.#canvas;
      this.resize(width, height);
    }
    /**
     * Resizes the rendering viewport and updates widget sizes to maintain aspect ratios.
     * @param {number} width - New width of the viewport.
     * @param {number} height - New height of the viewport.
     */
    resize(width, height) {
      this.#canvas.width = width;
      this.#canvas.height = height;
      this.#ctx.viewport(0, 0, width, height);
      switch (this.#layoutType) {
        case LayoutType.HEAT_WITH_DAY_PIP:
          this.#layoutHWDPIP_update();
          break;
        case LayoutType.DAY_WITH_HEAT_PIP:
          this.#layoutDWHPIP_update();
          break;
        default:
          break;
      }
    }
    /**
     * Renders the scene, updating textures and drawing all widgets.
     */
    render() {
      if (!this.#shadersReady) return;
      this.#textureManager.updateDayTextureIfNeeded();
      this.#textureManager.updateHeatTextureIfNeeded();
      this.#ctx.clear(this.#ctx.COLOR_BUFFER_BIT);
      this.#widgetManager.render();
    }
    /**
     * Processes a new day frame for rendering.
     * @param {VideoFrame} frame - The new day frame to be rendered.
     */
    newDayFrame(frame) {
      this.#textureManager.newDayFrame(frame);
    }
    /**
     * Processes a new heat frame for rendering.
     * @param {VideoFrame} frame - The new heat frame to be rendered.
     */
    newHeatFrame(frame) {
      this.#textureManager.newHeatFrame(frame);
    }
    /**
     * Cleans up resources when the renderer is no longer needed.
     */
    destructor() {
      this.#widgetManager.destructor();
      this.#shaderManager.destructor();
      this.#textureManager.destructor();
      if (this.#ctx.getExtension("WEBGL_lose_context")) {
        this.#ctx.getExtension("WEBGL_lose_context").loseContext();
      }
    }
  };
  var webGLRenderer_default = WebGLRenderer;

  // frontend/js/gl/videoSubDecoder.js
  var VideoSubDecoder = class {
    /**
     * Creates an instance of the VideoSubDecoder.
     * @param {string} channelName - The name of the BroadcastChannel used for communication.
     * @param {VideoDecoderConfig} config - The configuration object for the video decoder.
     * @param {function(VideoFrame):void} onFrameCallback - Callback function that is called with a decoded frame.
     * @param {function(string):void} onErrorCallback - Callback function that is called on encountering an error.
     * @param {number} [maxQueueLength=30] - The maximum number of frames that can be queued for decoding.
     */
    constructor(channelName, config, onFrameCallback, onErrorCallback, maxQueueLength = 30) {
      this.channelName = channelName;
      this.config = config;
      this.onFrameCallback = onFrameCallback;
      this.onErrorCallback = onErrorCallback;
      this.maxQueueLength = maxQueueLength;
      this.boundMessageHandler = this.messageHandler.bind(this);
      this.initializeDecoder();
      this.initializeChannel();
    }
    /**
     * Configures the video decoder with the specified settings.
     */
    configureDecoder() {
      if (this.decoder) {
        this.decoder.configure(this.config);
      }
    }
    /**
     * Initializes the video decoder and sets up error handling and queue management.
     */
    initializeDecoder() {
      try {
        this.decoder = new VideoDecoder({
          output: (frame) => {
            this.onFrameCallback(frame);
          },
          error: (e) => {
            this.onErrorCallback("Decoder error: " + e.message);
          }
        });
        this.configureDecoder();
      } catch (e) {
        this.onErrorCallback("Decoder initialization error: " + e.message);
      }
    }
    /**
     * Initializes the BroadcastChannel for communication and sets up message handling.
     */
    initializeChannel() {
      try {
        this.broadcastChannel = new BroadcastChannel(this.channelName);
        this.subscribeChannel();
        this.broadcastChannel.onerror = (e) => {
          this.onErrorCallback("BroadcastChannel error: " + e.message);
        };
      } catch (e) {
        this.onErrorCallback("BroadcastChannel initialization error: " + e.message);
      }
    }
    /**
     * Flag for active subscription to the BroadcastChannel.
     * @type {boolean}
     * @private
     */
    #subscribed = false;
    /**
     * Subscribes to messages from the BroadcastChannel.
     */
    subscribeChannel() {
      if (this.#subscribed) {
        return;
      }
      this.#subscribed = true;
      this.broadcastChannel.addEventListener("message", this.boundMessageHandler);
      this.configureDecoder();
    }
    /**
     * Unsubscribes from messages from the BroadcastChannel and resets the decoder.
     */
    unsubscribeChannel() {
      this.#subscribed = false;
      if (this.broadcastChannel) {
        this.broadcastChannel.removeEventListener("message", this.boundMessageHandler);
        if (this.decoder) {
          this.decoder.reset();
        }
      }
    }
    /**
     * Handles incoming messages from the BroadcastChannel.
     * @param {MessageEvent} message - The message event received from the BroadcastChannel.
     */
    messageHandler(message) {
      if (this.decoder.state === "configured" && this.decoder.decodeQueueSize < this.maxQueueLength) {
        this.processMessage(message);
      } else if (this.decoder.state === "closed") {
        this.initializeDecoder();
      } else {
        console.log("Decoder is busy or not ready.");
      }
    }
    /**
     * Processes incoming messages from the BroadcastChannel and decodes the video chunks.
     * @param {MessageEvent} message - The message event received from the BroadcastChannel.
     */
    processMessage(message) {
      try {
        const chunk = new EncodedVideoChunk({
          type: "key",
          data: message.data,
          timestamp: 0,
          duration: 0
        });
        this.decoder.decode(chunk);
      } catch (decodeError) {
        this.onErrorCallback("Decoding error: " + decodeError.message);
      }
    }
    /**
     * Clears resources associated with the video decoder and the BroadcastChannel.
     */
    clearDecoder() {
      this.unsubscribeChannel();
      if (this.decoder) {
        this.decoder.close();
        this.decoder = null;
      }
      if (this.broadcastChannel) {
        this.broadcastChannel.close();
        this.broadcastChannel = null;
      }
    }
    destructor() {
      this.clearDecoder();
    }
  };

  // frontend/js/gl/canvasWorker.js
  var renderer = null;
  var videoDayDecoder = null;
  var videoHeatDecoder = null;
  var workerState = "stopped";
  onmessage = async function(event) {
    const data = event.data;
    if (!isCommandValid(data.type)) {
      console.error(`Invalid command '${data.type}' in state '${workerState}'`);
      return;
    }
    switch (data.type) {
      case "init":
        initializeCanvas(data.canvas, data.dayConfig, data.heatConfig);
        workerState = "running";
        console.log("Worker initialized and now running.");
        break;
      case "resize":
        if (renderer) {
          renderer.resize(data.width, data.height);
        }
        workerState = "running";
        break;
      case "animationFrame":
        if (renderer) {
          renderer.render();
        }
        workerState = "running";
        break;
      case "suspend":
        unsubscribeDecoders();
        workerState = "suspended";
        console.log("Worker suspended.");
        break;
      case "resume":
        if (workerState === "suspended") {
          subscribeDecoders();
          workerState = "running";
          console.log("Worker resumed.");
        }
        break;
      case "cleanUpResources":
        cleanUpResources();
        workerState = "stopped";
        break;
      case "nextLayout":
        if (renderer) {
          renderer.NextLayout();
        }
        workerState = "running";
        break;
      default:
        console.error("Unknown message type:", data.type);
    }
  };
  function isCommandValid(commandType) {
    switch (commandType) {
      case "init":
        return workerState === "stopped";
      case "suspend":
      case "resize":
      case "animationFrame":
      case "nextLayout":
        return workerState === "running";
      case "resume":
        return workerState === "suspended";
      case "cleanUpResources":
        return true;
      default:
        return false;
    }
  }
  function initializeCanvas(canvas, dayConfig, heatConfig) {
    if (!canvas) {
      console.error("Canvas not provided to worker.");
      return;
    }
    canvas.addEventListener("webglcontextlost", handleContextLost, false);
    canvas.addEventListener("webglcontextrestored", () => reinitializeRenderer(canvas, dayConfig, heatConfig), false);
    renderer = new webGLRenderer_default({
      canvas,
      dayConfig,
      heatConfig
    });
    initializeDecoders(dayConfig, heatConfig);
  }
  function initializeDecoders(dayConfig, heatConfig) {
    try {
      videoDayDecoder = new VideoSubDecoder("videoDay", dayConfig, (frame) => renderer.newDayFrame(frame), handleError);
      videoHeatDecoder = new VideoSubDecoder("videoHeat", heatConfig, (frame) => renderer.newHeatFrame(frame), handleError);
      subscribeDecoders();
    } catch (error) {
      handleError(error);
    }
  }
  function handleContextLost(event) {
    event.preventDefault();
    console.log("Cleaning up resources due to context loss.");
    cleanUpResources();
    postMessage({ type: "contextLost" });
    self.close();
  }
  function reinitializeRenderer(canvas, dayConfig, heatConfig) {
    renderer = new webGLRenderer_default({
      canvas,
      dayConfig,
      heatConfig
    });
    initializeDecoders(dayConfig, heatConfig);
  }
  function subscribeDecoders() {
    if (videoDayDecoder) {
      videoDayDecoder.subscribeChannel();
    }
    if (videoHeatDecoder) {
      videoHeatDecoder.subscribeChannel();
    }
  }
  function unsubscribeDecoders() {
    if (videoDayDecoder) {
      videoDayDecoder.unsubscribeChannel();
    }
    if (videoHeatDecoder) {
      videoHeatDecoder.unsubscribeChannel();
    }
  }
  function handleError(error) {
    console.error(error);
  }
  function cleanUpResources() {
    console.log("Cleaning up resources...");
    unsubscribeDecoders();
    if (renderer) {
      renderer.destructor();
      renderer = null;
    }
    if (videoDayDecoder) {
      videoDayDecoder.destructor();
      videoDayDecoder = null;
    }
    if (videoHeatDecoder) {
      videoHeatDecoder.destructor();
      videoHeatDecoder = null;
    }
  }
})();
