import { load } from "../handlers/storage/index.mjs";

// const profile = load("profile");
// // const { name: userName } = profile;
// const userName = profile?.name || "unknown name";
// console.log(userName);

export function cardTemplate(cardData, isClickable = false) {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("row", "featurette");
  
    const card = document.createElement("div");
    card.classList.add("col-md-7");
  
    const cardElement = document.createElement("div");
    cardElement.classList.add("card", "shadow");
    cardElement.style.width = "18rem";
  
    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = cardData.media[0] || "/img/example_listing.jpg"; // Use the first media item
    img.alt = `Image of listing from ${cardData.title}`;
  
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "my-3");
  
    const sellerParagraph = document.createElement("p");
    sellerParagraph.id = "seller";
    sellerParagraph.innerText = `Seller: ${cardData.seller.name}`;
  
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = cardData.title;
  
    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.innerText = cardData.description;
  
    // Additional elements can be added here...
  
    // Append elements to the DOM
    cardBody.appendChild(sellerParagraph);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardElement.appendChild(img);
    cardElement.appendChild(cardBody);
    card.appendChild(cardElement);
    cardContainer.appendChild(card);
  
    if (isClickable) {
      cardContainer.addEventListener("click", () => {
        window.location.href = `/listing/specific.html?id=${cardData.id}`;
      });
      cardContainer.style.cursor = "pointer";
    }
  
    return cardContainer;
  }
  
  // Function to render a single card
  export function renderCardTemplate(cardData, parent, isClickable = false) {
    const card = cardTemplate(cardData, isClickable);
    parent.appendChild(card);
  }
  
  // Function to render multiple cards
  export function renderCardsTemplate(cardDataList, parent, isClickable = false) {
    cardDataList.forEach((cardData) => {
      renderCardTemplate(cardData, parent, isClickable);
    });
  }