import { API_BASE_URL } from "../api/API.mjs";
import { getSellerProfile } from "../api/auth/profile/fetchProfiles.mjs";
import { load } from "../handlers/storage/index.mjs";
import { cardTemplate } from "./cardTemp.mjs";

const profile = load("profile");
const userName = profile?.name || "unknown name";
console.log(userName);

export async function renderSpecificCard(parent, listingData) {
    const specificCardContainer = document.createElement("div");
    specificCardContainer.classList.add("specific-container");
  
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

  const placeBidBtn = document.createElement("button");
    placeBidBtn.setAttribute("type", "button"); 
    placeBidBtn.classList.add("btn", "btn-green");
    placeBidBtn.innerText = "Place Bid";


 
specificCardContainer.appendChild(imgSlider);
  parent.appendChild(yourCreditsParagraph);
  parent.appendChild(yourCreditsValue);
 bidHereContainer.appendChild(bidHereLabel);
 bidHereContainer.appendChild(bidInput)
  bidHereContainer.appendChild(placeBidBtn);

  specificCardContainer.appendChild(bidHereContainer);
  parent.appendChild(specificCardContainer);
  } catch (error) {
    console.error('Error fetching the users credits:', error);
  }
}

// Function to register bid in the API
async function registerBid(listingId, bidAmount) {
    const bidData = {
        amount: bidAmount,
    };

    const response = await fetch(`${API_BASE_URL}/auction/listings/${listingId}/bids`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bidData),
    });

    if (!response.ok) {
        throw new Error(`Failed to register bid. Status: ${response.status}`);
    }
}