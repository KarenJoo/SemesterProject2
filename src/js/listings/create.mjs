import { API_BASE_URL } from "../api/API.mjs";
import { authFetch } from "./authFetch.mjs";
import { createListingListener } from "../handlers/listings/createListing.mjs";



  const action = "/auction/listings";
  const method = "POST";
  
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
