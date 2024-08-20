class WebSocketManager {
    #endpoint;
    #reconnectInterval = 1000;
    #maxReconnectInterval = 30000; // Maximum reconnect interval: 30 seconds
    #ws = null;
    #reconnectTimer = null;
    #toWSChannel;
    #fromWSChannel;
    #logError;
    #logWarn;
    #logInfo;
    #messageBuffer = [];
    #isDisposed = false;
    #isConnecting = false;
    #reconnectAttempts = 0;

    constructor(endpoint, channelNameToWS, channelNameFromWS, logError, logWarn, logInfo) {
        this.#endpoint = endpoint;
        this.#logError = logError || console.error;
        this.#logWarn = logWarn || console.warn;
        this.#logInfo = logInfo || console.log;

        this.#toWSChannel = new BroadcastChannel(channelNameToWS);
        this.#fromWSChannel = new BroadcastChannel(channelNameFromWS);
        this.#toWSChannel.onmessage = (event) => this.#sendData(event.data.pld);

        this.#connect();
    }

    #connect() {
        if (this.#isDisposed || this.#isConnecting) return;

        this.#isConnecting = true;
        this.#logInfo(`Attempting to connect... (Attempt ${this.#reconnectAttempts + 1})`);

        try {
            this.#safeCloseWebSocket();

            this.#ws = new WebSocket(this.#endpoint);
            this.#ws.binaryType = "arraybuffer";

            this.#ws.onopen = this.#handleOpen.bind(this);
            this.#ws.onmessage = this.#handleMessage.bind(this);
            this.#ws.onerror = this.#handleError.bind(this);
            this.#ws.onclose = this.#handleClose.bind(this);
        } catch (error) {
            this.#logError("Error during WebSocket creation:", error);
            this.#handleConnectionFailure();
        }
    }

    #safeCloseWebSocket() {
        if (this.#ws) {
            try {
                this.#ws.onopen = this.#ws.onmessage = this.#ws.onerror = this.#ws.onclose = null;
                this.#ws.close();
            } catch (error) {
                this.#logError("Error closing WebSocket:", error);
            } finally {
                this.#ws = null;
            }
        }
    }

    #handleConnectionFailure() {
        this.#isConnecting = false;
        this.#safeCloseWebSocket();
        this.#scheduleReconnect();
    }

    #handleOpen() {
        this.#logInfo("WebSocket connected successfully");
        this.#isConnecting = false;
        this.#reconnectAttempts = 0;
        this.#clearReconnectTimer();
        this.#flushMessageBuffer();
    }

    #handleMessage(event) {
        try {
            this.#fromWSChannel.postMessage(event.data);
        } catch (error) {
            this.#logError("Error handling incoming message:", error);
        }
    }

    #handleError(error) {
        this.#logError("WebSocket error:", error);
    }

    #handleClose(event) {
        const closeReason = this.#getCloseReason(event.code);
        this.#logWarn(`WebSocket closed. Code: ${event.code} (${closeReason})`);

        if (event.code === 1006) {
            this.#logError("Abnormal closure. This may indicate a network issue or a server-side problem.");
        }

        if (event.reason) {
            this.#logInfo(`Close reason provided by server: ${event.reason}`);
        }

        this.#handleConnectionFailure();
    }

    #getCloseReason(code) {
        const closeReasons = {
            1000: "Normal Closure",
            1001: "Going Away",
            1002: "Protocol Error",
            1003: "Unsupported Data",
            1005: "No Status Received",
            1006: "Abnormal Closure",
            1007: "Invalid frame payload data",
            1008: "Policy Violation",
            1009: "Message too big",
            1010: "Missing Extension",
            1011: "Internal Error",
            1012: "Service Restart",
            1013: "Try Again Later",
            1014: "Bad Gateway",
            1015: "TLS Handshake Failure"
        };
        return closeReasons[code] || "Unknown Reason";
    }

    #scheduleReconnect() {
        if (this.#isDisposed) return;
        this.#clearReconnectTimer();

        const delay = Math.min(this.#reconnectInterval * Math.pow(2, this.#reconnectAttempts), this.#maxReconnectInterval);
        this.#logInfo(`Scheduling reconnection in ${delay}ms`);

        this.#reconnectTimer = setTimeout(() => {
            this.#reconnectAttempts++;
            this.#connect();
        }, delay);
    }

    #clearReconnectTimer() {
        if (this.#reconnectTimer) {
            clearTimeout(this.#reconnectTimer);
            this.#reconnectTimer = null;
        }
    }

    #sendData(data) {
        if (this.#isDisposed) return;

        if (this.#ws && this.#ws.readyState === WebSocket.OPEN) {
            try {
                this.#ws.send(data);
            } catch (error) {
                this.#logError("Error sending data:", error);
                this.#bufferMessage(data);
                this.#handleConnectionFailure();
            }
        } else {
            this.#bufferMessage(data);
            if (!this.#isConnecting) {
                this.#connect();
            }
        }
    }

    #bufferMessage(data) {
        this.#messageBuffer.push(data);
        if (this.#messageBuffer.length === 1) {
            this.#logInfo("WebSocket not open. Buffering message.");
        }
        if (this.#messageBuffer.length % 10 === 0) {
            this.#logWarn(`Message buffer size: ${this.#messageBuffer.length}`);
        }
    }

    #flushMessageBuffer() {
        while (this.#messageBuffer.length > 0 && this.#ws && this.#ws.readyState === WebSocket.OPEN) {
            const message = this.#messageBuffer.shift();
            try {
                this.#ws.send(message);
            } catch (error) {
                this.#logError("Error flushing message:", error);
                this.#messageBuffer.unshift(message);
                this.#handleConnectionFailure();
                break;
            }
        }
        if (this.#messageBuffer.length > 0) {
            this.#logInfo(`${this.#messageBuffer.length} messages still in buffer.`);
        }
    }

    dispose() {
        if (this.#isDisposed) return;

        this.#isDisposed = true;
        this.#logInfo("Disposing WebSocketManager");
        this.#clearReconnectTimer();
        this.#safeCloseWebSocket();
        this.#toWSChannel.close();
        this.#fromWSChannel.close();
        this.#messageBuffer = [];
    }

    reconnect() {
        if (this.#isDisposed) {
            this.#logError("Cannot reconnect: WebSocketManager is disposed");
            return;
        }
        this.#logInfo("Manual reconnection triggered");
        this.#handleConnectionFailure();
    }

    isConnected() {
        return this.#ws && this.#ws.readyState === WebSocket.OPEN;
    }
}

export { WebSocketManager };