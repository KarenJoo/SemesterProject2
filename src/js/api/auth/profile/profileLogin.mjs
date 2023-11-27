import { login } from "../login.mjs";
import { profileSetUp } from "./profileSetup.mjs";

export async function loginProfile() {
    const form = document.querySelector("#loginForm");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const profile = Object.fromEntries(formData.entries());

            try {
                // Log in and get the user data
                const user = await login(profile);

                // Proceed with profile setup using the returned user data
                await profileSetUp(user);
            } catch (error) {
                console.error("Login and Profile Setup Error:", error.message);
            }
        });
    }
}
