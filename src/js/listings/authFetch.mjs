import { load } from "../handlers/storage/index.mjs";


/**
 * Retrieves headers for authenticated requests
 * also retrieves the authorization token.
 *
 * @returns {Promise<Object>} returns a object containing headers for authenticated requests.
 *
 * @example
 * ```js
 * const headers = await headers();
 * ```
 * // When calling this function, the user receives an object with headers, including the authorization token.
 */

export async function headers() {
    const token = load("token");
  
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }
  
  
  /**
   * Authenticated fetch by including the authorization headers.
   *
   * @param {string} url - The URL to fetch.
   * @param {Object} [options={}] - Additional options for the fetch request.
   * @returns {Promise<Response>} resolves to the response of the authenticated fetch.
   *
   * @example
   *```js
   * const response = await authFetch("https://example.com/api/data");
   * ```
   * // This response retrieves the response of the authenticated fetch.
   */
  
  export async function authFetch(url, options = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: await headers(),
      });
  
      return response;
    } catch (error) {
      console.error("Error authenticated request:", error.message);
      throw error;
    }
  }