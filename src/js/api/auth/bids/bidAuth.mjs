import { API_BASE_URL } from "../../API.mjs";
import * as storage from "/src/js/handlers/storage/index.mjs"
import { authFetch } from "../../../listings/authFetch.mjs";
import { bidListener } from "./bidListener.mjs";


export async function placeBid(listingId, bid, method) {
  try {
    const token = storage.load("token");
    const bidURL = `${API_BASE_URL}/auction/listings/${listingId}/bids`; 
    const response = await authFetch(bidURL, { 
      method: method,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bid),
    });

// if bid successfully placed > status 200
if (response.status === 200) {
  // Bid successfully placed > refresh page
  window.location.reload();
} else {
  // Handle other response statuses or display an error message
  console.error('Error when placing bid. Status:', response.status);
  alert("Error when placing bid");
}
} catch (error) {
console.error('Error when placing bid:', error);
alert("Error when placing bid");
}
}