import { cardTemplate } from "../templates/cardTemp.mjs";
import { renderCardTemplate } from "../templates/cardTemp.mjs";
import * as cardMethods from "../listings/index.mjs";

async function allCardsTemplate() {
    const cards = await postMethods.getCards();
    console.log(cards);
    const post = cards.pop();
    const container = document.querySelector("#card");
    container.innerHTML = "";
    // searchListener(cards, container);
    // filterListener(cards, container);

    renderCardTemplate(cards, container, true);
  }
  allCardsTemplate();