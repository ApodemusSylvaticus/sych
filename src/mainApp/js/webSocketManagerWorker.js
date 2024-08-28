// Import the updated WebSocketManager with logging capabilities
import { WebSocketManager } from './vsocketProxyUtil.js';

// Object to store WebSocketManager instances
const webSocketManagers = {};

// Function to clean up and close all WebSocket connections
function cleanupAndExit() {
    Object.values(webSocketManagers).forEach(manager => {
        manager.close();
    });
    // TODO: MAKE SURE IT WORKS (IF WE NEED IT WORKING)
    self.close(); // Close the shared worker
}

// Listen for messages from the main thread
self.onconnect = function (e) {
    const port = e.ports[0];

    port.addEventListener('message', (event) => {
        // Check if the message is a stop command
        if (event.data === 'stop') {
            port.postMessage({ type: 'info', message: 'Received stop command. Cleaning up and exiting.' });
            cleanupAndExit();
            return;
        }

        // Extract configuration from the received message
        const { endpoint, channelNameToWS, channelNameFromWS } = event.data;

        // Check if a WebSocketManager for this endpoint already exists
        if (!webSocketManagers[endpoint]) {
            // If it doesn't exist, create a new WebSocketManager
            webSocketManagers[endpoint] = new WebSocketManager(
                endpoint,
                channelNameToWS,
                channelNameFromWS,
                // Logging errors back to the main thread
                (error) => port.postMessage({ type: 'error', error }),
                // Logging warnings back to the main thread
                (warning) => port.postMessage({ type: 'info', message: warning }),
                // Logging info back to the main thread
                (info) => port.postMessage({ type: 'info', message: info })
            );

            port.postMessage({ type: 'info', message: `New WebSocketManager created for endpoint: ${endpoint}` });
        } else {
            port.postMessage({ type: 'info', message: `Existing WebSocketManager used for endpoint: ${endpoint}` });
        }
    });

    port.start(); // Required to start receiving messages
};
