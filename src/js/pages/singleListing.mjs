import { renderCardTemplate, cardTemplate } from "../templates/cardTemp.mjs";
import * as cardMethods from "../listings/index.mjs";
import { bidListener } from "../api/auth/bids/bidListener.mjs";

/**
 * Fetches a single listing by ID, renders the card template, and displays it in the specified container.
 *
 * @returns {Promise<void>} Resolves once the listing is fetched and the template is rendered.
 * @async
 */
export async function singleCardTemplate() {
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

    const isSpecificPage = window.location.pathname.includes("/src/listing/specific.html");
    const card = cardTemplate(listing, container, isSpecificPage);
    
    container.appendChild(card);
  
  } catch (error) {
    console.error("Error fetching or rendering listing:", error.message);
  }
}

