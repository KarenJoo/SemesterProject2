import { API_BASE_URL } from "../api/API.mjs";
import { getSellerProfile } from "../api/auth/profile/fetchProfiles.mjs";
import { load } from "../handlers/storage/index.mjs";
import { placeBid } from "../api/auth/bids/bidAuth.mjs";
import { bidListener } from "../api/auth/bids/bidListener.mjs";


const profile = load("profile");
const userName = profile?.name || "unknown name";
console.log(userName);


export async function renderSpecificCard(parent, listingData, url) {

  try { 
       
  
    const specificDataDiv = document.createElement("div");
    specificDataDiv.classList.add("specific-container", "mx-auto", "container");
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
        cardContainer.classList.add("row", "featurette", "container", "mb-2", "mt-4", "mx-auto");
      

        // Fetch end user's credits
        const endUserProfile = await getSellerProfile(userName); 
        const endUserCredits = endUserProfile?.credits || 0;

 // Your Credits elements
        const creditsContainer = document.createElement("div");
        creditsContainer.classList.add("your-credits-container", "d-flex");

        // Display end user credits
        const yourCreditsParagraph = document.createElement("p");
        yourCreditsParagraph.classList.add("mx-2");
        yourCreditsParagraph.innerText = "Your Credits:";

        const yourCreditsValue = document.createElement("p");
        yourCreditsValue.classList.add("mb-2", "text-green");
        yourCreditsValue.innerText = endUserCredits;

    // Bid container
    const bidForm = document.createElement("form");
    bidForm.classList.add( "mb-3", "d-flex");
    bidForm.method = 'POST';
    bidForm.id = "bid-form";


    // Bid input field
    const bidInput = document.createElement("input");
    bidInput.type = "number";
    bidInput.classList.add("form-control", "mt-1");
    bidInput.style.width = "60%";
    bidInput.style.height = "30px";
    bidInput.placeholder = "Bid amount";
    bidInput.name = "amount";
    bidInput.id = "bidAmount";


    // Bid button
    const bidButton = document.createElement("button");
    bidButton.type = "submit";
    bidButton.style.height = "30px";
    bidButton.classList.add("btn", "btn-outline-primary", "mt-1", "btn-sm");
    bidButton.innerText = "Place Bid";
   

  specificDataDiv.appendChild(imgSliderContainer);
    
 cardContainer.appendChild(creditsContainer);
 creditsContainer.appendChild(yourCreditsParagraph);
 creditsContainer.appendChild(yourCreditsValue);  

bidForm.appendChild(bidInput);
bidForm.appendChild(bidButton); 
cardContainer.appendChild(bidForm);

 

 specificDataDiv.appendChild(cardContainer);
 parent.appendChild(specificDataDiv); 


  // Extract bidder names
const bidderNames = (listingData.bids || []).map(bid => bid.bidderName);

const bidListContainer = document.createElement("div");
bidListContainer.id = "bidListContainer";
bidListContainer.classList.add("row", "featurette", "container-fluid", "mb-5", "mt-1");

cardContainer.appendChild(bidListContainer);


const bidderNamesContainer = document.createElement("div");
bidderNamesContainer.classList.add("row", "featurette", "container-fluid", "mb-4", "mt-1");

const bidderNamesTitle = document.createElement("h3");
bidderNamesTitle.classList.add("text-green");
bidderNamesTitle.innerText = "Bids on listing";

const bidderNamesList = document.createElement("div");
bidderNamesList.classList.add("text-primary");
bidderNames.forEach(bidderName => {
  const bidderNameItem = document.createElement("p");
  bidderNameItem.classList.add("mb-1");
  bidderNameItem.innerText = bidderName;
  bidderNamesList.appendChild(bidderNameItem);
});


bidderNamesContainer.appendChild(bidderNamesTitle);
bidderNamesContainer.appendChild(bidderNamesList);


// Add bidderNamesContainer to the parent container
parent.appendChild(bidderNamesContainer);
  } catch (error) {
    console.error('Error fetching the users credits:', error);
  }

  const form = document.querySelector('#bid-form')
  console.log(form)

  bidListener(form);
}



  