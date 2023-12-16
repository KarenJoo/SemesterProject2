import { API_BASE_URL } from "../api/API.mjs";
import { authFetch } from "./authFetch.mjs";

const action ="/auction/listings";

/**
 * Retrieves a list of listings from the API based on specific criteria.
 *
 * @returns {Promise<Array>} An array of listing objects.
 * @throws Will throw an error if the request fails.
 * @async
 */
export async function getListings() {
const getListings_URL = `${API_BASE_URL}${action}?sort=created&sortOrder=desc&_active=true&_seller=true&_bids=true`;
const response = await authFetch(getListings_URL)
return await response.json();
}

/**
 * Retrieves a specific listing from the API based on the provided ID.
 *
 * @param {string} id - The ID of the listing to retrieve.
 * @returns {Promise<Object>} The listing object.
 * @throws Will throw an error if the request fails or the response status is not OK.
 * @async
 */
export async function getListing(id) {
    if (!id) {
        throw new Error("Get requires a listingID");
    }
    const getListing_URL = `${API_BASE_URL}${action}/${id}?sort=created&sortOrder=desc&_active=true&_seller=true&_bids=true`;
    const response = await authFetch(getListing_URL)
    console.log(response)
    return await response.json();    
}