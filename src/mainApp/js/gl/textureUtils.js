'use strict';

/**
 * Utility class providing static methods for creating, updating, and managing video textures in WebGL.
 */
export class TextureUtils {
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
        // FIXME note regarding inability to use texSubImage2D due to a Chromium bug.
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
        // FIXME note regarding inability to use texSubImage2D due to a Chromium bug.
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
}