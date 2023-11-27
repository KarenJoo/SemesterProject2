import * as storage from "/src/js/handlers/storage/index.mjs";
import { load } from "../../../handlers/storage/index.mjs";
import { API_BASE_URL } from "../../API.mjs";
import { profileTemplate } from "../../../templates/profileTemp.mjs";
import { authFetch } from "../../../listings/authFetch.mjs";
import { login } from "../login.mjs";

document.addEventListener("DOMContentLoaded", () => {
    profileSetUp();
  });


  export async function profileSetUp() {
    try {
        // Get user information from storage
        const user = storage.load("user");

        // Log user information for debugging
        console.log("User object:", user);

        // Check if the user object exists and has a name property
        if (user && user.name) {
            const { name } = user;

            // Log the name for debugging
            console.log("User name:", name);

            // Fetch user profile data
            const profile = await fetchProfileData(name);

            // Log the profile data for debugging
            console.log("Fetched profile data:", profile);

            // Render the profile using the template
            renderProfile(profile);
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