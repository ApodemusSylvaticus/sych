'use strict';

/**
 * A class representing a video sub-decoder that handles decoding of video streams.
 * It utilizes the Web Codecs API for decoding video data and communicates through a BroadcastChannel.
 */
class VideoSubDecoder {
    /**
     * Creates an instance of the VideoSubDecoder.
     * @param {string} channelName - The name of the BroadcastChannel used for communication.
     * @param {VideoDecoderConfig} config - The configuration object for the video decoder.
     * @param {function(VideoFrame):void} onFrameCallback - Callback function that is called with a decoded frame.
     * @param {function(string):void} onErrorCallback - Callback function that is called on encountering an error.
     * @param {number} [maxQueueLength=30] - The maximum number of frames that can be queued for decoding.
     */
    constructor(channelName, config, onFrameCallback, onErrorCallback, maxQueueLength = 30) {
        this.channelName = channelName;
        this.config = config;
        this.onFrameCallback = onFrameCallback;
        this.onErrorCallback = onErrorCallback;
        this.maxQueueLength = maxQueueLength;
        this.boundMessageHandler = this.messageHandler.bind(this);

        this.initializeDecoder();
        this.initializeChannel();
    }

    /**
     * Configures the video decoder with the specified settings.
     */
    configureDecoder() {
        if (this.decoder) {
            this.decoder.configure(this.config);
        }
    }

    /**
     * Initializes the video decoder and sets up error handling and queue management.
     */
    initializeDecoder() {
        try {
            this.decoder = new VideoDecoder({
                output: (frame) => {
                    this.onFrameCallback(frame);
                },
                error: (e) => {
                    this.onErrorCallback('Decoder error: ' + e.message);
                },
            });
            this.configureDecoder();
        } catch (e) {
            this.onErrorCallback('Decoder initialization error: ' + e.message);
        }
    }

    /**
     * Initializes the BroadcastChannel for communication and sets up message handling.
     */
    initializeChannel() {
        try {
            this.broadcastChannel = new BroadcastChannel(this.channelName);
            this.subscribeChannel();
            this.broadcastChannel.onerror = (e) => {
                this.onErrorCallback('BroadcastChannel error: ' + e.message);
            };
        } catch (e) {
            this.onErrorCallback('BroadcastChannel initialization error: ' + e.message);
        }
    }

    /**
     * Flag for active subscription to the BroadcastChannel.
     * @type {boolean}
     * @private
     */
    #subscribed = false;

    /**
     * Subscribes to messages from the BroadcastChannel.
     */
    subscribeChannel() {
        if (this.#subscribed) {
            return;
        }

        this.#subscribed = true;

        this.broadcastChannel.addEventListener('message', this.boundMessageHandler);
        this.configureDecoder();  // Reconfigure decoder when subscribing
    }

    /**
     * Unsubscribes from messages from the BroadcastChannel and resets the decoder.
     */
    unsubscribeChannel() {

        this.#subscribed = false;

        if (this.broadcastChannel) {
            this.broadcastChannel.removeEventListener('message', this.boundMessageHandler);
            if (this.decoder) {
                this.decoder.reset();  // Reset the decoder when unsubscribing
            }
        }
    }

    /**
     * Handles incoming messages from the BroadcastChannel.
     * @param {MessageEvent} message - The message event received from the BroadcastChannel.
     */
    messageHandler(message) {
        if (this.decoder.state === 'configured' && this.decoder.decodeQueueSize < this.maxQueueLength) {
            this.processMessage(message);
        } else if (this.decoder.state === 'closed') {
            this.initializeDecoder();
        } else {
            console.log('Decoder is busy or not ready.');
        }
    }

    /**
     * Processes incoming messages from the BroadcastChannel and decodes the video chunks.
     * @param {MessageEvent} message - The message event received from the BroadcastChannel.
     */
    processMessage(message) {
        try {
            const chunk = new EncodedVideoChunk({
                type: 'key',
                data: message.data,
                timestamp: 0,
                duration: 0,
            });
            this.decoder.decode(chunk);
        } catch (decodeError) {
            this.onErrorCallback('Decoding error: ' + decodeError.message);
        }
    }

    /**
     * Clears resources associated with the video decoder and the BroadcastChannel.
     */
    clearDecoder() {
        this.unsubscribeChannel();
        if (this.decoder) {
            this.decoder.close();
            this.decoder = null;
        }
        if (this.broadcastChannel) {
            this.broadcastChannel.close();
            this.broadcastChannel = null;
        }
    }

    destructor() {
        this.clearDecoder();
    }
}

export {VideoSubDecoder};
