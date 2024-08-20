declare class WebSocketConnectionManager {
    /**
     * Constructs the WebSocketConnectionManager.
     */
    constructor();

    /**
     * Starts a Shared Worker for WebSocket communication.
     *
     * @param endpoint The WebSocket endpoint URL.
     * @param channelNameToWS The name of the BroadcastChannel
     * for sending data to the WebSocket.
     * @param channelNameFromWS The name of the BroadcastChannel
     * for receiving data from the WebSocket.
     */
    startWebSocketWorker(endpoint: string, channelNameToWS: string, channelNameFromWS: string): void;
}

export {WebSocketConnectionManager};
