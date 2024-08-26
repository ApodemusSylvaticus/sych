// configFetcher.d.ts

export as namespace ConfigFetcher;

/**
 * Asynchronously fetches JSON configuration data from a given URL.
 * Sends an HTTP GET request to the specified URL to retrieve
 * configuration data, expecting a JSON response. It throws an error
 * if the response is not OK (HTTP status code is not in the 200-299 range),
 * or in case of a network/fetch error.
 *
 * @param url The URL from which to fetch the configuration data.
 * @returns A promise that resolves to the fetched JSON object.
 * @throws Throws an error if the response is not OK or if there is
 *         a network/fetch error.
 */
export function fetchConfig(url: string): Promise<any>;
