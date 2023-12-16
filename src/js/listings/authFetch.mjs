import { load } from "../handlers/storage/index.mjs";

/**
 * Retrieves the headers required for authenticated requests,
 * including the "Content-Type" and "Authorization" headers with the user's token.
 *
 * @returns {Object} Headers object
 * @async
 */
export async function headers() {
    const token = load("token");
  
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
        };
  }
  
/**
 * Performs an authenticated fetch request with the provided URL and options.
 * It automatically includes the necessary headers for authentication.
 *
 * @param {string} url - The URL for the fetch request.
 * @param {Object} [options={}] - Additional options for the fetch request.
 * @returns {Promise<Response>} The response to the fetch request.
 * @async
 */
  export async function authFetch(url, options = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: await headers(),
      });
      console.log('response:', response)

      return response;
    } catch (error) {
      console.error("Error authenticated request:", error.message);
      throw error;
    }
  }
