import { API_BASE_URL } from "../../API.mjs";
import * as storage from "/src/js/handlers/storage/index.mjs";
import { load } from "../../../handlers/storage/index.mjs";
import { authFetch } from "../../../listings/authFetch.mjs";
import { bidListener } from "./bidListener.mjs";


export async function placeBid(listingId, bidAmount) {
  const bidURL = `${API_BASE_URL}/auction/listings/${listingId}/bids`;

  try {
    const token = await getToken();

    const response = await authFetch(bidURL, {
      method: 'POST',
      body: JSON.stringify({ amount: bidAmount }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error placing bid:", error.message);
    throw error;
  }
}

export function getToken() {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    return accessToken;
  } else {
    throw new Error('Authentication token not found or expired');
  }
}