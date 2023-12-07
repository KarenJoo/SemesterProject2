import { API_BASE_URL } from "../api/API.mjs";
import { authFetch } from "./authFetch.mjs";
import { removeListingListener } from "../handlers/listings/removeListing.mjs";

document.addEventListener("DOMContentLoaded", () => {
        removeListingListener();
      });
      
      const action = "/auction/listings";
      const method = "DELETE"; 
      
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
      return null; // or handle it as needed
    }

    return JSON.parse(responseBody);
       
       
      } catch (error) {
        console.error("Error deleting Listing:", error.message);
        throw error;
      }
    }



