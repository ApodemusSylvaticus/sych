'use strict';

import {ShaderProgram} from './shaderProgram.js';

/**
 * Manages creation, linking, and deletion of shader programs.
 */
export class ShaderManager {
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
        this.#shaderPrograms = new Map();
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

            return {name, shaderProgram};
        });

        const programs = await Promise.all(programPromises);

        programs.forEach(({name, shaderProgram}) => {
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
}
