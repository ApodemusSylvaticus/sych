'use strict';

import { WebGLRenderer, ChannelType } from './webGLRenderer.js';
import { VideoSubDecoder } from './videoSubDecoder.js';

/**
 * @typedef {'videoQuadCreate' | 'videoQuadDestroy' | 'videoQuadUpdate' | 'resize' | 'render'} RendererCommand
 */

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
 * @typedef {Object} VideoQuadCreateMessage
 * @property {'videoQuadCreate'} type
 * @property {string} name
 * @property {ChannelType} channelType
 * @property {QuadProperties} properties
 */

/**
 * @typedef {Object} VideoQuadDestroyMessage
 * @property {'videoQuadDestroy'} type
 * @property {string} name
 */

/**
 * @typedef {Object} VideoQuadUpdateMessage
 * @property {'videoQuadUpdate'} type
 * @property {string} name
 * @property {QuadProperties} properties
 */

/**
 * @typedef {Object} ResizeMessage
 * @property {'resize'} type
 * @property {number} width
 * @property {number} height
 */

/**
 * @typedef {Object} RenderMessage
 * @property {'render'} type
 */

/**
 * @typedef {VideoQuadCreateMessage | VideoQuadDestroyMessage | VideoQuadUpdateMessage | ResizeMessage | RenderMessage} RendererMessage
 */

/**
 * @typedef {Object} InitMessage
 * @property {'init'} type
 * @property {OffscreenCanvas} canvas
 * @property {VideoDecoderConfig} dayConfig
 * @property {VideoDecoderConfig} heatConfig
 */

/**
 * @typedef {Object} SuspendMessage
 * @property {'suspend'} type
 */

/**
 * @typedef {Object} ResumeMessage
 * @property {'resume'} type
 */

/**
 * @typedef {Object} CleanUpResourcesMessage
 * @property {'cleanUpResources'} type
 */

/**
 * @typedef {Object} AnimationFrameMessage
 * @property {'animationFrame'} type
 */

/**
 * @typedef {InitMessage | SuspendMessage | ResumeMessage | CleanUpResourcesMessage | AnimationFrameMessage | RendererMessage} WorkerMessage
 */

/**
 * @type {WebGLRenderer|null}
 */
let renderer = null;

/**
 * @type {VideoSubDecoder|null}
 */
let videoDayDecoder = null;

/**
 * @type {VideoSubDecoder|null}
 */
let videoHeatDecoder = null;

/**
 * Active state of the worker.
 * @type {'suspended'|'running'|'stopped'}
 */
let workerState = 'stopped';

/**
 * Handles messages received by the worker.
 * @param {MessageEvent<WorkerMessage>} event - The message event received by the worker.
 */
onmessage = async function (event) {
    const data = event.data;

    if (!isCommandValid(data.type)) {
        console.warn(`Invalid command '${data.type}' in state '${workerState}'`);
        return;
    }

    switch (data.type) {
        case 'init':
            await initializeCanvas(data.canvas, data.dayConfig, data.heatConfig).catch(handleError);
            workerState = 'running';
            console.log('Worker initialized and now running.');
            break;
        case 'resize':
        case 'videoQuadCreate':
        case 'videoQuadDestroy':
        case 'videoQuadUpdate':
        case 'render':
            executeRendererCommand(data);
            workerState = 'running';
            break;
        case 'animationFrame':
            executeRendererCommand({ type: 'render' });
            workerState = 'running';
            break;
        case 'suspend':
            unsubscribeDecoders();
            workerState = 'suspended';
            console.log('Worker suspended.');
            break;
        case 'resume':
            if (workerState === 'suspended') {
                subscribeDecoders();
                workerState = 'running';
                console.log('Worker resumed.');
            }
            break;
        case 'cleanUpResources':
            cleanUpResources();
            workerState = 'stopped';
            break;
    }
};

/**
 * Executes a command on the renderer with type checking.
 * @param {RendererMessage} message - The message containing the command and its parameters.
 */
