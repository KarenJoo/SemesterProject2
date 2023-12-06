import { load } from "../handlers/storage/index.mjs";
import { getTimeDifference, formatTimeDifference } from "../handlers/storage/getTimeDiff.mjs";
import { removeListing } from "../listings/remove.mjs";
import { renderSpecificCard } from "./specificPageTemp.mjs";
import { authFetch } from "../listings/authFetch.mjs";
import * as bids from "../api/auth/bids/index.mjs";

const profile = load("profile");
const userName = profile?.name || "unknown name";
console.log(userName);

export function cardTemplate(listingData, isClickable = false, isSpecificPage) {

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("mb-1", "col-12", "col-lg-4", "mb-1", "mx-auto");
  
    const card = document.createElement("div");
    card.classList.add("mx-1", "mb-3", "mt-3", "d-flex", "flex-column");
  
    const cardSize = document.createElement("div");
    cardSize.classList.add("card", "shadow-sm");
    cardSize.style.minHeight = "700px";
    cardSize.style.maxHeight = "70%";
    cardSize.style.height = "400px";

     // Update styles for specific page
     if (isSpecificPage) {
      cardContainer.style.height = "100vh";
      cardContainer.style.width = "100%";
      card.style.height = "100vh";
      cardSize.style.minHeight = "80vh"; 
      cardSize.style.maxHeight = "80vh"; 
      cardSize.style.height = "auto"; 
  } else {
      // Styles for non-specific page
      cardSize.style.minHeight = "700px";
      cardSize.style.maxHeight = "70%";
      cardSize.style.height = "400px";
  }
    
    // Container for maintaining aspect ratio
const imgContainer = document.createElement("div");
imgContainer.classList.add("aspect-ratio", "aspect-ratio-4x5");

    //if no media > insert example image
  if(!isSpecificPage) {
    const img = document.createElement("img");
    img.classList.add("card-img-top", "aspect-ratio-item", "object-fit-cover", "w-100", "h-600");
    img.classList.add("listing-image");
    img.src = listingData.media[0] || "/img/example_listing.jpg";
    img.alt = `Image of listing from ${listingData.title}`;
  imgContainer.appendChild(img);
    cardSize.appendChild(img);

  }

 
    
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "my-1");
  // card data on specific.html

    if (isSpecificPage) {
      const specificPageData = document.createElement("div");
      specificPageData.classList.add("specific-container", "container");
      cardContainer.style.height = "100vh";
      cardContainer.style.width = "100%";
      card.style.height = "100vh";
      
      renderSpecificCard(specificPageData, listingData);
      cardBody.appendChild(specificPageData);

    }

    // seller container
const sellerContainer = document.createElement("div");
sellerContainer.id = "seller-container";
sellerContainer.classList.add("d-flex", "align-items-center");
  
    const sellerParagraph = document.createElement("p");
    sellerParagraph.classList.add("mb-1");
    sellerParagraph.innerText = `Seller:`;

// seller clickable tag
const seller = document.createElement("a");
seller.style.fontSize = "12px";
seller.classList.add("clickable", "mx-1", "mb-1", "text-green");
seller.href = `/profile/index.html?name=${listingData.seller.name}`;
seller.innerText = `${listingData.seller.name}`;


// Add click event to the seller's name
seller.addEventListener("click", (event) => {
    window.location.href = `/profiles/index.html?name=${listingData.seller.name}`;
    event.stopPropagation();
});

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title", "mt-2");
    cardTitle.innerText = listingData.title;
  
    const cardText = document.createElement("p");
    cardText.classList.add("card-text", "mb-4");
    cardText.innerText = listingData.description;
    
    
    // Bid here input (chatGPT)
    const bidsCount = listingData._count && listingData._count.bids !== undefined ? listingData._count.bids : 0;


    // Append elements to the DOM
    sellerContainer.appendChild(sellerParagraph);
    sellerContainer.appendChild(seller);
    cardBody.appendChild(sellerContainer);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    
    cardSize.appendChild(cardBody);
    card.appendChild(cardSize);
    cardContainer.appendChild(card);

    
     // Bid and Credits container
  const bidAndCreditsContainer = document.createElement("div");
  bidAndCreditsContainer.classList.add("mb-5");

  // Your Credits elements
  const yourCreditsParagraph = document.createElement("p");
  yourCreditsParagraph.classList.add("mb-1");
  yourCreditsParagraph.innerText = "Your Credits:";

  const yourCreditsValue = document.createElement("p");
  yourCreditsValue.classList.add("mb-4");
  yourCreditsValue.innerText = "0"; // Set initial value

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
    event.stopPropagation();
  });

  const bidForm = document.createElement("form");
  bidForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const bidAmount = bidInput.value;
    const listingId = listingData.id;

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

  // Handle bid placement
  placeBidBtn.addEventListener("click", async () => {
  
    // Fetch updated credits
    const updatedEndUserProfile = await getSellerProfile(userName);
    const updatedEndUserCredits = updatedEndUserProfile?.credits || 0;
    yourCreditsValue.innerText = updatedEndUserCredits;

    // Fetch updated bid count for the specific listing
    await renderSpecificCard(parent, listingData);
  });

  bidForm.appendChild(placeBidBtn);
  bidHereContainer.appendChild(bidHereLabel);
  bidHereContainer.appendChild(bidInput);
  bidForm.appendChild(bidHereContainer);

  // Append bid and credits elements to the container
  bidAndCreditsContainer.appendChild(creditsContainer);
  bidAndCreditsContainer.appendChild(bidForm);


  // Append creditsContainer only when isSpecificPage is true
  if (isSpecificPage) {
    bidAndCreditsContainer.appendChild(creditsContainer);
  }

  // Append bid and credits container based on isSpecificPage
  if (isSpecificPage) {
    cardBody.appendChild(bidAndCreditsContainer);
    cardBody.appendChild(bidForm);
  } else {
    cardContainer.appendChild(bidAndCreditsContainer);
  }


