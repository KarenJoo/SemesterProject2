import {API_BASE_URL} from "../api/API.mjs";
import {authFetch } from "../listings/authFetch.mjs";
import { updateListingListener } from "../handlers/listings/updateListing.mjs";

document.addEventListener("DOMContentLoaded", () => {
    updateListingListener();
  });
  
  const action = "/auction/listings";
  const method = "PUT"; 

export async function updateListing(id, listingData) {
        if (!id) {
          throw new Error("Update listing requires a ID");
        }
      
        const updateListingURL = `${API_BASE_URL}${action}/${id}?_seller=true`;
      
        try {
          const response = await authFetch(updateListingURL, {
            method,
            body: JSON.stringify(listingData),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          return await response.json();
        } catch (error) {
          console.error("Error updating listener", error.message);
          throw error;
        }
      }
