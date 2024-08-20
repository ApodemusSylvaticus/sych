"use strict";

/**
 * Manages WebSocket connections by creating and communicating
 * with multiple WebSocketManager workers.
 */
class WebSocketConnectionManager {
    /**
     * Constructs the WebSocketConnectionManager.
     */
    constructor() {
        // Initially, no WebSocket connections are started automatically.
    }

    /**
     * Starts a Shared Worker for WebSocket communication.
     *
     * @param {string} endpoint The WebSocket endpoint URL.
     * @param {string} channelNameToWS The name of the BroadcastChannel
     * for sending data to the WebSocket.
     * @param {string} channelNameFromWS The name of the BroadcastChannel
     * for receiving data from the WebSocket.
     */
    startWebSocketWorker(endpoint, channelNameToWS, channelNameFromWS) {
        const worker = new SharedWorker(`/js/webSocketManagerWorker.js?endpoint=${endpoint}`, {type: 'module'});
        worker.port.postMessage({
            endpoint,
            channelNameToWS,
            channelNameFromWS
        });

        // Listen for messages from the worker and include endpoint in logs
        worker.port.onmessage = (event) => {
            const logPrefix = `Worker [${endpoint}]: `;
            if (event.data.type === 'error') {
                console.error(`${logPrefix}Error`, event.data.error);
            } else if (event.data.type === 'info') {
                console.log(`${logPrefix}Info`, event.data.message);
            }
        };

        worker.port.start();
    }
}

export {WebSocketConnectionManager};
