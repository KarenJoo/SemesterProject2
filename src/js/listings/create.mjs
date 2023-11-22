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

    console.log("Listing Data:", listingData);
        const response = await authFetch(createListingURL, {
            method,
            body: JSON.stringify(listingData),
        })

        const listing = await response.json();
        console.log(listing)
    }

