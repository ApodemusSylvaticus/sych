'use strict';

import { fetchConfig } from './configFetcher.js';

/**
 * @typedef {Object} ConfigData
 * @property {string} codec - The video codec to be used.
 * @property {number} codedWidth - The coded width of the video.
 * @property {number} codedHeight - The coded height of the video.
 * @property {number} framerate - The framerate of the video.
 * @property {string} latencyMode - The latency mode for video rendering.
 */

/**
 * @typedef {'running'|'suspended'|'stopped'} WorkerState
 */

/**
 * @enum {string}
 */
const ChannelType = {
    DAY: 'DAY',
    HEAT: 'HEAT'
};

/**
 * @typedef {Object} QuadProperties
 * @property {number} x - NDC x-coordinate (-1 to 1)
 * @property {number} y - NDC y-coordinate (-1 to 1, y is up)
 * @property {number} width - Width in NDC space (0 to 2)
 * @property {number} height - Height in NDC space (0 to 2)
 * @property {number} zIndex - Z-index for rendering order
 * @property {any} meta - Additional metadata for the quad
 */

/**
 * Class to manage a WebGL canvas and its associated web worker within a shadow DOM context.
 * It handles initialization, resource management, and communication between the main thread
 * and the worker, including handling visibility changes, size changes of the canvas, and
 * responding to WebGL context loss by restarting the worker and recreating the canvas.
 */
class CanvasManager {
    /** @type {string} */
    #canvasId;
    /** @type {ShadowRoot} */
    #shadowRoot;
    /** @type {HTMLCanvasElement} */
    #canvas;
    /** @type {Worker} */
    #worker;
    /** @type {ConfigData|null} */
    #dayConfig;
    /** @type {ConfigData|null} */
    #heatConfig;
    /** @type {number|null} */
    #animationFrameId;
    /** @type {number|null} */
    #visibilityChangeTimeout;
    /** @type {OffscreenCanvas} */
    #offscreen;
    /** @type {WorkerState} */
    #workerState;
    /** @type {ResizeObserver} */
    #resizeObserver;
    /** @type {number|null} */
    #resizeTimeout;
    /** @type {Promise<void>} */
    #ready;
    /** @type {boolean} */
    #readyResolved;
    /** @type {(value: void) => void} */
    #resolveReady;

    /** @type {boolean} */
    #workerDestroyed = true;

    /** @type {() => void} */
    #boundSendResizeMessage;
    /** @type {() => void} */
    #boundHandleVisibilityChange;
    /** @type {() => void} */
    #boundAnimationFrameLoop;
    /** @type {() => void} */
    #boundHandleResize;

    /** @type {string} */
    static #EVENT_VISIBILITY_CHANGE = 'visibilitychange';
    /** @type {string} */
    static #EVENT_FULLSCREEN_CHANGE = 'fullscreenchange';

