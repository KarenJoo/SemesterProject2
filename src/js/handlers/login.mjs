import { login } from "../api/auth/login.mjs";

/**
 * Sets up a form listener for the login form.
 * When the form is submitted, it prevents the default form submission,
 * retrieves form data, and sends it to the login API for authentication.
 *
 * @example
 * // Set up the login form listener
 * setLoginFormListener();
 */
export function setLoginFormListener() {
const form = document.querySelector("#loginForm");

if (form) {
form.addEventListener("submit", (event) => {
event.preventDefault()
const form = event.target;
const formData = new FormData(form);
const profile = Object.fromEntries(formData.entries());

login(profile);
})  
}   
}


