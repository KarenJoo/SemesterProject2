import { renderCardTemplate, cardTemplate } from "../templates/cardTemp.mjs";
import * as cardMethods from "../listings/index.mjs";
async function singleCardTemplate() {
  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get('id');

  if (!listingId) {
    console.error("Listing ID not provided in the URL");
    return;
  }

  try {
    const listing = await cardMethods.getListing(listingId);
    const container = document.getElementById("cardContainer");

    if (!container) {
      console.error("Container with ID 'cardContainer' not found");
      return;
    }

    container.innerHTML = "";

    const isSpecificPage = window.location.pathname.includes("/listing/specific.html");

    // Use cardTemplate directly
    const card = cardTemplate(listing, container, isSpecificPage);
    
    // Optionally, you can append the card to the container
    container.appendChild(card);
  } catch (error) {
    console.error("Error fetching or rendering listing:", error.message);
  }
}

singleCardTemplate();