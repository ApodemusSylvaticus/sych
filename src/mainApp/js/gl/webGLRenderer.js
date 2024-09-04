import { ShaderManager } from './shaderManager.js';
import { WidgetManager } from './widgetManager.js';
import { TextureManager } from './textureManager.js';
import { VideoShader } from './videoShader.js';

/**
 * @enum {string}
 */
export const ChannelType = {
    DAY: 'DAY',
    HEAT: 'HEAT'
};

/**
 * Manages WebGL rendering, including shaders, widgets, and textures.
 */
export class WebGLRenderer {
    #canvas;
    #gl;
    #shaderManager;
    #widgetManager;
    #textureManager;
    #isInitialized = false;
    #dayShaderName = 'dayShader';
    #heatShaderName = 'heatShader';
    #dayConfig;
    #heatConfig;

    /**
     * Constructs a WebGLRenderer.
     * @param {OffscreenCanvas} canvas - The canvas element for rendering.
     * @param {VideoDecoderConfig} dayConfig - Configuration for the day video.
     * @param {VideoDecoderConfig} heatConfig - Configuration for the heat video.
     */
    constructor(canvas, dayConfig, heatConfig) {
        this.#canvas = canvas;
        this.#gl = canvas.getContext('webgl2', {
            antialias: true,
            premultipliedAlpha: false,
            alpha: false
        });
        this.#shaderManager = new ShaderManager(this.#gl);
        this.#widgetManager = new WidgetManager(this.#gl);
        this.#dayConfig = dayConfig;
        this.#heatConfig = heatConfig;
        this.#textureManager = new TextureManager(this.#gl, dayConfig, heatConfig);
    }

    /**
     * Returns whether the renderer is fully
     * @returns {boolean}
     */
    get isInitialized() {
        return this.#isInitialized;
    }

    /**
     * Initializes the renderer.
     * @prublic
     */
    async initialize() {
        this.#initializeGL();
        await this.#initializeShaders();
        this.#textureManager.setupTextureUnits();
        this.#isInitialized = true;
        postMessage({ type: 'ready' });
    }

    /**
     * Sets up initial WebGL context state.
     * @private
     */
    #initializeGL() {
        this.#gl.clearColor(0.0, 0.0, 0.0, 0.0);
        this.#gl.enable(this.#gl.BLEND);
        this.#gl.blendFunc(this.#gl.SRC_ALPHA, this.#gl.ONE_MINUS_SRC_ALPHA);
    }

    /**
     * Initializes and creates shader programs.
     * @private
     */
    async #initializeShaders() {
        await this.#shaderManager.createShaderPrograms([
            {
                name: this.#dayShaderName,
                vertexPath: './shaders/vertexShaderDay.glsl',
                fragmentPath: './shaders/fragmentShaderDay.glsl'
            },
            {
                name: this.#heatShaderName,
                vertexPath: './shaders/vertexShaderHeat.glsl',
                fragmentPath: './shaders/fragmentShaderHeat.glsl'
            }
        ], VideoShader);

        this.#bindShaderTextures();
    }

    /**
     * Binds textures to their respective shader programs.
     * @private
     */
    #bindShaderTextures() {
        const textureDay = this.#textureManager.getDayTexture();
        const textureHeat = this.#textureManager.getHeatTexture();

        const dayShader = this.#shaderManager.getShaderProgram(this.#dayShaderName);
        const heatShader = this.#shaderManager.getShaderProgram(this.#heatShaderName);

        dayShader?.bindTextures(textureDay, textureHeat);
        heatShader?.bindTextures(textureDay, textureHeat);
    }

    /**
     * Creates a new video quad.
     * @param {string} name - The name of the video quad.
     * @param {ChannelType} channelType - The type of channel (DAY or HEAT).
     * @param {QuadProperties} properties - The properties of the quad.
     */
    videoQuadCreate(name, channelType, properties) {
        if (!this.#isInitialized) {
            console.warn("Cannot create video quad: Renderer not fully initialized.");
            return;
        }

        const shader = channelType === ChannelType.DAY ?
            this.#shaderManager.getShaderProgram(this.#dayShaderName) :
            this.#shaderManager.getShaderProgram(this.#heatShaderName);

        if (!shader) {
            console.error(`Shader not found for channel type: ${channelType}`);
            return;
        }

        this.#widgetManager.addVideoRect(name, shader,
            properties.x, properties.y,
            properties.width, properties.height,
            properties.zIndex);
    }

    /**
     * Destroys an existing video quad.
     * @param {string} name - The name of the video quad to destroy.
     */
    videoQuadDestroy(name) {
        if (!this.#isInitialized) {
            console.warn("Cannot destroy video quad: Renderer not fully initialized.");
            return;
        }

        this.#widgetManager.delete(name);
    }

    /**
     * Updates an existing video quad.
     * @param {string} name - The name of the video quad to update.
     * @param {QuadProperties} properties - The new properties of the quad.
     */
    videoQuadUpdate(name, properties) {
        if (!this.#isInitialized) {
            console.warn("Cannot update video quad: Renderer not fully initialized.");
            return;
        }

        this.#widgetManager.updateWidget(name, properties);
    }

    /**
     * Resizes the rendering viewport.
     * @param {number} width - New width of the viewport.
     * @param {number} height - New height of the viewport.
     */
    resize(width, height) {
        this.#canvas.width = width;
        this.#canvas.height = height;
        this.#gl.viewport(0, 0, width, height);
    }

    /**
     * Renders the scene.
     */
    render() {
        if (!this.#isInitialized) {
            console.warn("Cannot render: Renderer not fully initialized.");
            return;
        }

        this.#textureManager.updateDayTextureIfNeeded();
        this.#textureManager.updateHeatTextureIfNeeded();

        this.#gl.clear(this.#gl.COLOR_BUFFER_BIT);
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

        const loseContext = this.#gl.getExtension('WEBGL_lose_context');
        if (loseContext) {
            loseContext.loseContext();
        }

        this.#isInitialized = false;
    }
}