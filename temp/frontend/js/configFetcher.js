'use strict';

/**
 * Asynchronously fetches JSON configuration data from a given URL.
 *
 * This function sends an HTTP GET request to the specified URL to retrieve
 * configuration data. It expects a JSON response matching the ConfigData interface.
 * If the response is not OK (i.e., HTTP status code is not in the 200-299 range),
 * it throws an error. Any network or fetching errors are caught, logged, and then rethrown.
 *
 * @param {string} url - The URL from which to fetch the configuration data.
 * @returns {Promise<ConfigData>} A promise that resolves to the fetched ConfigData object.
 * @throws {Error} Throws an error if the response is not OK or if there is
 *                 a network/fetch error.
 *
 * @typedef {Object} ConfigData
 * @property {string} codec - The video codec to be used.
 * @property {number} codedWidth - The coded width of the video.
 * @property {number} codedHeight - The coded height of the video.
 * @property {number} framerate - The framerate of the video.
 * @property {string} latencyMode - The latency mode for video rendering.
 *
 * @example
 * // Usage example
 * fetchConfig('https://example.com/config.json')
 *   .then(config => {
 *     console.log('Configuration:', config);
 *     console.log('Codec:', config.codec);
 *     console.log('Coded Width:', config.codedWidth);
 *   })
 *   .catch(error => {
 *     console.error('Failed to fetch configuration:', error);
 *   });
 */
export async function fetchConfig(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Config fetch error:', error);
        throw error;
    }
}
