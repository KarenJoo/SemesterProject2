import { API_BASE_URL } from "../api/API.mjs";
import { authFetch } from "./authFetch.mjs";

const action ="/auction/listings";

export async function getListings() {
const getListings_URL = `${API_BASE_URL}${action}?sort=created&sortOrder=desc&_active=true&_seller=true&_bids=true`;
const response = await authFetch(getListings_URL)
return await response.json();
}


export async function getListing(id) {
    if (!id) {
        throw new Error("Get requires a listingID");
    }
    const getListing_URL = `${API_BASE_URL}${action}/${id}?sort=created&sortOrder=desc&_active=true&_seller=true&_bids=true`;
    const response = await authFetch(getListing_URL)
    console.log(response)
    return await response.json();    
}