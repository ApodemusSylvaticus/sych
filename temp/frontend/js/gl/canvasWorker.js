'use strict';

import WebGLRenderer from './webGLRenderer.js';
import {VideoSubDecoder} from './videoSubDecoder.js';

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
 * @param {MessageEvent} event - The message event received by the worker.
 */
onmessage = async function (event) {
    const data = event.data;

    // Check commands against the current state to manage appropriate action
    if (!isCommandValid(data.type)) {
        console.error(`Invalid command '${data.type}' in state '${workerState}'`);
        return;
    }

    switch (data.type) {
        case 'init':
            initializeCanvas(data.canvas, data.dayConfig, data.heatConfig);
            workerState = 'running';
            console.log('Worker initialized and now running.');
            break;
        case 'resize':
            if (renderer) {
                renderer.resize(data.width, data.height);
            }
            workerState = 'running';
            break;
        case 'animationFrame':
            if (renderer) {
                renderer.render();
            }
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
        case 'nextLayout':
            if (renderer) {
                renderer.NextLayout();
            }
            workerState = 'running';
            break;
        default:
            console.error('Unknown message type:', data.type);
    }
};

/**
 * Checks if a command is valid based on the current state of the worker.
 * @param {string} commandType - The type of command received.
 * @return {boolean} - Whether the command is valid for the current state.
 */
function isCommandValid(commandType) {
    switch (commandType) {
        case 'init':
            return workerState === 'stopped';
        case 'suspend':
        case 'resize':
        case 'animationFrame':
        case 'nextLayout':
            return workerState === 'running';
        case 'resume':
            return workerState === 'suspended';
        case 'cleanUpResources':
            return true; // always allowed to clean up
        default:
            return false; // if command is not recognized, it's invalid
    }
}

/**
 * Initializes the WebGL canvas and sets up renderers and decoders.
 * @param {HTMLCanvasElement} canvas - The canvas element to use for rendering.
 * @param {VideoDecoderConfig} dayConfig - Configuration for the day video decoder.
 * @param {VideoDecoderConfig} heatConfig - Configuration for the heat video decoder.
 */
function initializeCanvas(canvas, dayConfig, heatConfig) {
    if (!canvas) {
        console.error('Canvas not provided to worker.');
        return;
    }

    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', () => reinitializeRenderer(canvas, dayConfig, heatConfig), false);

    renderer = new WebGLRenderer({
        canvas: canvas,
        dayConfig: dayConfig,
        heatConfig: heatConfig
    });

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
 * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
 * @param {VideoDecoderConfig} dayConfig - Configuration for the day video decoder.
 * @param {VideoDecoderConfig} heatConfig - Configuration for the heat video decoder.
 */
function reinitializeRenderer(canvas, dayConfig, heatConfig) {
    renderer = new WebGLRenderer({
        canvas: canvas,
        dayConfig: dayConfig,
        heatConfig: heatConfig
    });
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
}
