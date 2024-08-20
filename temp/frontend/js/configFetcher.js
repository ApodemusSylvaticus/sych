'use strict';

/**
 * Asynchronously fetches JSON configuration data from a given URL.
 *
 * This function sends an HTTP GET request to the specified URL to retrieve
 * configuration data. It expects a JSON response. If the response is not OK
 * (i.e., HTTP status code is not in the 200-299 range), it throws an error.
 * Any network or fetching errors are caught, logged, and then rethrown.
 *
 * @param {string} url - The URL from which to fetch the configuration data.
 * @returns {Promise<Object>} A promise that resolves to the fetched JSON object.
 * @throws {Error} Throws an error if the response is not OK or if there is
 *                 a network/fetch error.
 *
 * @example
 * // Usage example
 * fetchConfig('https://example.com/config.json')
 *   .then(config => {
 *     console.log('Configuration:', config);
 *   })
 *   .catch(error => {
 *     console.error('Failed to fetch configuration:', error);
 *   });
 */
export async function fetchConfig(url) {
    const response = await fetch(url);
    if (!response.ok) {
        // Log and throw the error to be handled by the caller
        const error = new Error(`HTTP error! Status: ${response.status}`);
        console.error('Config fetch error:', error);
        throw error;
    }
    return await response.json();
}
