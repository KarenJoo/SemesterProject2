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
    cardContainer.id = "cardContainer";
    cardContainer.classList.add("row", "featurette", "container-fluid", "mb-4");
 
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "my-1");
  
    const card = document.createElement("div");
    card.classList.add("mx-1", "mb-3", "mt-3", "d-flex", "flex-column");
  
    const cardSize = document.createElement("div");
    cardSize.classList.add("card", "shadow-sm");
    cardSize.style.minHeight = "700px";
    cardSize.style.maxHeight = "70%";
    cardSize.style.height = "400px";

 
    
    // Container for maintaining aspect ratio
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("aspect-ratio", "aspect-ratio-4x5");

    //if no media > insert example image
  if(!isSpecificPage) {
    const img = document.createElement("img");
    img.classList.add("card-img-top", "aspect-ratio-item", "object-fit-cover");
    img.classList.add("listing-image");
    img.src = listingData.media[0] || "/img/example_listing.jpg";
    img.alt = `Image of listing from ${listingData.title}`;
    
    imgContainer.appendChild(img);
    cardSize.appendChild(img);

  }
    

    // seller 
  const sellerContainer = document.createElement("div");
  sellerContainer.id = "seller-container";
  sellerContainer.classList.add("d-flex", "align-items-center");
  
    const sellerParagraph = document.createElement("p");
    sellerParagraph.classList.add("mb-1");
    sellerParagraph.innerText = `Seller:`;

// seller > profile page
const seller = document.createElement("a");
seller.style.fontSize = "12px";
seller.classList.add("clickable", "mx-1", "mb-1", "text-green");
seller.href = `/profile/index.html?name=${listingData.seller.name}`;
seller.innerText = `${listingData.seller.name}`;


// click event to the seller's name
seller.addEventListener("click", (event) => {
    window.location.href = `/profiles/index.html?name=${listingData.seller.name}`;
    event.stopPropagation();
});


// card data 
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title", "mt-2");
    cardTitle.innerText = listingData.title;
  
    const cardText = document.createElement("p");
    cardText.classList.add("card-text", "mb-4");
    cardText.innerText = listingData.description;

    
    if (isSpecificPage) {
      cardSize.style.minHeight = "auto";
      cardSize.style.maxHeight = "none";
      cardSize.style.height = "auto";
      cardContainer.classList.add("mt-5");
  } else {
      cardSize.style.minHeight = "100vh";
      cardSize.style.maxHeight = "50%";
  }
 
    // Append elements to the DOM     
     sellerContainer.appendChild(sellerParagraph);
    sellerContainer.appendChild(seller);
     cardBody.appendChild(sellerContainer);

     cardSize.appendChild(cardBody); 
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);

    if (isSpecificPage) {
      const specificPageData = document.createElement("div");
      specificPageData.classList.add("specific-container", "container");
      renderSpecificCard(specificPageData, listingData, isSpecificPage);
      cardBody.appendChild(specificPageData);
      
    } 

    cardContainer.appendChild(card);
    card.appendChild(cardSize);   


    // Bid here input (chatGPT)
    const bidsCount = listingData._count && listingData._count.bids !== undefined ? listingData._count.bids : 0;

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
    removeBtn.classList.add("btn-sm", "btn", "btn-outline-danger");
    removeBtn.innerText = "Delete your listing";
    removeBtn.id = `removeListingBtn-${listingData.id}`;

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

 



