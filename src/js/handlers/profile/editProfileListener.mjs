import * as storage from "../storage/index.mjs";
import { editProfile } from "../../api/auth/profile/edit.mjs";
import { getSellerProfile } from "../../api/auth/profile/fetchProfiles.mjs";

export async function editProfileListener() {
  const form = document.querySelector("#editProfile");
  console.log("Form element:", form);

  const url = new URL(location.href);
  const name = url.searchParams.get("name");

  if (form) {
    try {
      const { name, email } = storage.load("profile");
      form.name.value = name;
      form.email.value = email;

      const profile = await getSellerProfile(name);
      form.avatar.value = profile.avatar;

      // Enable the form submission button
      const button = form.querySelector("button");
      button.disabled = false;

      console.log("Profile data loaded successfully");
    } catch (error) {
      console.error("Error loading profile data:", error.message);
    }
  }
}