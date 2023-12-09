import { API_BASE_URL } from "../../API.mjs";
import { load } from "../../../handlers/storage/index.mjs";
import { authFetch } from "../../../listings/authFetch.mjs";
import { bidListener } from "./bidListener.mjs";


export async function placeBid(listingId, bid, method) {
  try {
    const token = storage.load("accessToken");
    const bidURL = `${API_BASE_URL}/auction/listings/${listingId}/bids`; 
    const response = await authFetch(bidURL, { 
      method: method,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bid),
    });

  } catch (error) {
    console.error('Error when placing bid:', error);
    alert("Error when placing bid");
  }
}