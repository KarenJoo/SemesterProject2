
/**
 * Renders a list of listings for a user profile.
 * @param {Object[]} profileData - Array of listing data associated with the user profile.
 * @param {string} profileData[].title - The title of the listing.
 * @param {string} profileData[].endsAt - The end date and time of the listing.
 * @param {string[]} profileData[].media - Array of media URLs associated with the listing.
 * @param {string} profileData[].id - The unique identifier of the listing.
 * @param {Object} profileData[]._count - Object containing count information, e.g., bids count.
 * @param {number} profileData[]._count.bids - The number of bids on the listing.
 */
export function renderProfileListings(profileData) {
    const listingsContainer = document.createElement("div");
    listingsContainer.classList.add("container-fluid", "mb-5");
    listingsContainer.style.minHeight = "100vh";

    const yourListings = document.createElement("h2");
    yourListings.classList.add("mb-2", "text-primary", "mx-5");
    yourListings.innerText = "All listings";
    listingsContainer.appendChild(yourListings);

    profileData.forEach(({ title, endsAt, media, id, _count }) => {
        const { bids } = _count;
          
        const listingItem = document.createElement("div");
        listingItem.classList.add("card", "mx-3", "mb-2", "shadow");

        // Create and append elements for listing details
        const titleElement = document.createElement("h5");
        titleElement.classList.add("card-title", "mx-3", "my-3");
        titleElement.innerText = title;

        const endsAtElement = document.createElement("p");
        endsAtElement.classList.add("card-text", "mx-3", "my-3");
        endsAtElement.innerText = `Ends at: ${new Date(endsAt).toLocaleString()}`;


        listingItem.appendChild(titleElement);
        listingItem.appendChild(endsAtElement);

        // Make the entire card clickable
        listingItem.addEventListener("click", () => {
            window.location.href = `/src/listing/specific.html?id=${id}`;
        });

        listingItem.style.cursor = "pointer";

        // Append the listing item to the container
        listingsContainer.appendChild(listingItem);
    });

    // Append the listingsContainer to the main section
    const mainSection = document.querySelector('main');
    mainSection.appendChild(listingsContainer);
}
