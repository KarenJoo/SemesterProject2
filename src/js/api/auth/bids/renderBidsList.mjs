import { authFetch } from "../../../listings/authFetch.mjs";
import { API_BASE_URL } from "../../API.mjs";

export async function renderBidListModal(listingId, userName) {
    try {
      const bidListURL = `${API_BASE_URL}/auction/listings/${listingId}/bids`;
      const response = await authFetch(bidListURL);
  
      if (!response.ok) {
        console.error("Failed to fetch bid list:", response.statusText);
        return;
      }
  
      const bidData = await response.json();
  
      // Render bid modal
      const bidModal = document.createElement("div");
      bidModal.classList.add("bid-modal");
  
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
  
        bidModal.appendChild(bidItem);
      });
  
      
      document.body.appendChild(bidModal);
  
     
  
    } catch (error) {
      console.error("Error rendering bid list modal:", error);
    }
  }