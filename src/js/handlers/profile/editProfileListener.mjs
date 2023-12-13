import * as storage from "../storage/index.mjs";
import { editProfile } from "../../api/auth/profile/edit.mjs";
import { getSellerProfile } from "../../api/auth/profile/fetchProfiles.mjs";

export async function editProfileListener() {
  const form = document.querySelector("#editProfile");
  console.log("Form element:", form);


  if (form) {
    try {  
    const { name, email } = storage.load("profile");

      form.name.value = name;
      form.email.value = email; 
      
      const button = form.querySelector("button");
      const profile = await getSellerProfile(name);

      form.avatar.value = profile.avatar;

      console.log("Profile data loaded successfully");

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const profile = Object.fromEntries(formData.entries());

        profile.name = name;
        profile.email = email;

        editProfile(profile);

        console.log("Profile avatar updated successfully");
      });
    } catch (error) {
      console.error("Error loading profile data:", error.message);
    }
  }
}