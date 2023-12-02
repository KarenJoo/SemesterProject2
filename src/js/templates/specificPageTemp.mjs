

export function renderSpecificCard(parent, listingData) {
    const specificCardContainer = document.createElement("div");
    specificCardContainer.classList.add("specific-container");
  
    const imgSlider = document.createElement("p");
    imgSlider.id = "imgSlider";
    imgSlider.innerText = "Image slider:";
  
    // Bid here elements
  const bidHereContainer = document.createElement("div");
  bidHereContainer.classList.add("bid-here-container");

  const bidHereLabel = document.createElement("h6");
  bidHereLabel.classList.add("bids", "mt-1");
  bidHereLabel.innerText = "Bid here";

  const bidHereInput = document.createElement("input");
  bidHereInput.setAttribute("type", "number");
  bidHereInput.classList.add("form-control", "input-group-sm");

  bidHereContainer.appendChild(bidHereLabel);
  bidHereContainer.appendChild(bidHereInput);

  // Your Credits elements
  const yourCreditsContainer = document.createElement("div");
  yourCreditsContainer.classList.add("your-credits-container");

  const yourCreditsLabel = document.createElement("p");
  yourCreditsLabel.classList.add("credits", "mt-1", "text-green");
  yourCreditsLabel.innerText = "Your Credits";

  const yourCreditsInput = document.createElement("input");
  yourCreditsInput.setAttribute("type", "number");
  yourCreditsInput.classList.add("form-control");
  yourCreditsInput.style.width = "100px";

  yourCreditsContainer.appendChild(yourCreditsLabel);
  yourCreditsContainer.appendChild(yourCreditsInput);

  // Append everything to the specificCardContainer
  specificCardContainer.appendChild(imgSlider);
  specificCardContainer.appendChild(bidHereContainer);
  specificCardContainer.appendChild(yourCreditsContainer);

  // Append the specificCardContainer to the parent
  parent.appendChild(specificCardContainer);
  }
  