// canvasManager.d.ts

export as namespace CanvasSetup;

/**
 * Represents the configuration data structure for video rendering settings.
 */
export interface ConfigData {
    codec: string;
    codedWidth: number;
    codedHeight: number;
    framerate: number;
    latencyMode: string;
}

/**
 * Enum representing the channel types for video quads.
 */
export enum ChannelType {
    DAY = 'DAY',
    HEAT = 'HEAT'
}

/**
 * Interface representing the NDC (Normalized Device Coordinates) and size for a video quad.
 */
export interface QuadProperties {
    x: number;  // NDC x-coordinate (-1 to 1)
    y: number;  // NDC y-coordinate (-1 to 1, y is up)
    width: number;  // Width in NDC space (0 to 2)
    height: number; // Height in NDC space (0 to 2)
    zIndex: number; // Z-index for rendering order
    meta: any; // Additional metadata for the quad
}

/**
 * Class to manage a WebGL canvas and its associated web worker within a shadow DOM context.
 * It handles initialization, resource management, and communication between the main thread
 * and the worker, including handling visibility changes, size changes of the canvas, and
 * responding to WebGL context loss by restarting the worker and recreating the canvas.
 */
export class CanvasManager {
    /**
     * Constructs an instance of CanvasManager, sets up the canvas and worker, and handles
     * configuration fetching.
     * @param canvasId The ID of the canvas element to initialize.
     * @param shadowRoot The shadow root containing the canvas element.
     * @throws Error If the canvas element is not found or if the shadow root is not provided.
     */
    constructor(canvasId: string, shadowRoot: ShadowRoot);

    /**
     * Initializes the web worker, fetches video configurations, and posts initial configuration
     * to the worker. Sets up the canvas for offscreen rendering and replaces the original canvas
     * to handle potential WebGL context losses.
     * @returns A promise that resolves when the worker and canvas are fully initialized.
     */
    initWorker(): Promise<void>;


    /**
     * @Returns a promise that resolves when the worker is fully initialized and ready to receive
     */
    get ready(): Promise<void>;

    /**
    * Updates the canvas size and sends the current window size to the worker in a microtask to ensure it is processed after all
    * synchronously scheduled tasks.
     */
    sendResizeMessage(): void;

    /**
     * Restarts the worker by terminating the current one and initializing a new one.
     * @returns A promise that resolves when the worker is successfully restarted.
     */
    restartWorker(): Promise<void>;

    /**
     * Destroys the CanvasManager instance, cleaning up all resources and removing event listeners.
     */
    destroy(): void;

    /**
     * Returns day stream configs.
     */
    getDayConfig(): Promise<ConfigData>;

    /**
     * Returns heat stream configs.
     */
    getHeatConfig(): Promise<ConfigData>;

    /**
     * Creates a new video quad with the specified name, channel type, and properties.
     * @param name The name of the video quad.
     * @param channelType The type of channel (DAY or HEAT).
     * @param properties The NDC coordinates and size of the video quad.
     */
    video_quad_create(name: string, channelType: ChannelType, properties: QuadProperties): void;

    /**
     * Destroys an existing video quad with the specified name.
     * @param name The name of the video quad to destroy.
     */
    video_quad_destroy(name: string): void;

    /**
     * Updates an existing video quad with new properties.
     * @param name The name of the video quad to update.
     * @param properties The new NDC coordinates and size of the video quad.
     */
    video_quad_update(name: string, properties: QuadProperties): void;
}
