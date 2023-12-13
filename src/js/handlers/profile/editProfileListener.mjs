import * as storage from "../storage/index.mjs";
import { editProfile } from "../../api/auth/profile/edit.mjs";
import { getSellerProfile } from "../../api/auth/profile/fetchProfiles.mjs";

export async function editProfileListener() {
  const form = document.querySelector("#editProfile");
  console.log("Form element:", form);

  const url = new URL(location.href);
  const id= url.searchParams.get("id");

 

    if (form) { 
      form.addEventListener("submit", async (event) => {
    event.preventDefault();
      const { name, email } = storage.load("profile");
      form.name.value = name;
      form.email.value = email;

      const button = form.querySelector("button");
      button.disabled = true;

      const profile = await getSellerProfile(name);
      form.avatar.value = profile.avatar;

      button.disabled = false;

      try {
        const formData = new FormData(form);
        const listingData = Object.fromEntries(formData.entries());

        await editProfile(name, listingData, "PUT");

        console.log("Profile avatar updated successfully");
      } catch (error) {
        console.error("Error updating profile avatar:", error.message);
      }  
    });
}
    }

