const bidAmount = 0;

export function bidInputHandler (bidInput) {
    bidInput.addEventListener("input", (event) => {
        bidAmount = parseFloat(event.target.value)  || 0;
    });

    return {
        getBidAmount: () => bidAmount,
};

}