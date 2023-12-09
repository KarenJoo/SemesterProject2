
export function renderProfileListings(profileData) {
    const listingsContainer = document.createElement("div");
    listingsContainer.classList.add("container-fluid", "mb-5");
    listingsContainer.style.minHeight = "100vh";

    const yourListings = document.createElement("h2");
    yourListings.classList.add("mb-2", "text-green");
    yourListings.innerText = "All listings";
    listingsContainer.appendChild(yourListings);

    profileData.forEach(({ title, endsAt, media, id, _count }) => {
        const { bids } = _count;
          
        const listingItem = document.createElement("div");
        listingItem.classList.add("card", "mb-3");

        // Create and append elements for listing details
        const titleElement = document.createElement("h5");
        titleElement.classList.add("card-title");
        titleElement.innerText = title;

        const endsAtElement = document.createElement("p");
        endsAtElement.classList.add("card-text");
        endsAtElement.innerText = `Ends at: ${new Date(endsAt).toLocaleString()}`;


        listingItem.appendChild(titleElement);
        listingItem.appendChild(endsAtElement);

        // Make the entire card clickable
        listingItem.addEventListener("click", () => {
            window.location.href = `/listing/specific.html?id=${id}`;
        });

        

        listingItem.style.cursor = "pointer";

        // Append the listing item to the container
        listingsContainer.appendChild(listingItem);
    });

    // Append the listingsContainer to the main section
    const mainSection = document.querySelector('main');
    mainSection.appendChild(listingsContainer);
}