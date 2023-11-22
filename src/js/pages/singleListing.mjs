import { renderCardTemplate, cardTemplate } from "../templates/cardTemp.mjs";
import * as cardMethods from "../listings/index.mjs";

async function singleCardTemplate() {
    const urlParams = new URLSearchParams(window.location.search);
    const listingId = urlParams.get('id');

    if (!listingId) {
        console.error("Listing ID not provided in the URL");
        return;
      }

      const listing = await cardMethods.getListing(listingId);
    const container = document.getElementById("cardContainer"); 
    container.innerHTML = "";

renderCardTemplate(listing, container, true);
}

singleCardTemplate();