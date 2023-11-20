import { load } from "../handlers/storage/index.mjs";

// const profile = load("profile");
// // const { name: userName } = profile;
// const userName = profile?.name || "unknown name";
// console.log(userName);

export function cardTemplate(cardData, isClickable = false) {

    const container = document.createElement("container");
    container.classList.add("mt-5");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("row", "featurette");
  
    const card = document.createElement("div");
    card.classList.add("col-m-7", "d-flex", "justify-content-center");
  
    const cardSize = document.createElement("div");
    cardSize.classList.add("card", "shadow-sm");
    cardSize.style.width = "18rem";
  
    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = cardData.media[0] || "/img/example_listing.jpg"; // Use the first media item
    img.alt = `Image of listing from ${cardData.title}`;
  
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "my-3", "mx-2");
  
    const seller = document.createElement("p");
    seller.id = "seller";
    seller.innerText = `Seller: ${cardData.seller.name}`;
  
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = cardData.title;
  
    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.innerText = cardData.description;

    const bidRow = document.createElement("div");
    bidRow.classList.add("row", "mt-1");

    const bidLabel = document.createElement("h6");
    

    const bidInput = document.createElement("input");
    bidInput.setAttribute("type", "number");
    bidInput.classList.add("form-control", "input-group-sm");

    const table = document.createElement("table");
    table.classList.add("table");

    const tbody = document.createElement("tbody");

    const creditsTable = document.createElement("tr");
    const creditsTableData1 = document.createElement("td");
    const creditsParagraph = document.createElement("p");
    creditsParagraph.classList.add("credits", "mt-1", "text-green");
    creditsParagraph.innerText = "Credits";
    const creditsTableData2 = document.createElement("td");
    const creditsInputGroup = document.createElement("div");
    creditsInputGroup.classList.add("input-group-sm");
    const creditsInputTable = document.createElement("input");
    creditsInputTable.setAttribute("type", "number");
    creditsInputTable.classList.add("form-control");
    creditsInputTable.style.width = "100px";

    creditsTableData1.appendChild(creditsParagraph);
    creditsTableData2.appendChild(creditsInputGroup);
    creditsInputGroup.appendChild(creditsInputTable);
    creditsTable.appendChild(creditsTableData1);
    creditsTable.appendChild(creditsTableData2);
    tbody.appendChild(creditsTable);

    const bidTable = document.createElement("tr");
    const bidTableData1 = document.createElement("td");
    const bidTableHeader = document.createElement("h6");
    bidTableHeader.classList.add("bids", "mt-1");
    bidTableHeader.innerText = "Bid here";
    const bidTableData2 = document.createElement("td");
    const bidInputGroup = document.createElement("div");
    bidInputGroup.classList.add("input-group-sm");
    const bidInputTable = document.createElement("input");
    bidInputTable.setAttribute("type", "number");
    bidInputTable.classList.add("form-control");
    bidInputTable.style.width = "100px";

    bidTableData1.appendChild(bidTableHeader);
    bidTableData2.appendChild(bidInputGroup);
    bidInputGroup.appendChild(bidInputTable);
    bidTable.appendChild(bidTableData1);
    bidTable.appendChild(bidTableData2);
    tbody.appendChild(bidTable);

    table.appendChild(tbody);



    // const credits = document.createElement("div");
    // credits.classList.add("row", "mt-1");

    // const creditsLabel = document.createElement("p");
    // creditsLabel.classList.add("credits", "mt-1", "text-green");
    // creditsLabel.innerText = "Credits";

    // const creditsInput = document.createElement("input");
    // creditsInput.setAttribute("type", "number");
    // creditsInput.classList.add("form-control", "input-group-sm");
  
    
    // Append elements to the DOM
    cardBody.appendChild(seller);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(bidRow);
    cardSize.appendChild(img);
    cardBody.appendChild(table);
    cardSize.appendChild(cardBody);
    card.appendChild(cardSize);
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