'use strict';

import {Widget} from './widget.js';
import {VideoShader} from './videoShader.js';

/**
 * Represents a video frame rectangle widget, extending the basic widget functionality.
 * It manages the vertex buffer and rendering specific to displaying a video frame.
 */
export class VideoFrameRect extends Widget {
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
            bbox[0], bbox[1], 0.0, 0.0, // x, y
            bbox[0] + bbox[2], bbox[1], 1.0, 0.0, // x + width, y
            bbox[0], bbox[1] + bbox[3], 0.0, 1.0, // x, y + height

            bbox[0] + bbox[2], bbox[1], 1.0, 0.0, // x + width, y
            bbox[0], bbox[1] + bbox[3], 0.0, 1.0, // x, y + height
            bbox[0] + bbox[2], bbox[1] + bbox[3], 1.0, 1.0 // x + width, y + height
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
}