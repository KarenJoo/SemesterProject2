import { API_BASE_URL } from "../api/API.mjs";
import { authFetch } from "./authFetch.mjs";

const action ="/auction/listings?sort=created&sortOrder=desc&_active=true&_seller=true&_bids=true";

export async function getListings() {
const getListings_URL = `${API_BASE_URL}${action}`;
const response = await authFetch(getListings_URL)
return await response.json();
}


export async function getListing(id) {
    if (!id) {
        throw new Error("Get requires a listingID");
    }
    const getListing_URL = `${API_BASE_URL}${action}/${id}`;
    const response = await authFetch(getListing_URL)
    return await response.json();    
}