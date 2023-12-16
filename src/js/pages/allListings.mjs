import { cardTemplate, renderCardTemplate, renderCardsTemplate } from "../templates/cardTemp.mjs";
import * as cardMethods from "../listings/index.mjs";
import { filterListings, searchListener, filterListener, getActiveFilter } from "../handlers/listings/filterListings.mjs";

/**
 * Fetches all listings, renders the card template, and sets up search and filter listeners.
 *
 * @returns {Promise<void>} Resolves once the listings are fetched and the template is rendered.
 * @async
 */
export async function allCardsTemplate() {
      const listings = await cardMethods.getListings();
      console.log(listings);
      const listing = listings.pop();
  
      const container = document.getElementById("cardContainer"); 
      container.innerHTML = "";
      searchListener(listings, container);
      filterListener(listings, container);
  
  
  renderCardsTemplate(listings, container, true)
  }

// Call function to fetch listings, render the template, and set up listeners
  allCardsTemplate();
  
  