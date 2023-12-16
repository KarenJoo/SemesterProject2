import { register } from "../api/auth/register.mjs";

/**
 * Sets up a form listener for the registration form.
 * When the form is submitted, it prevents the default form submission,
 * retrieves form data, and sends it to the registration API for user registration.
 *
 * @example
 * // Set up the registration form listener
 * setRegisterFormListener();
 */
export function setRegisterFormListener() {
const form = document.querySelector("#regForm");

if (form) {
form.addEventListener("submit", (event) => {
event.preventDefault()
const form = event.target;
const formData = new FormData(form);
const profile = Object.fromEntries(formData.entries());

register(profile);
})  
}   
}


