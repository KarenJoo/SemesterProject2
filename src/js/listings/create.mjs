import { API_BASE_URL } from "../api/API.mjs";
import { authFetch } from "./authFetch.mjs";
import { createListingListener } from "../handlers/listings/createListing.mjs";



  const action = "/auction/listings";
  const method = "POST";
  
  /**
 * Creates a new listing by sending a POST request to the API.
 *
 * @param {Object} listingData - The data for the new listing.
 * @param {string} listingData.title - The title of the listing.
 * @param {string} listingData.description - The description of the listing.
 * @param {Array} listingData.media - An array of media URLs associated with the listing.
 * @param {Array} listingData.tags - An array of tags associated with the listing.
 * @param {Date} listingData.endsAt - The date and time when the listing ends.
 * @returns {Promise<Object>} The created listing.
 * @throws Will throw an error if the request fails or the response status is not OK.
 * @async
 */
  export async function createListing(listingData) {
    const createListingURL = API_BASE_URL + action;
  
    try {
      const response = await authFetch(createListingURL, {
        method,
        body: JSON.stringify(listingData),
      });
      console.log("Response status:", response.status);
  
      if (!response.ok) {
        console.error("Error creating listing");
        throw new Error("Error creating listing");
      }
  
      const listing = await response.json();
      console.log("Listing created:", listing);
      return listing;
    } catch (error) {
      console.error("Error creating listing:", error.message);
      throw error; 
    }
  }
