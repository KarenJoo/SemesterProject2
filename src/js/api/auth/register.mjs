import { API_BASE_URL } from "../API.mjs";

const action = "/auction/auth/register";
const method = "post";

/**
 * Registers a new user profile.
 *
 * @param {Object} profile - User profile information.
 * @param {string} profile.name - The username of the user.
 * @param {string} profile.email - The email address of the user.
 * @param {string} profile.password - The password of the user.
 * @param {string} profile.avatar - The avatar URL of the user (optional).
 *
 * @returns {Promise<Object>} - A Promise that resolves to the registration result.
 *
 * @throws {Error} - Throws an error if the registration fails.
 *
 * @example
 * const profile = {
 *   name: "exampleUser",
 *   email: "user@example.com",
 *   password: "securePassword",
 *   avatar: "https://example.com/avatar.jpg",
 * };
 *
 * try {
 *   const registrationResult = await register(profile);
 *   console.log("Registration successful:", registrationResult);
 * } catch (error) {
 *   console.error("Registration failed:", error.message);
 * }
 */
export async function register(profile) {
    const registerURL = API_BASE_URL + action;
    const body = JSON.stringify(profile);
   
const response = await fetch(registerURL, {
        headers: {
            "Content-Type": "application/json"
        },
        method,
        body
    })

    const result = await response.json()
    alert("You are now registered")
    return result
}