    /**
     * Constructs an instance of CanvasManager, sets up the canvas and worker, and handles
     * configuration fetching.
     * @param {string} canvasId - The ID of the canvas element to initialize.
     * @param {ShadowRoot} shadowRoot - The shadow root containing the canvas element.
     * @throws {Error} If the canvas element is not found or if the shadow root is not provided.
     */
    constructor(canvasId, shadowRoot) {
        this.#workerState = 'stopped';
        this.#readyResolved = false;
        this.#canvasId = canvasId;
        this.#shadowRoot = shadowRoot;
        this.#ready = new Promise((resolve) => { this.#resolveReady = resolve; });

        if (!(this.#shadowRoot instanceof ShadowRoot)) {
            throw new Error('Invalid shadow root provided.');
        }

        this.#canvas = this.#shadowRoot.getElementById(this.#canvasId);
        if (!this.#canvas) {
            throw new Error(`Canvas element with id '${this.#canvasId}' not found in the shadow DOM.`);
        }

        this.#worker = null;
        this.#dayConfig = null;
        this.#heatConfig = null;
        this.#animationFrameId = null;
        this.#visibilityChangeTimeout = null;
        this.#offscreen = null;
        this.#resizeObserver = null;
        this.#resizeTimeout = null;

        // Bind methods to ensure correct 'this' context
        this.#boundSendResizeMessage = this.sendResizeMessage.bind(this);
        this.#boundHandleVisibilityChange = this.#handleVisibilityChange.bind(this);
        this.#boundAnimationFrameLoop = this.#animationFrameLoop.bind(this);
        this.#boundHandleResize = this.#handleResize.bind(this);
    }

    /**
     * Initializes the web worker, fetches video configurations, and posts initial configuration
     * to the worker. Sets up the canvas for offscreen rendering and replaces the original canvas
     * to handle potential WebGL context losses.
     * @returns {Promise<void>} A promise that resolves when the worker and canvas are fully initialized.
     */
    async initWorker() {
        try {
            // Clone the canvas and replace the original
            const canvasClone = /** @type {HTMLCanvasElement} */ (this.#canvas.cloneNode());
            this.#canvas.replaceWith(canvasClone);

            // Get a fresh reference to the new canvas from the shadow DOM
            this.#canvas = /** @type {HTMLCanvasElement} */ (this.#shadowRoot.getElementById(this.#canvasId));

            this.#offscreen = this.#canvas.transferControlToOffscreen();
            this.#worker = new Worker('./js/gl/canvasWorker.js', { type: 'module' });

            if (!this.#dayConfig) {
                this.#dayConfig = await fetchConfig('../config/video/day_config.json');
            }
            if (!this.#heatConfig) {
                this.#heatConfig = await fetchConfig('../config/video/heat_config.json');
            }

            this.#worker.postMessage({
                type: 'init',
                canvas: this.#offscreen,
                dayConfig: this.#dayConfig,
                heatConfig: this.#heatConfig
            }, [this.#offscreen]);

            this.#workerDestroyed = false;

            this.#setupEventListeners();

            this.#workerState = 'running';
            this.#animationFrameId = requestAnimationFrame(this.#boundAnimationFrameLoop);
        } catch (error) {
            console.error('Error initializing worker:', error);
            throw error;
        }
    }

    /**
     * Sets up necessary event listeners and observers for managing canvas and worker lifecycle events.
     * @private
     */
    #setupEventListeners() {
        this.#worker.onmessage = this.#handleWorkerMessages.bind(this);

        this.#resizeObserver = new ResizeObserver(this.#boundHandleResize);
        this.#resizeObserver.observe(this.#shadowRoot.host);

        document.addEventListener(CanvasManager.#EVENT_VISIBILITY_CHANGE, this.#boundHandleVisibilityChange);
        this.#shadowRoot.addEventListener(CanvasManager.#EVENT_FULLSCREEN_CHANGE, this.#boundHandleResize, { passive: true });
    }

    /**
     * Handles resize events with debouncing.
     * @private
     */
    #handleResize() {
        clearTimeout(this.#resizeTimeout);
        this.#resizeTimeout = setTimeout(() => {
            this.sendResizeMessage();
        }, 100); // 100ms debounce
    }

