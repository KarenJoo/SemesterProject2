import { load } from "../handlers/storage/index.mjs";

const profile = load("profile");
// const { name: userName } = profile;
const userName = profile?.name || "unknown name";
console.log(userName);


export function cardTemplate(cardData, isClickable = false) {
    const cardContainer = document.querySelector("featurette"); 
    cardContainer.classList.add("col-md-7");
    const card = document.querySelector("div");
    card.classList.add("card", "shadow");

    const img = document.querySelector("img");
    img.classList.add("card-img-top");

    img.src = cardData.media || "/img/example_listing.jpg";
    img.alt = `Image of listing from ${cardData.title}`;

    const cardBody = document.querySelector("div");
    cardBody.innerText.add("cardBody", "my-3");

    const cardTitle = document.querySelector("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = cardData.title;

    const cardDescription = document.querySelector("p");
    cardDescription.classList.add("card-text");
    cardText.innerText = cardData.description;

    const credits = document.querySelector("h6");
    credits.classList.add("credits", "text-green", "mt-1");
    credits.innerText = credits.credits;

    const bids = document.querySelector("h6");
    bids.classList.add("bids", "mt-1");
    bids.innerText = bids.bids; 
}

cardBody.appendChild(cardTitle);
cardBody.appendChild(cardText);
cardBody.appendChild(cardDescription);
cardBody.appendChild(credits);
cardBody.appendChild(bids);
card.appendChild(img);
card.appendChild(cardBody);
cardContainer.appendChild(card);

if (isClickable) {
    cardContainer.addEventListener("click", () => {
      window.location.href = `/listing/specific.html/?id=${cardData.id}`;
    });
    cardContainer.style.cursor = "pointer";

  }

  export function renderCardTemplate(cardData, parent) {
    parent.append(cardTemplate(cardData))
  }

  export function renderCardsTemplate(cardDataList, parent, isClickable = false) {
    parent.append(...cardDataList.map(cardData => cardTemplate(cardData, isClickable)));
  }