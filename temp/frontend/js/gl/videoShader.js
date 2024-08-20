'use strict';

import {ShaderProgram} from './shaderProgram.js';

export class VideoShader extends ShaderProgram {
    constructor(gl, vertexPath, fragmentPath) {
        super(gl, vertexPath, fragmentPath);
    }

    /**
     * Binds textures to the shader.
     * @param {WebGLTexture} textureDay - The texture for u_textureDay.
     * @param {WebGLTexture} textureHeat - The texture for u_textureHeat.
     */
    bindTextures(textureDay, textureHeat) {
        // Ensure the shader program is in use
        this.gl.useProgram(this.glShaderProgram);

        // Bind the day texture to texture unit 0
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, textureDay);
        this.gl.uniform1i(this.gl.getUniformLocation(this.glShaderProgram, 'u_textureDay'), 0);

        // Bind the heat texture to texture unit 1
        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, textureHeat);
        this.gl.uniform1i(this.gl.getUniformLocation(this.glShaderProgram, 'u_textureHeat'), 1);
    }
}