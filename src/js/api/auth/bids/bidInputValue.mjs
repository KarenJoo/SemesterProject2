export function setBidInputMin(listingData) {
    const bidInput = document.getElementById("bidAmount");

    if (!bidInput) {
        console.error("Bid input field not found");
        return;
    }

    const bidAmounts = (listingData.bids || []).map(bid => bid.amount);
    
    // get the highest bid amount
    const highestBid = Math.max(...bidAmounts, 0);

    // sets min bid amount 
    bidInput.min = highestBid;

    const bidInputText = document.createElement("p");
    bidInputText.classList.add("my-1", "text-secondary", "mt-2")
    bidInputText.innerText = `Current highest bid: ${highestBid}`;
  
    bidInput.parentElement.appendChild(bidInputText);
    
}