import { API_BASE_URL } from "../api/API.mjs";
import { getSellerProfile } from "../api/auth/profile/fetchProfiles.mjs";
import { load } from "../handlers/storage/index.mjs";
import { cardTemplate } from "./cardTemp.mjs";
import { authFetch } from "../listings/authFetch.mjs";
import * as bids from "../api/auth/bids/index.mjs";
import { placeBid, getToken } from "../api/auth/bids/bidAuth.mjs";



const profile = load("profile");
const userName = profile?.name || "unknown name";
console.log(userName);

export async function renderSpecificCard(parent, listingData) {
    const specificDataDiv = document.createElement("div");
    specificDataDiv.classList.add("specific-container", "bg-primary", "mx-auto", "bg-secondary");
    specificDataDiv.style.height = "30vh";
    specificDataDiv.style.width = "100%";
  
    try { 
        
        const imgSlider = document.createElement("p");
    imgSlider.id = "imgSlider";
    imgSlider.innerText = "Image slider:";
  
        // Fetch end user's credits
        const endUserProfile = await getSellerProfile(userName); 
        const endUserCredits = endUserProfile?.credits || 0;

        // Display end user credits
        const yourCreditsParagraph = document.createElement("p");
        yourCreditsParagraph.classList.add("mb-1");
        yourCreditsParagraph.innerText = "Your Credits:";

        const yourCreditsValue = document.createElement("p");
        yourCreditsValue.classList.add("mb-4");
        yourCreditsValue.innerText = endUserCredits;

  // Your Credits elements
  const creditsContainer = document.createElement("div");
  creditsContainer.classList.add("your-credits-container");
   
    // Bid here elements
  const bidHereContainer = document.createElement("div");
  bidHereContainer.classList.add("bid-here-container", "d-flex");

  const bidHereLabel = document.createElement("h6");
  bidHereLabel.classList.add("bids", "mt-1", "mx-2");
  bidHereLabel.innerText = "Bid here";

  const bidInput = document.createElement("input");
  bidInput.setAttribute("type", "number");
  bidInput.classList.add("form-control", "mx-1");
  bidInput.style.width = "70px";
  bidInput.style.height = "40px";
  bidInput.style.fontSize = "12px";
  bidInput.min = 1;
  bidInput.max = 20;
  bidInput.value = 0; 

  bidInput.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent click events from propagating to the parent elements
});
const bidForm = document.getElementById('bidForm');

bidForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const bidAmount = document.getElementById('bidAmount').value;
  const listingId = "your_listing_id_here";

  try {
    const bidResponse = await placeBid(listingId, bidAmount);
    console.log("Bid placed successfully:", bidResponse);
    // Handle success, e.g., update UI
  } catch (error) {
    // Handle error, e.g., display an error message to the user
    console.error("Error placing bid:", error.message);
  }
});


  const placeBidBtn = document.createElement("button");
    placeBidBtn.setAttribute("type", "button"); 
    placeBidBtn.classList.add("btn", "btn-green");
    placeBidBtn.innerText = "Place Bid";

async function placeBid() {
    const bidAmount = parseInt(bidInput.value, 10);
    
    try {
        await bidAuth(listingData.id, { amount: bidAmount }, 'POST');
        await updateCredits();
    } catch (error) {
        console.error("Error placing bid:", error.message);
        alert("Failed to place bid. Please try again.");
    }
      // Example: Fetch updated credits
  const endUserProfile = await getSellerProfile(userName);
  const endUserCredits = endUserProfile?.credits || 0;
  yourCreditsValue.innerText = endUserCredits;

  // Example: Fetch updated bid count for the specific listing
  await renderSpecificCard(parent, listingData);

}

placeBidBtn.addEventListener("click", () => placeBid(listingData));


 
specificDataDiv.appendChild(imgSlider);
  parent.appendChild(yourCreditsParagraph);
  parent.appendChild(yourCreditsValue);
 bidHereContainer.appendChild(bidHereLabel);
 bidHereContainer.appendChild(bidInput)
  bidHereContainer.appendChild(placeBidBtn);

  specificDataDiv.appendChild(bidHereContainer);
  parent.appendChild(specificDataDiv);
  } catch (error) {
    console.error('Error fetching the users credits:', error);
  }
}

  

        // // Check if the bid count is present in the response
        // const bidCount = responseData?._count?.bids;
        // console.log("Bid count:", bidCount);

  