    /**
     * Updates the canvas size and sends the current window size to the worker in a microtask to ensure it is processed after all
     * synchronously scheduled tasks.
     * @public
     */
    sendResizeMessage() {
        queueMicrotask(() => {
            if (this.#worker && this.#workerState === 'running') {
                const pixelRatio = window.devicePixelRatio || 1;
                const rect = this.#canvas.getBoundingClientRect();
                this.#worker.postMessage({
                    type: 'resize',
                    width: rect.width * pixelRatio,
                    height: rect.height * pixelRatio
                });
            }
        });
    }

    /**
     * Animation frame loop to request new frames for rendering. This is a recursive function that
     * schedules itself as long as the manager is not flagged as stopped.
     * @private
     */
    #animationFrameLoop() {
        if (this.#worker && this.#workerState !== 'stopped') {
            // Send frame request to worker only if the tab is visible
            if (document.visibilityState === 'visible' && this.#readyResolved) {
                    this.#worker.postMessage({type: 'animationFrame'});
            }
            this.#animationFrameId = requestAnimationFrame(this.#boundAnimationFrameLoop);
        }
    }

    /**
     * Creates a new video quad with the specified name, channel type, and properties.
     * @param {string} name The name of the video quad.
     * @param {ChannelType} channelType The type of channel (DAY or HEAT).
     * @param {QuadProperties} properties The NDC coordinates and size of the video quad.
     */
    video_quad_create(name, channelType, properties) {
        if (this.#worker && this.#workerState === 'running') {
            this.#worker.postMessage({
                type: 'videoQuadCreate',
                name,
                channelType,
                properties
            });
        }
    }

    /**
     * Destroys an existing video quad with the specified name.
     * @param {string} name The name of the video quad to destroy.
     */
    video_quad_destroy(name) {
        if (this.#worker && this.#workerState === 'running') {
            this.#worker.postMessage({
                type: 'videoQuadDestroy',
                name
            });
        }
    }

    /**
     * Updates an existing video quad with new properties.
     * @param {string} name The name of the video quad to update.
     * @param {QuadProperties} properties The new NDC coordinates and size of the video quad.
     */
    video_quad_update(name, properties) {
        if (this.#worker && this.#workerState === 'running') {
            this.#worker.postMessage({
                type: 'videoQuadUpdate',
                name,
                properties
            });
        }
    }

    /**
     * Handles messages from the worker, including context loss which requires worker restart.
     * @param {MessageEvent} event - The message event from the worker.
     * @private
     */
    #handleWorkerMessages(event) {
        switch(event.data.type) {
            case 'contextLost':
                console.log('Context lost in worker. Attempting to restart...');
                this.restartWorker().catch(error => {
                    console.error('Failed to restart worker:', error);
                });
                break;
            case 'ready':
                console.log('Worker initialized and now ready.');

                this.#ready.then(() => {
                    this.#readyResolved = true;
                });

                this.#resolveReady();
                break;
            case 'destroyed':
                this.#workerDestroyed = true;
                break;
            default:
                console.warn('Received unknown message type from worker:', event.data.type);
        }
    }

    /**
     * Returns a promise that resolves when the worker is fully initialized and ready to receive
     * @returns {Promise<void>}
     */
    get ready() {
        return this.#ready;
    }

    /**
     * Restarts the worker by terminating the current one and initializing a new one.
     * @returns {Promise<void>} A promise that resolves when the worker is successfully restarted.
     */
    async restartWorker() {
        try {
            if (this.#worker) {
                this.#worker.terminate();
                this.#worker = null;
            }
            await this.initWorker();
        } catch (error) {
            console.error('Error restarting worker:', error);
            throw error;
        }
    }

    /**
     * Asynchronously retrieves the day configuration.
     * @returns {Promise<ConfigData>} A promise that resolves with the day configuration.
     */
    async getDayConfig() {
        if (!this.#dayConfig) {
            this.#dayConfig = await fetchConfig('../config/video/day_config.json');
        }
        return this.#dayConfig;
    }

    /**
     * Asynchronously retrieves the heat configuration.
     * @returns {Promise<ConfigData>} A promise that resolves with the heat configuration.
     */
    async getHeatConfig() {
        if (!this.#heatConfig) {
            this.#heatConfig = await fetchConfig('../config/video/heat_config.json');
        }
        return this.#heatConfig;
    }

    /**
     * Handles visibility changes to manage the worker's state effectively.
     * @private
     */
    #handleVisibilityChange() {
        clearTimeout(this.#visibilityChangeTimeout);
        this.#visibilityChangeTimeout = setTimeout(() => {
            if (document.visibilityState === 'hidden' && this.#workerState === 'running') {
                this.#workerState = 'suspended';
                this.#worker?.postMessage({ type: 'suspend' });
            } else if (document.visibilityState !== "hidden" && this.#workerState === 'suspended') {
                this.#workerState = 'running';
                this.#worker?.postMessage({ type: 'resume' });
                this.sendResizeMessage();
            }
        }, 100);
    }

    /**
     * Destroys the CanvasManager instance, cleaning up all resources and removing event listeners.
     */
    destroy() {
        if (this.#animationFrameId) {
            cancelAnimationFrame(this.#animationFrameId);
            this.#animationFrameId = null;
        }

        clearTimeout(this.#visibilityChangeTimeout);
        clearTimeout(this.#resizeTimeout);

        if (this.#resizeObserver) {
            this.#resizeObserver.disconnect();
            this.#resizeObserver = null;
        }

        document.removeEventListener(CanvasManager.#EVENT_VISIBILITY_CHANGE, this.#boundHandleVisibilityChange);
        this.#shadowRoot.removeEventListener(CanvasManager.#EVENT_FULLSCREEN_CHANGE, this.#boundHandleResize);

        if (this.#worker) {
            this.#worker?.postMessage({ type: 'cleanUpResources' });
            // this.#worker.terminate();
            this.#worker = null;
        }

        this.#canvas = null;
        this.#shadowRoot = null;
        this.#dayConfig = null;
        this.#heatConfig = null;
        this.#workerState = 'stopped';
        this.#offscreen = null;
        this.#ready = null;

        if (window.gc) {
            window.gc();
        }

        console.log('CanvasManager destroyed and resources cleaned up.');
    }
}

export { CanvasManager, ChannelType };
