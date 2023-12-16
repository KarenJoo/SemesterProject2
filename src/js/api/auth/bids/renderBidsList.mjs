import { authFetch } from "../../../listings/authFetch.mjs";
import { API_BASE_URL } from "../../API.mjs";

/**
 * Renders a bid list for a specific listing.
 *
 * @param {string} listingId - The ID of the listing for which to fetch and render the bid list.
 * @param {string} userName - The username of the current user.
 * @returns {Promise<void>} - A Promise that resolves when the bid list is rendered.
 *
 * @example
 * const listingId = "12345";
 * const userName = "user_name";
 * await renderBidList(listingId, userName);
 */
export async function renderBidList(listingId, userName) {
    try {
      const bidListURL = `${API_BASE_URL}/auction/listings/${listingId}/bids`;
      const response = await authFetch(bidListURL);
  
      if (!response.ok) {
        console.error("Failed to fetch bid list:", response.statusText);
        return;
      }
  
      const bidData = await response.json();
  
      // Render bid modal
      const bidList = document.createElement("div");
      bidList.classList.add("bid-modal");
  
      // Iterate through the bids 
      bidData.bids.forEach((bid) => {
        const bidItem = document.createElement("div");
        bidItem.classList.add("bid-item");
  
        const bidderName = document.createElement("p");
        bidderName.innerText = `Bidder: ${bid.bidderName}`;
  
        const bidAmount = document.createElement("p");
        bidAmount.innerText = `Amount: ${bid.amount}`;
  
        const bidDate = document.createElement("p");
        bidDate.innerText = `Date: ${new Date(bid.created).toLocaleString()}`;
  
        bidItem.appendChild(bidderName);
        bidItem.appendChild(bidAmount);
        bidItem.appendChild(bidDate);
  
        bidList.appendChild(bidItem);
      });
  
      
      document.body.appendChild(bidList);
  
     
  
    } catch (error) {
      console.error("Error rendering bid list modal:", error);
    }
  }