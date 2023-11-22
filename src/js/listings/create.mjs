import { API_BASE_URL } from "../api/API.mjs";
import { authFetch } from "./authFetch.mjs";
import { createListingListener } from "../handlers/listings/createListing.mjs";

document.addEventListener("DOMContentLoaded", () => {
    createListingListener();
  });


const action = "/auction/listings";
const method = "POST";

export async function createListing(listingData) {
    const createListingURL = API_BASE_URL + action;

    try {
        const response = await authFetch(createListingURL, {
            method,
            body: JSON.stringify(listingData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating listing:", error.message);
        throw error;
    }
}