// Time left and Bids Section
    const timeBidsContainer = document.createElement("div");
    timeBidsContainer.classList.add("container", "d-flex", "justify-content-between");

// Display getTimeDiff as days, hours, min > endsAt
    const endsAt = listingData.endsAt || "N/A";
    const { days, hours, minutes } = getTimeDifference(endsAt);
    const formattedTimeDifference = formatTimeDifference(days, hours, minutes);
    console.log('Formatted time difference:', formattedTimeDifference);

    const timeLeft = document.createElement("p");
    timeLeft.classList.add("list-group-item");
    timeLeft.innerText = "Time left:";

    const timeLeftValue = document.createElement("p");
    timeLeftValue.id = "endsAt";
    timeLeftValue.innerText = formattedTimeDifference;

    
    const bidsParagraph = document.createElement("p");
    bidsParagraph.classList.add("list-group-item");
    bidsParagraph.innerText = "Bids:";

    const bidsValue = document.createElement("p");
    bidsValue.id = "bids";
    bidsValue.innerText = bidsCount; 

    timeBidsContainer.appendChild(timeLeft);
    timeBidsContainer.appendChild(timeLeftValue);

    timeBidsContainer.appendChild(bidsParagraph);
    timeBidsContainer.appendChild(bidsValue);
    cardBody.appendChild(timeBidsContainer);

    if (isClickable) {
  cardTitle.style.cursor = "pointer";
      // Add click event to the cardContainer
      cardTitle.addEventListener("click", (event) => {
        const clickedElement = event.target;
    
        // Check if the clicked element is a button or the seller's username
        const isButton = clickedElement.classList.contains("update-listing-btn") ||
        clickedElement.classList.contains("remove-listing-btn") ||
        clickedElement.classList.contains("bid-btn") ||
        clickedElement.classList.contains("button");

    
        const isSellerUsername = clickedElement.classList.contains("text-green");
    
        // Redirect only if the clicked element is a button or the seller's username
        if (isButton || isSellerUsername) {
          event.preventDefault();
    
          if (isButton) {
            // Handle button click (if needed)
          } else if (isSellerUsername) {
            // Redirect to the seller's profile
            window.location.href = `/profiles/index.html?name=${listingData.seller.name}`;
          }
        } else {
          // Redirect to the specific page
          window.location.href = `/listing/specific.html?id=${listingData.id}`;
        }
      });
    }
  
    // if user === author/seller
    const { seller: author } = listingData;
    const isAuthorAndUser = author && author.name === userName;
  
    if (isAuthorAndUser) {
      renderUpdateButton(cardBody, listingData);
      renderRemoveButton(cardBody, listingData);
    } else {

      if(!isSpecificPage) {
      renderBidButton(cardBody, listingData);
      
      
      }
    }

    


    return cardContainer;
  }
  
  function renderUpdateButton(parent, listingData) {
    const updateBtn = document.createElement("button");
    updateBtn.type = "button";
    updateBtn.classList.add("btn-sm", "btn", "btn-outline-primary", "update-listing-btn"); 
    updateBtn.innerText = "Update your listing";
    
  
    updateBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const updateUrl = `/profile/listing/update/index.html?id=${listingData.id}`;
      window.location.href = updateUrl;
      return false;
    });
  
    parent.appendChild(updateBtn);
  }

  function renderRemoveButton(parent, listingData) {
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.classList.add("btn-sm", "btn", "btn-outline-danger", "remove-listing-btn");
    removeBtn.innerText = "Delete your listing";

    removeBtn.addEventListener("click", async (event) => {
      event.preventDefault();

      try {
      const response = await removeListing(listingData.id);
      console.log("Listing removed successfully:", response);

      // Redirect to the feed
      window.location.href = `/index.html`;
    } catch (error) {
      console.error("Error removing listing:", error.message);
    }

    return false;
  });

  parent.appendChild(removeBtn);
}
 
  
function renderBidButton(parent, listingData) {
  const bidButtonContainer = document.createElement("div");
  bidButtonContainer.classList.add("card-body", "d-flex", "justify-content-center");

  const bidButton = document.createElement("button");
  bidButton.setAttribute("type", "button");
  bidButton.classList.add("btn", "btn-outline-secondary", "mx-auto", "shadow", "bid-btn"); 
  bidButton.innerText = "Bid on item";
  
  bidButton.addEventListener("click", (event) => {
      event.preventDefault();
      // Redirect to the specific page for bidding
      window.location.href = `/listing/specific.html?id=${listingData.id}`;
  });

  bidButtonContainer.appendChild(bidButton);
  parent.appendChild(bidButtonContainer);
}



  
  // Function to render a single card
  export function renderCardTemplate(listingData, parent, isClickable = false) {
    const card = cardTemplate(listingData, isClickable);
    parent.appendChild(card);
  }
  
  // Function to render multiple cards
  export function renderCardsTemplate(listingDataList, parent, isClickable = false) {
    listingDataList.forEach((listingData) => {
      renderCardTemplate(listingData, parent, isClickable);
    });
  }

 



