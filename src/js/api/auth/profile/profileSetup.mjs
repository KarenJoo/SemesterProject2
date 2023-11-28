import * as storage from "/src/js/handlers/storage/index.mjs";
import { load } from "../../../handlers/storage/index.mjs";
import { API_BASE_URL } from "../../API.mjs";
import { profileTemplate } from "../../../templates/profileTemp.mjs";
import { renderProfileListings } from "../../../templates/profileListingsTemp.mjs";
import { authFetch } from "../../../listings/authFetch.mjs";
import { login } from "../login.mjs";

document.addEventListener("DOMContentLoaded", () => {
    profileSetUp();
  });

  // prevents several executions and the profileSetup to duplicate data
  let executeOnce = false;

  export async function profileSetUp() {
    try {
         // Check if profileSetUp has already been executed
         if (executeOnce) {
            return;
        }
           // true === indicates that profileSetUp has been executed
           executeOnce = true;

           const user = storage.load("user");

        // Check if the user exists and has a name property
        if (user && user.name) {
            const { name } = user;

            // Fetch user profile data
            const profile = await fetchProfileData(name);


            renderProfile(profile);

            // get users listings
            await getProfileListings(name);
        } else {
            console.error("User object is null or missing 'name' property.");
        }
    } catch (error) {
        console.error("Error setting up profile:", error);
    }
}

async function fetchProfileData(name) {
    const API_PROFILE_URL = `${API_BASE_URL}/auction/profiles/${name}`;
    const profileResponse = await authFetch(API_PROFILE_URL);

    if (!profileResponse.ok) {
        throw new Error(`Failed to fetch profile data. Status: ${profileResponse.status}`);
    }

    return await profileResponse.json();
}

function renderProfile(profile) {
    const { name, avatar, email, credits, _count } = profile;
    const { listings } = _count;
    profileTemplate(name, avatar, email, credits, listings);
}

async function getProfileListings(name) {
    try {
        const profileListingsResponse = await authFetch(`${API_BASE_URL}/auction/profiles/${name}/listings`);
        const listingsData = await profileListingsResponse.json();
        
        renderProfileListings(listingsData);
    } catch (error) {
        console.error('Error fetching and rendering listings:', error);
    }
}