import { getSellerProfile } from "../profile/fetchProfiles.mjs";
import { profileTemplate } from "../../../templates/profileTemp.mjs";
import { renderSellerProfile } from "../profile/profileSetup.mjs";

/**
 * Event listener for the "DOMContentLoaded" event, fetches and renders an individual seller's profile
 * based on the seller's name provided in the URL parameters.
 *
 * @returns {Promise<void>} A Promise that resolves when the seller's profile is fetched and rendered.
 *
 * @throws {Error} If there is an error fetching or rendering the seller's profile.
 */
document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const sellerName = params.get("name");

    if (sellerName) {
        // Fetch and render the individual seller's profile
        const profile = await getSellerProfile(sellerName);
        renderSellerProfile(profile);
    } else {
        console.error("No seller name provided in the URL.");
    }
});