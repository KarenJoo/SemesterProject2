import * as storage from "../../handlers/storage/index.mjs";
import { authFetch } from "../../listings/authFetch.mjs";
import { API_BASE_URL } from "../API.mjs";

/**
 * Checks the authentication status of the user and updates the profile icon visibility accordingly.
 * If the user is not logged in, displays a login link; otherwise, displays the profile icon.
 *
 * @returns {Promise<void>} A Promise that resolves when the authentication check is complete.
 *
 * @throws {Error} If there is an error during the authentication check.
 */
export async function authCheck() {
    const profileIcon = document.getElementById('profileIcon');

    try {
        // Retrieve user object from storage and parse it
        const user = JSON.parse(storage.load('user'));

        if (!user || !user.name) {
            // User is not logged in, display the login link
            profileIcon.innerHTML = '';

            const loginLink = document.createElement('a');
            loginLink.classList.add('nav-link', 'text-primary');
            loginLink.href = '/src/profile/login/index.html';
            loginLink.innerText = 'Log in';

            profileIcon.appendChild(loginLink);


            // Hide the authorized links
            const authorizedLinks = document.querySelectorAll('.authorized-link');

            authorizedLinks.forEach(link => {
                link.style.display = 'none';
            });
        } else {
            const username = user.name;

            // Check if the user is authenticated 
            const token = storage.load('token');
            const API_PROFILE_URL = `${API_BASE_URL}/auction/profiles/${username}`;
            const response = await authFetch(API_PROFILE_URL, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Response:', response);

            if (response.ok) {
                // If the user is authenticated > display the profile icon
                profileIcon.style.display = 'block';
            }
        }
    } catch (error) {
        console.error("Error checking authentication:", error.message);
    }
}

/**
 * Checks the current path and user authentication status to handle authorization logic.
 * If the path is "/src/listing/specific.html" and the user is not authenticated, displays an error message.
 */
export function pathAuthorization() {
    const path = window.location.pathname;
    const token = storage.load("token");

    if (path === "/src/listing/specific.html" && !token) {
        // Display error message modal for specific.html or profiles/index.html
        console.log("Error: ", getErrorMessage(path));
        displayErrorMessage(getErrorMessage(path));
    }
}

/**
 * Checks if the current page is an authentication-related page.
 *
 * @returns {boolean} True if the current page is an authentication-related page, otherwise false.
 */
function isAuthPage() {
    const path = window.location.pathname;
    return path === "/src/listing/specific.html";
}


/**
 * Displays an error message modal based on the provided path.
 * If the user confirms, redirects to the login page.
 *
 * @param {string} path - The current path.
 */
function displayErrorMessage(message) {
    console.log('Error Message:', message);

    
    const userConfirmed = window.confirm(message);

    // If the user clicks OK > redirect to the login page
    if (userConfirmed) {
        window.location.replace("/src/profile/login/index.html");
    }
}


/**
 * Returns an error message based on the provided path.
 *
 * @param {string} path - The current path.
 * @returns {string} The error message corresponding to the provided path.
 */
// display separate path error messages using switch
function getErrorMessage(path) {
    switch (path) {
        case "/src/listing/specific.html":
            return "You need to log in to bid. Click OK to log in.";
    }
}