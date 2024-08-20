// vsocketProxy.d.ts

export as namespace VSocketProxy;

/**
 * Interface representing the structure of messages received from the worker.
 */
export interface WorkerMessage {
    type: 'info' | 'error' | string;
    message?: string;
    error?: string;
}

/**
 * Interface for the MessagePort of a SharedWorker.
 */
export interface MessagePort {
    onmessage: (event: MessageEvent) => void;
    start: () => void;
}

/**
 * Interface for the event received in the message event handler.
 */
export interface MessageEvent {
    data: WorkerMessage;
}

/**
 * Initializes and starts the shared worker.
 *
 * Sets up the message event listener for the shared worker and starts
 * listening for messages from the worker, handling them using the
 * handleSharedWorkerMessage function.
 *
 * @param worker The shared worker instance.
 */
export function startSocketWorker(worker: SharedWorker): void;

/**
 * Handles messages received from the shared worker.
 *
 * Depending on the type of message received, logs information, an error,
 * or an unknown message type error.
 *
 * @param data The data received from the worker, containing a 'type' property.
 */
export function handleSharedWorkerMessage(data: WorkerMessage): void;
