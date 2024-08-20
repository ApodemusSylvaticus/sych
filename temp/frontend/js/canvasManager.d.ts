// canvasManager.d.ts

export as namespace CanvasSetup;

/**
 * Represents the configuration data structure for day and heat settings in a video rendering context.
 */
export interface ConfigData {
    brightness?: number;
    contrast?: number;
    saturation?: number;
    hue?: number;
    temperature?: number;
}

/**
 * Represents the different types of messages that can be sent to the Web Worker.
 */
export type WorkerMessage =
    | InitMessage
    | ResizeMessage
    | AnimationFrameMessage
    | SuspendMessage
    | ResumeMessage;

/**
 * Message to initialize the rendering settings.
 */
export interface InitMessage {
    type: 'init';
    canvas: OffscreenCanvas;
    dayConfig: ConfigData;
    heatConfig: ConfigData;
}

/**
 * Message to resize the canvas dimensions.
 */
export interface ResizeMessage {
    type: 'resize';
    width: number;
    height: number;
}

/**
 * Message to indicate that a new animation frame should be rendered.
 */
export interface AnimationFrameMessage {
    type: 'animationFrame';
}

/**
 * Message to suspend the worker's operations.
 */
export interface SuspendMessage {
    type: 'suspend';
}

/**
 * Message to resume the worker's operations.
 */
export interface ResumeMessage {
    type: 'resume';
}

/**
 * Class to manage a WebGL canvas and its associated web worker. It handles initialization,
 * resource management, and communication between the main thread and the worker. This includes
 * handling visibility changes, size changes of the canvas, and responding to WebGL context loss
 * by restarting the worker and recreating the canvas.
 */
export class CanvasManager {
    /**
     * Constructs an instance of CanvasManager, sets up the canvas and worker, and handles
     * configuration fetching.
     * @param canvasElementId The ID of the canvas element to initialize.
     * @throws Error if the canvas element is not found.
     */
    constructor(canvasElementId: string);

    /**
     * Method to initialize the web worker, fetch video configurations, and post initial configuration
     * to the worker. Sets up the canvas for offscreen rendering and replaces the original canvas
     * to handle potential WebGL context losses.
     */
    initWorker(): Promise<void>;

    /**
     * Restarts the worker by terminating the current one and initializing a new one.
     */
    restartWorker(): Promise<void>;


    /**
     * Sends a message to the worker to request the next video rect layout.
     */
    nextLayout(): void;
}