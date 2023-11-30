import { getSellerProfile } from "../profile/fetchProfiles.mjs";
import { profileTemplate } from "../../../templates/profileTemp.mjs";
import { renderSellerProfile } from "../profile/profileSetup.mjs";

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