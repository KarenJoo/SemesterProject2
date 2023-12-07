import { load } from "../storage/index.mjs";
import { editProfile } from "../../api/auth/profile/edit.mjs";
import { getSellerProfile } from "../../api/auth/profile/fetchProfiles.mjs";

export async function editProfileListener() {
const form = document.querySelector("#editProfile");

if (form) {
    const { name, email } = load("profile");
    form.name.value = name;
    form.email.value = email;

    const button = form.querySelector("button");
    button.disabled = true;

    const profile = await getSellerProfile(name);
    form.avatar.value = profile.avatar;

    button.disabled = false;
    
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const profile = Object.fromEntries(formData.entries());

        try {
            await editProfile(profile.name, profile);
          
        } catch (error) {
            console.error("Error updating profile:", error.message);
        }
    })
}
}