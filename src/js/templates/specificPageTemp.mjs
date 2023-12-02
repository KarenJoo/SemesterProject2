import { getSellerProfile } from "../api/auth/profile/fetchProfiles.mjs";
import { load } from "../handlers/storage/index.mjs";

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


   
    // Bid here elements
  const bidHereContainer = document.createElement("div");
  bidHereContainer.classList.add("bid-here-container");

  const bidHereLabel = document.createElement("h6");
  bidHereLabel.classList.add("bids", "mt-1");
  bidHereLabel.innerText = "Bid here";

  const bidHereInput = document.createElement("input");
  bidHereInput.setAttribute("type", "number");
  bidHereInput.classList.add("form-control", "input-group-sm");

  bidHereContainer.appendChild(bidHereLabel);
  bidHereContainer.appendChild(bidHereInput);

  // Your Credits elements
  const yourCreditsContainer = document.createElement("div");
  yourCreditsContainer.classList.add("your-credits-container");

specificCardContainer.appendChild(imgSlider);
  parent.appendChild(yourCreditsParagraph);
  parent.appendChild(yourCreditsValue);

  
  specificCardContainer.appendChild(bidHereContainer);

  // Append the specificCardContainer to the parent
  parent.appendChild(specificCardContainer);
  } catch (error) {
    console.error('Error fetching the users credits:', error);
  }
}
  