import { cardTemplate, renderCardTemplate, renderCardsTemplate } from "../templates/cardTemp.mjs";
import * as cardMethods from "../listings/index.mjs";


async function allCardsTemplate() {
    console.log("Inside allCardsTemplate");
      const listings = await cardMethods.getListings();
      console.log(listings);
      const listing = listings.pop();
  
      const container = document.getElementById("cardContainer"); 
      container.innerHTML = "";
  
  renderCardsTemplate(listings, container, true)
  }
  
  allCardsTemplate();