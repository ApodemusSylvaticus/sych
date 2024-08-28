'use strict';

import {TextureUtils} from './textureUtils.js';

/**
 * Manages textures for a WebGL context, specifically for day and heat map textures.
 * Handles creation, updating, and setup of these textures.
 */
export class TextureManager {
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
}