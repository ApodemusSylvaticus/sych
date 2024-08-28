'use strict';

/**
 * Manages WebSocket connections by creating and communicating
 * with multiple WebSocketManager workers.
 */
class WebSocketConnectionManager {
  /**
   * Constructs the WebSocketConnectionManager.
   */
  constructor() {
    // Store active workers
    this.workers = new Map();
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
    const worker = new SharedWorker(`/js/webSocketManagerWorker.js?endpoint=${endpoint}`, { type: 'module' });
    worker.port.postMessage({
      endpoint,
      channelNameToWS,
      channelNameFromWS,
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

    // Store the worker with its endpoint as the key
    this.workers.set(endpoint, worker);
  }

  /**
   * Stops all WebSocket workers.
   * TODO: MAKE SURE IT WORKS (IF WE NEED IT WORKING)
   */
  stopAllWebSocketWorkers() {
    for (const [endpoint, worker] of this.workers) {
      console.log(`Stopping WebSocket worker for endpoint: ${endpoint}`);
      worker.port.postMessage({ type: 'stop' });
      worker.port.close();
    }
    this.workers.clear();
    console.log('All WebSocket workers have been stopped.');
  }
}

export { WebSocketConnectionManager };
