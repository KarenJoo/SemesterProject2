import { cardTemplate, renderCardTemplate, renderCardsTemplate } from "../templates/cardTemp.mjs";
import * as cardMethods from "../listings/index.mjs";
import { filterListings, searchListener, filterListener, getActiveFilter } from "../handlers/listings/filterListings.mjs";


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
  
  