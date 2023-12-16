import * as storage from "/src/js/handlers/storage/index.mjs";
import { load } from "../../../handlers/storage/index.mjs";
import { API_BASE_URL } from "../../API.mjs";
import { profileTemplate } from "../../../templates/profileTemp.mjs";
import { renderProfileListings } from "../../../templates/profileListingsTemp.mjs";
import { authFetch } from "../../../listings/authFetch.mjs";
import { login } from "../login.mjs";
import { getSellerProfile } from "./fetchProfiles.mjs";


document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname;
    
    // Check if the current page is the profile page
    if (currentPage.includes("/src/profile/index.html")) {
        profileSetUp();
    }
});

let executeOnce = false;

/**
 * Sets up the user profile page by fetching and rendering user data and listings.
 *
 * @returns {Promise<void>} A Promise that resolves when profile setup is complete.
 *
 * @throws {Error} If there is an error fetching or rendering the profile data.
 */
export async function profileSetUp() {
    try {
        if (executeOnce) {
            return;
        }
        executeOnce = true;

        const user = storage.load("user");

        //if user == user.name redirect to own profile page, if else redirect to sellers profile page
        if (user && user.name) {
            const { name } = user;

            const params = new URLSearchParams(window.location.search);
            const sellerName = params.get("name");

            try {
                // Use the seller's name from the URL parameter if available
                const profile = await fetchProfileData(sellerName || name);
                renderProfile(profile);
                await getProfileListings(sellerName || name);
                
            } catch (error) {
                console.error('Error setting up profile:', error);
            }
        } else {
            console.error("User object is null or missing 'name' property.");
        }
    } catch (error) {
        console.error("Error in profileSetUp:", error);
    }
}

/**
 * Fetches profile data from the API.
 *
 * @param {string} name - The name of the profile to fetch.
 * @returns {Promise<Object>} A Promise that resolves with the fetched profile data.
 *
 * @throws {Error} If there is an error fetching the profile data.
 */
async function fetchProfileData(name) {
    try {
        const API_PROFILE_URL = `${API_BASE_URL}/auction/profiles/${name}`;
        const profileResponse = await authFetch(API_PROFILE_URL);

        if (!profileResponse.ok) {
            throw new Error(`Failed to fetch profile data. Status: ${profileResponse.status}`);
        }

        return await profileResponse.json();
    } catch (error) {
        console.error('Error fetching profile data:', error);
        throw error;
    }
}

/**
 * Renders the user profile on the page.
 *
 * @param {Object} profile - The user profile data to render.
 * @returns {void}
 */
function renderProfile(profile) {
    const { name, avatar, email, credits, _count } = profile;
    const { listings } = _count;
    const profileElement = profileTemplate(name, avatar, email, credits);

    profileElement.addEventListener("click", async () => {
        const isUserProfile = checkIfOwnProfile(name);

        if (isUserProfile) {
            // Redirect to user's own profile page
            window.location.href = `/src/profile/index.html?name=${name}`;
        } else {
            // Redirect to profiles page with the seller's name
            window.location.href = `/src/profiles/index.html?name=${name}`;
        }
    });

    // Add the profileElement to the main section
    const profilesContainer = document.getElementById("profilesContainer");
    profilesContainer.appendChild(profileElement);
}

/**
 * Fetches and renders the listings associated with a profile.
 *
 * @param {string} name - The name of the profile whose listings to fetch and render.
 * @returns {Promise<void>} A Promise that resolves when listings are fetched and rendered.
 *
 * @throws {Error} If there is an error fetching or rendering the listings.
 */
async function getProfileListings(name) {
    try {
        const profileListingsResponse = await authFetch(`${API_BASE_URL}/auction/profiles/${name}/listings`);
        const listingsData = await profileListingsResponse.json();
        
        renderProfileListings(listingsData);
    } catch (error) {
        console.error('Error fetching and rendering listings:', error);
    }
}

/**
 * Renders a seller's profile on the page with a label indicating it's a seller's profile.
 *
 * @param {Object} profile - The seller's profile data to render.
 * @returns {void}
 */
export function renderSellerProfile(profile) {
    const { name, avatar, email, credits } = profile;
    const profileElement = profileTemplate(name, avatar, email, credits);

    const sellerLabel = document.createElement("span");
    sellerLabel.innerText = "Seller's Profile";
    sellerLabel.classList.add("text-muted", "small");
    profileElement.appendChild(sellerLabel);

    const mainSection = document.getElementById("profilesContainer"); 
    mainSection.appendChild(profileElement);
}

/**
 * Checks if the current profile is the user's own profile based on the URL.
 *
 * @param {string} profileName - The name of the profile to check.
 * @returns {boolean} Returns true if it's not the user's own profile, otherwise false.
 */
export function checkIfOwnProfile(profileName) {
    const params = new URLSearchParams(window.location.search);
    const currentProfileName = params.get("name");
    
    // Checks if the current profile name in the URL is not the user's own profile
    return currentProfileName && currentProfileName.toLowerCase() !== profileName.toLowerCase();
}
