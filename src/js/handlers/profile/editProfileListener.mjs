import * as storage from "../storage/index.mjs";
import { editProfile } from "../../api/auth/profile/edit.mjs";
import { getSellerProfile } from "../../api/auth/profile/fetchProfiles.mjs";

export async function editProfileListener() {
    const form = document.querySelector("#editProfile");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      if (form) {
        const { name, email } = load("profile");
        form.name.value = name;
        form.email.value = email;
  
        const button = form.querySelector("button");
        button.disabled = true;
  
        const profile = await getSellerProfile(name);
        form.avatar.value = profile.avatar;
  
        button.disabled = false;
  
        try {
          // Move the try block inside the if statement
          const formData = new FormData(form);
          const profileData = Object.fromEntries(formData.entries());
  
          await editProfile(name, profileData);
  
          console.log("Profile updated successfully");
        } catch (error) {
          console.error("Error updating profile:", error.message);
        }
      }
    });
  }
  