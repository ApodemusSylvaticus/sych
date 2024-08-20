import {ShaderManager} from './shaderManager.js';
import {WidgetManager} from './widgetManager.js';
import {TextureManager} from './textureManager.js';
import {VideoShader} from './videoShader.js';

/**
 * Enum for layout types.
 */
const LayoutType = {
    HEAT_WITH_DAY_PIP: 'heat with day pip',
    DAY_WITH_HEAT_PIP: 'day with heat pip',
    DAY: 'day',
    HEAT: 'heat'
};

/**
 * Manages WebGL rendering, including shaders, widgets, and textures.
 */
class WebGLRenderer {
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
    constructor({canvas, dayConfig, heatConfig},
                layoutType = LayoutType.DAY_WITH_HEAT_PIP) {
        this.#canvas = canvas;
        this.#ctx = canvas.getContext('webgl2', {
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
                throw new Error('Invalid layout type provided');
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
                this.#layoutDay_init()
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
                throw new Error('Invalid layout type provided');
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
        this.#shaderProgramNameDay = 'defaultShaderDay';
        this.#shaderProgramNameHeat = 'defaultShaderHeat';
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
                vertexPath: './shaders/vertexShaderDay.glsl',
                fragmentPath: './shaders/fragmentShaderDay.glsl'
            },
            {
                name: this.#shaderProgramNameHeat,
                vertexPath: './shaders/vertexShaderHeat.glsl',
                fragmentPath: './shaders/fragmentShaderHeat.glsl'
            }
        ], VideoShader);
    }

    /**
     * Sets up initial WebGL context state.
     * @private
     */
    #initializeGL() {
        const gl = this.#ctx;
        gl.clearColor(0.0, 1.0, 0.0, 0.0);
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

        // Calculate the size of the rectangle relative to the canvas size
        let rectWidth, rectHeight;
        if (rectAspectRatio > canvasAspectRatio) {
            rectWidth = this.#canvas.width / 2;  // Half the canvas width
            rectHeight = rectWidth / rectAspectRatio;  // Height based on rect aspect ratio
        } else {
            rectHeight = this.#canvas.height / 2;  // Half the canvas height
            rectWidth = rectHeight * rectAspectRatio;  // Width based on rect aspect ratio
        }

        // Convert pixel dimensions to NDC (Normalized Device Coordinates)
        const rectWidthNDC = rectWidth / (this.#canvas.width / 2);
        const rectHeightNDC = rectHeight / (this.#canvas.height / 2);

        // Position for rectangle in the middle right corner
        const rectXNDC = 1 - rectWidthNDC;  // NDC position for top right
        const rectYNDC = 0.5 - rectHeightNDC;

        // Update the rectangle widget
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

        // Delete all widgets from the previous layout
        this.#widgetManager.delete_all();

        // For dayRect, since it covers the entire canvas, the size in NDC is fixed
        const dayWidth = 2; // Full width in NDC
        const dayHeight = 2; // Full height in NDC

        // Create and position dayRect widget
        this.#dayRect = this.#widgetManager.addVideoRect(shaderProgramDay, -1, -1, dayWidth, dayHeight);

        // Create heatRect widget with default size and position (will be updated)
        this.#heatRect = this.#widgetManager.addVideoRect(shaderProgramHeat, 0, 0, 1, 1); // Default values

        // Correctly size and position heatRect based on canvas size
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

        // Delete all widgets from the previous layout
        this.#widgetManager.delete_all();

        // For heatRect, since it covers the entire canvas, the size in NDC is fixed
        const heatWidth = 2; // Full width in NDC
        const heatHeight = 2; // Full height in NDC

        // Create and position heatRect widget
        this.#heatRect = this.#widgetManager.addVideoRect(shaderProgramHeat, -1, -1, heatWidth, heatHeight);

        // Create dayRect widget with default size and position (will be updated)
        this.#dayRect = this.#widgetManager.addVideoRect(shaderProgramDay, 0, 0, 1, 1); // Default values

        // Correctly size and position dayRect based on canvas size
        this.#layoutHWDPIP_update();
    }

    /**
     * Initializes widgets for rendering with proper positioning and sizing.
     * The day widget is maximized to cover the entire canvas
     * @private
     */
    #layoutDay_init() {
        const shaderProgramDay = this.#shaderManager.getShaderProgram(this.#shaderProgramNameDay);

        // Delete all widgets from the previous layout
        this.#widgetManager.delete_all();

        // For dayRect, since it covers the entire canvas, the size in NDC is fixed
        const dayWidth = 2; // Full width in NDC
        const dayHeight = 2; // Full height in NDC

        // Create and position dayRect widget
        this.#dayRect = this.#widgetManager.addVideoRect(shaderProgramDay, -1, -1, dayWidth, dayHeight);
    }

    /**
     * Initializes widgets for rendering with proper positioning and sizing.
     * The heat widget is maximized to cover the entire canvas
     * @private
     */
    #layoutHeat_init() {
        const shaderProgramHeat = this.#shaderManager.getShaderProgram(this.#shaderProgramNameHeat);

        // Delete all widgets from the previous layout
        this.#widgetManager.delete_all();

        // For heatRect, since it covers the entire canvas, the size in NDC is fixed
        const heatWidth = 2; // Full width in NDC
        const heatHeight = 2; // Full height in NDC

        // Create and position heatRect widget
        this.#heatRect = this.#widgetManager.addVideoRect(shaderProgramHeat, -1, -1, heatWidth, heatHeight);
    }


    /**
     * Sets the canvas to its specified size.
     * @private
     */
    #setCanvasSize() {
        const {width, height} = this.#canvas;
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

        if (this.#ctx.getExtension('WEBGL_lose_context')) {
            this.#ctx.getExtension('WEBGL_lose_context').loseContext();
        }
    }
}

export default WebGLRenderer;
