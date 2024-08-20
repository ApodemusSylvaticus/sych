'use strict';

import { fetchConfig } from './configFetcher.js';

/**
 * Class to manage a WebGL canvas and its associated web worker. It handles initialization,
 * resource management, and communication between the main thread and the worker. This includes
 * handling visibility changes, size changes of the canvas, and responding to WebGL context loss
 * by restarting the worker and recreating the canvas.
 */
class CanvasManager {
    #canvasElementId;
    #canvas;
    #worker;
    #dayConfig;
    #heatConfig;

    static #EVENT_VISIBILITY_CHANGE = 'visibilitychange';
    static #EVENT_BEFORE_UNLOAD = 'beforeunload';
    static #EVENT_RESIZE = 'resize';
    static #EVENT_FULLSCREEN_CHANGE = 'fullscreenchange';

    /**
     * Constructs an instance of CanvasManager, sets up the canvas and worker, and handles
     * configuration fetching.
     * @param {string} canvasElementId - The ID of the canvas element to initialize.
     * @throws {Error} If the canvas element cannot be found by the provided ID.
     */
    constructor(canvasElementId) {
        this.#workerState = 'stopped';
        this.#canvasElementId = canvasElementId;
        this.#canvas = document.getElementById(canvasElementId);
        if (!this.#canvas) {
            throw new Error(`Canvas element with id '${canvasElementId}' not found.`);
        }
        this.#worker = null;
        this.#dayConfig = null;
        this.#heatConfig = null;
    }

    /**
     * Initializes the web worker, fetches video configurations, and posts initial configuration
     * to the worker. Sets up the canvas for offscreen rendering and replaces the original canvas
     * to handle potential WebGL context losses.
     * @returns {Promise<void>} A promise that resolves when the worker and canvas are fully initialized.
     */
    async initWorker() {
        this.#canvas.replaceWith(this.#canvas.cloneNode());
        this.#canvas = document.getElementById(this.#canvasElementId);
        this.offscreen = this.#canvas.transferControlToOffscreen();
        this.#worker = new Worker('./js/gl/canvasWorker.js', { type: 'module' });

        try {
            this.#dayConfig = await fetchConfig('../config/video/day_config.json');
            this.#heatConfig = await fetchConfig('../config/video/heat_config.json');
            this.#worker.postMessage({
                type: 'init',
                canvas: this.offscreen,
                dayConfig: this.#dayConfig,
                heatConfig: this.#heatConfig
            }, [this.offscreen]);

            this.sendResizeMessage();

        } catch (error) {
            console.error('Error fetching configs:', error);
            throw error;
        }

        this.setupEventListeners();

        this.#workerState = 'running';

        requestAnimationFrame(this.animationFrameLoop.bind(this));
    }

    /**
     * Sets up necessary event listeners for managing canvas and worker lifecycle events, such as
     * resizing, visibility changes, and unloading events.
     */
    setupEventListeners() {
        this.#worker.onmessage = this.handleWorkerMessages.bind(this);

        window.addEventListener(CanvasManager.#EVENT_RESIZE, this.sendResizeMessage.bind(this), { passive: true });
        document.addEventListener(CanvasManager.#EVENT_VISIBILITY_CHANGE, this.handleVisibilityChange.bind(this));
        document.addEventListener(CanvasManager.#EVENT_FULLSCREEN_CHANGE, this.sendResizeMessage.bind(this), { passive: true });
        window.addEventListener(CanvasManager.#EVENT_BEFORE_UNLOAD, this.handleBeforeUnload.bind(this));
    }

    /**
     * Updates the canvas size and sends the current window size to the worker in a microtask to ensure it is processed after all
     * synchronously scheduled tasks.
     */
    sendResizeMessage() {
        queueMicrotask(() => {
            const pixelRatio = window.devicePixelRatio || 1; // Ensure we have a fallback ratio
            this.#worker.postMessage({
                type: 'resize',
                width: window.innerWidth * pixelRatio,
                height: window.innerHeight * pixelRatio
            });
        });
    }

    /**
     * Animation frame loop to request new frames for rendering. This is a recursive function that
     * schedules itself as long as the manager is not flagged as unloading.
     */
    animationFrameLoop() {
        this.#worker.postMessage({ type: 'animationFrame' });
        requestAnimationFrame(this.animationFrameLoop.bind(this));
    }

    /**
     * Sends a message to the worker to request the next video rect layout.
     */
    nextLayout() {
        this.#worker.postMessage({ type: 'nextLayout' });
    }

    /**
     * Handles messages from the worker, including context loss which requires worker restart.
     * @param {MessageEvent} event - The message event from the worker.
     */
    handleWorkerMessages(event) {
        if (event.data.type === 'contextLost') {
            console.log('Context lost in worker. Attempting to restart...');
            this.restartWorker().catch(error => {
                console.error('Failed to restart worker:', error);
            });
        }
    }

    /**
     * Restarts the worker by terminating the current one and initializing a new one.
     * @returns {Promise<void>} A promise that resolves when the worker is successfully restarted.
     */
    async restartWorker() {
        this.#worker.terminate();
        this.#worker = null;
        await this.initWorker();
    }

    /**
     * Worker state flag
     * @type {'suspended'|'running'|'stopped'}
     * @private
   */

     #workerState = 'stopped';

    /**
     *  Handles visibility changes to manage the worker's state effectively, pausing and resuming as necessary.
     */
    handleVisibilityChange() {
        if (document.visibilityState === 'hidden' && this.#workerState === 'running') {
            this.#workerState = 'suspended';
            this.#worker.postMessage({ type: 'suspend' });
        } else if (document.visibilityState !== "hidden" && this.#workerState === 'suspended') {
            this.#workerState = 'running';
            this.#worker.postMessage({ type: 'resume' });
            this.sendResizeMessage();
        }
    }

    /**
     * Manages cleanup and setting a flag during the beforeunload event, to prevent unnecessary operations during page unload.
     * This ensures the worker is cleanly terminated and all resources are appropriately released.
     * @param {BeforeUnloadEvent} event - The beforeunload event object.
     */
    handleBeforeUnload(event) {
        this.#workerState = 'stopped';
        this.#worker.postMessage({ type: 'cleanUpResources' });
        event.preventDefault();
        event.returnValue = '';  // Ensuring compatibility with older browsers
    }

}

export { CanvasManager };
