import { load } from "../handlers/storage/index.mjs";
import { getTimeDifference, formatTimeDifference } from "../handlers/getTimeDiff.mjs";

export function cardTemplate(cardData, isClickable = false) {

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("mb-2", "col-12", "col-md-4");
  
    const card = document.createElement("div");
    card.classList.add("mx-1", "mb-3");
  
    const cardSize = document.createElement("div");
    cardSize.classList.add("card", "shadow-sm", "d-flex", "flex-column", "flex-grow-1");
    cardSize.style.width = "100%";
  
    //if no media > insert example image
    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = cardData.media[0] || "/img/example_listing.jpg";
    img.alt = `Image of listing from ${cardData.title}`;
  
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "my-1");
  
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

    const yourCreditsTable = document.createElement("tr");
    const yourCreditsRow1 = document.createElement("td");

    const yourCredits = document.createElement("p");
    yourCredits.classList.add("credits", "mt-1", "text-green");
    yourCredits.innerText = "Your Credits";
    const yourCreditsTableData = document.createElement("td");
    const yourCreditsInput = document.createElement("div");
    yourCreditsInput.classList.add("input-group-sm");
    const yourCreditsValue = document.createElement("input");
    yourCreditsValue.setAttribute("type", "number");
    yourCreditsValue.classList.add("form-control");
    yourCreditsValue.style.width = "100px";

   
    yourCreditsRow1.appendChild(yourCredits);
    yourCreditsTableData.appendChild(yourCreditsInput);
    yourCreditsInput.appendChild(yourCreditsValue);
    yourCreditsTable.appendChild(yourCreditsRow1);
    yourCreditsTable.appendChild(yourCreditsTableData);
    tbody.appendChild(yourCreditsTable);

    

    const bidTable = document.createElement("tr");
    const bidTableData1 = document.createElement("td");
    const bidHere = document.createElement("h6");
    bidHere.classList.add("bids", "mt-1");
    bidHere.innerText = "Bid here";

    const bidTableData2 = document.createElement("td");
    const bidInputGroup = document.createElement("div");
    bidInputGroup.classList.add("input-group-sm");
    const bidInputTable = document.createElement("input");

    bidInputTable.setAttribute("type", "number");
    bidInputTable.classList.add("form-control");
    bidInputTable.style.width = "100px"; 
    
    // Bid here input (chatGPT)
    const bidsCount = cardData._count && cardData._count.bids !== undefined ? cardData._count.bids : 0;

    


    bidTableData1.appendChild(bidHere);
    bidTableData2.appendChild(bidInputGroup);
    bidInputGroup.appendChild(bidInputTable);
    bidTable.appendChild(bidTableData1);
    bidTable.appendChild(bidTableData2);
    tbody.appendChild(bidTable);

    table.appendChild(tbody);

    
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

// Time left and Bids Section
    const timeBidsContainer = document.createElement("div");
    timeBidsContainer.classList.add("container", "d-flex", "justify-content-between");

// Display getTimeDiff as days, hours, min > endsAt
    const endsAt = cardData.endsAt || "N/A";
    const { days, hours, minutes } = getTimeDifference(endsAt);

    const timeLeft = document.createElement("p");
    timeLeft.classList.add("list-group-item");
    timeLeft.innerText = "Time left:";

    const timeLeftValue = document.createElement("p");
    timeLeftValue.id = "endsAt";
    timeLeftValue.innerText = formatTimeDifference(days, hours, minutes); 

    
    const bidsParagraph = document.createElement("p");
    bidsParagraph.classList.add("list-group-item");
    bidsParagraph.innerText = "Bids:";

    const bidsValue = document.createElement("p");
    bidsValue.id = "bids";
    bidsValue.innerText = bidsCount; 

    timeBidsContainer.appendChild(timeLeft);
    timeBidsContainer.appendChild(timeLeftValue);

    timeBidsContainer.appendChild(bidsParagraph);
    timeBidsContainer.appendChild(bidsValue);
    cardBody.appendChild(timeBidsContainer);

    // Bid button Section
    const bidButtonContainer = document.createElement("div");
    bidButtonContainer.classList.add("card-body", "d-flex", "justify-content-center");

    const bidButton = document.createElement("button");
    bidButton.setAttribute("type", "button");
    bidButton.classList.add("btn", "btn-outline-secondary", "shadow");
    bidButton.innerText = "Bid here";

    bidButtonContainer.appendChild(bidButton);
    cardBody.appendChild(bidButtonContainer);

    
  
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