import { API_BASE_URL } from "../api/API.mjs";
import { authFetch } from "./authFetch.mjs";
import { removeListingListener } from "../handlers/listings/removeListing.mjs";

document.addEventListener("DOMContentLoaded", () => {
        removeListingListener();
      });
      
      const action = "/auction/listings";
      const method = "DELETE"; 

/**
 * Removes a listing from the API based on the provided ID.
 *
 * @param {string} id - The ID of the listing to remove.
 * @returns {Promise<null|Object>} Returns null if the response body is empty. Otherwise, returns the response body as an object.
 * @throws Will throw an error if the request fails, the response status is not OK, or the response body is not valid JSON.
 * @async
 */
export async function removeListing(id) {
    if (!id) {
        throw new Error("Deleting a Listing requires a ListingID");
      }
      const removeListingURL = `${API_BASE_URL}${action}/${id}?_seller=true`;
    
      try {
        const response = await authFetch(removeListingURL, {
          method
        });

        console.log('Response Status:', response.status);
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        
    // Check if the response body is empty
    const responseBody = await response.text();
    if (!responseBody.trim()) {
      console.warn('Empty response body received.');
      return null; 
    }

    return JSON.parse(responseBody);
       
       
      } catch (error) {
        console.error("Error deleting Listing:", error.message);
        throw error;
      }
    }



