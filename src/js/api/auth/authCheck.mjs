import * as storage from "../../handlers/storage/index.mjs";
import { authFetch } from "../../listings/authFetch.mjs";
import { API_BASE_URL } from "../API.mjs";

export async function authCheck() {
    const profileIcon = document.getElementById('profileIcon');

    try {
        // Retrieve user object from storage and parse it
        const user = JSON.parse(storage.load('user'));

        if (user && user.name) {
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
                // if user is authenticated > display the profile icon
                profileIcon.style.display = 'block';

            } else {
                // if user is not authenticated > display the login link
                profileIcon.style.display = 'none';

                const loginLink = document.createElement('a');
                loginLink.classList.add('nav-link', 'text-primary');
                loginLink.href = '/src/profile/login/index.html';
                loginLink.innerText = 'Log in';

                profileIcon.innerHTML = ''; 
                profileIcon.appendChild(loginLink);
            }
        } else {
            // User is not logged in, display the login link
            profileIcon.innerHTML = ''; 

            const loginLink = document.createElement('a');
            loginLink.classList.add('nav-link', 'text-primary');
            loginLink.href = '/src/profile/login/index.html';
            loginLink.innerText = 'Log in';

            profileIcon.appendChild(loginLink);
        }
    } catch (error) {
        console.error("Error checking authentication:", error.message);
    }
}

export function pathAuthorization() {
    const path = window.location.pathname;
    const token = storage.load("token");

    if (path === "/src/listing/specific.html" && !token) {
        // Display error message modal for specific.html
        displayErrorMessage("You need to log in to bid. Click OK to log in.");
    } if (path === "/src/profiles/index.html" && !token) {
        displayErrorMessage("You need to log in to view profiles. Click OK to log in.");
    }
}

function isAuthPage() {
    return window.location.pathname === "/src/listing/specific.html";
    return window.location.pathname === "/src/profiles/index.html";
}

function displayErrorMessage(message) {
    console.log('Error Message:', message);

    // Show a simple confirmation dialog with the error message
    const userConfirmed = window.confirm(message);

    // If the user clicks OK, redirect to the login page
    if (userConfirmed) {
        window.location.replace("/src/profile/login/index.html");
    }
}