function executeRendererCommand(message) {
    if (!renderer) {
        console.error('Renderer not initialized');
        return;
    }

    switch (message.type) {
        case 'videoQuadCreate':
            renderer.videoQuadCreate(message.name, message.channelType, message.properties);
            break;
        case 'videoQuadDestroy':
            renderer.videoQuadDestroy(message.name);
            break;
        case 'videoQuadUpdate':
            renderer.videoQuadUpdate(message.name, message.properties);
            break;
        case 'resize':
            renderer.resize(message.width, message.height);
            break;
        case 'render':
            renderer.render();
            break;
    }
}

/**
 * Checks if a command is valid based on the current state of the worker.
 * @param {WorkerMessage['type']} commandType - The type of command received.
 * @return {boolean} - Whether the command is valid for the current state.
 */
function isCommandValid(commandType) {
    switch (commandType) {
        case 'init':
            return workerState === 'stopped';
        case 'suspend':
        case 'animationFrame':
        case 'videoQuadCreate':
        case 'videoQuadDestroy':
        case 'videoQuadUpdate':
        case 'render':
            return workerState === 'running';
        case 'resume':
            return workerState === 'suspended';
        case 'resize':
        case 'cleanUpResources':
            return true;
    }
}

/**
 * Initializes the WebGL canvas and sets up renderers and decoders.
 * @param {OffscreenCanvas} canvas - The canvas element to use for rendering.
 * @param {VideoDecoderConfig} dayConfig - Configuration for the day video decoder.
 * @param {VideoDecoderConfig} heatConfig - Configuration for the heat video decoder.
 */
async function initializeCanvas(canvas, dayConfig, heatConfig) {
    if (!canvas) {
        console.error('Canvas not provided to worker.');
        return;
    }

    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', () => reinitializeRenderer(canvas, dayConfig, heatConfig), false);

    renderer = new WebGLRenderer( canvas, dayConfig, heatConfig );

    await renderer.initialize().catch(handleError);

    initializeDecoders(dayConfig, heatConfig);
}

/**
 * Initializes video decoders for day and heat data.
 * @param {VideoDecoderConfig} dayConfig - Configuration for the day video decoder.
 * @param {VideoDecoderConfig} heatConfig - Configuration for the heat video decoder.
 */
function initializeDecoders(dayConfig, heatConfig) {
    try {
        videoDayDecoder = new VideoSubDecoder('videoDay', dayConfig, frame => renderer.newDayFrame(frame), handleError);
        videoHeatDecoder = new VideoSubDecoder('videoHeat', heatConfig, frame => renderer.newHeatFrame(frame), handleError);
        subscribeDecoders();
    } catch (error) {
        handleError(error);
    }
}

/**
 * Handles the event of WebGL context loss.
 * @param {Event} event - The event triggered on context loss.
 */
function handleContextLost(event) {
    event.preventDefault();
    console.log('Cleaning up resources due to context loss.');
    cleanUpResources();
    postMessage({ type: 'contextLost' });
    self.close();
}

/**
 * Reinitializes the WebGL renderer after context restoration.
 * @param {OffscreenCanvas} canvas - The canvas element for rendering.
 * @param {VideoDecoderConfig} dayConfig - Configuration for the day video decoder.
 * @param {VideoDecoderConfig} heatConfig - Configuration for the heat video decoder.
 */
function reinitializeRenderer(canvas, dayConfig, heatConfig) {
    renderer = new WebGLRenderer( canvas, dayConfig, heatConfig);
    initializeDecoders(dayConfig, heatConfig);
}

/**
 * Subscribes the video decoders.
 */
function subscribeDecoders() {
    if (videoDayDecoder) {
        videoDayDecoder.subscribeChannel();
    }
    if (videoHeatDecoder) {
        videoHeatDecoder.subscribeChannel();
    }
}

/**
 * Unsubscribes the video decoders.
 */
function unsubscribeDecoders() {
    if (videoDayDecoder) {
        videoDayDecoder.unsubscribeChannel();
    }
    if (videoHeatDecoder) {
        videoHeatDecoder.unsubscribeChannel();
    }
}

/**
 * Handles errors and logs them to the console.
 * @param {Error} error - The error object to handle.
 */
function handleError(error) {
    console.error(error);
}

/**
 * Cleans up resources and prepares the worker for termination.
 */
function cleanUpResources() {
    console.log('Cleaning up resources...');
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

    postMessage({ type: 'destroyed', message: 'All WebSocket connections closed. Exiting.' });
    self.close();
}
