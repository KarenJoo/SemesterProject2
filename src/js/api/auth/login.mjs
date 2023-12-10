import { API_BASE_URL } from "../API.mjs";
import * as storage from "../../handlers/storage/index.mjs";

const action = "/auction/auth/login";
const method = "post";

export async function login(profile) {
    const loginURL = API_BASE_URL + action;
    const body = JSON.stringify(profile);
   
    try {
const response = await fetch(loginURL, {
        headers: {
            "Content-Type": "application/json"
        },
        method,
        body
    });

    if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
    }

    const { accessToken, ...user } = await response.json();

    storage.save("token", accessToken);
    storage.save("profile", user);
    storage.save("user", user);
    alert("You are now logged in");

    // Redirect to the profile page
    window.location.href = "/src/profile/index.html";   
     return user;

} catch (error) {
    console.error("Login Error:", error.message);
}
}

