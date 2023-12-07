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
    
  try { 
      
    const specificDataDiv = document.createElement("div");
    specificDataDiv.classList.add("specific-container", "mx-auto");
    specificDataDiv.style.height = "auto";
    specificDataDiv.style.width = "100%";

    // image slider container
    const imgSliderContainer = document.createElement("div");
    imgSliderContainer.classList.add("img-slider-container", "bg-green");
    imgSliderContainer.style.height = "auto";
    imgSliderContainer.style.overflow = "hidden";
    imgSliderContainer.style.position = "relative"; 


    const imgSlider = document.createElement("div");
    imgSlider.id = "imgSlider";
    imgSlider.classList.add("carousel", "slide");

    const imgSliderInner = document.createElement("div");
    imgSliderInner.classList.add("carousel-inner");

      // Iterate through the media URLs 
      listingData.media.forEach((mediaUrl, index) => {
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
  
        const img = document.createElement("img");
        img.src = mediaUrl;
        img.classList.add("aspect-ratio-item", "object-fit-cover");
  
        carouselItem.appendChild(img);
        imgSliderInner.appendChild(carouselItem);
  
        // Set the first item as active
        if (index === 0) {
          carouselItem.classList.add("active");
        }
      });
   // Add navigation controls
      const prevButton = document.createElement("button");
      prevButton.classList.add("carousel-control-prev");
      prevButton.setAttribute("type", "button");
      prevButton.setAttribute("data-bs-target", `#${imgSlider.id}`);
      prevButton.setAttribute("data-bs-slide", "prev");
      prevButton.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>';
  
      const nextButton = document.createElement("button");
      nextButton.classList.add("carousel-control-next");
      nextButton.setAttribute("type", "button");
      nextButton.setAttribute("data-bs-target", `#${imgSlider.id}`);
      nextButton.setAttribute("data-bs-slide", "next");
      nextButton.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>';
  
      imgSlider.appendChild(imgSliderInner);
      imgSlider.appendChild(prevButton);
      imgSlider.appendChild(nextButton);

  
      imgSliderContainer.appendChild(imgSlider);
      specificDataDiv.appendChild(imgSliderContainer); 
      

        // Add the image slider container to the card container
        const cardContainer = document.createElement("div");
        cardContainer.id = "cardContainer";
        cardContainer.classList.add("row", "featurette", "container-fluid", "mb-4");
      

  
        // Fetch end user's credits
        const endUserProfile = await getSellerProfile(userName); 
        const endUserCredits = endUserProfile?.credits || 0;

 // Your Credits elements
        const creditsContainer = document.createElement("div");
        creditsContainer.classList.add("your-credits-container");

        // Display end user credits
        const yourCreditsParagraph = document.createElement("p");
        yourCreditsParagraph.classList.add("mb-1");
        yourCreditsParagraph.innerText = "Your Credits:";

        const yourCreditsValue = document.createElement("p");
        yourCreditsValue.classList.add("mb-4");
        yourCreditsValue.innerText = endUserCredits;

       


specificDataDiv.appendChild(imgSliderContainer);
 specificDataDiv.appendChild(creditsContainer);
 specificDataDiv.appendChild(yourCreditsParagraph);
 specificDataDiv.appendChild(yourCreditsValue);
specificDataDiv.appendChild(cardContainer);

 parent.appendChild(specificDataDiv);

  } catch (error) {
    console.error('Error fetching the users credits:', error);
  }
}

  
  