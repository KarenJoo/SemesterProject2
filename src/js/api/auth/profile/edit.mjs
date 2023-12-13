import * as storage from "../../../handlers/storage/index.mjs";
import { authFetch } from "../../../listings/authFetch.mjs";
import { API_BASE_URL } from "../../API.mjs";
import { editProfileListener } from "../../../handlers/profile/editProfileListener.mjs";

document.addEventListener("DOMContentLoaded", () => {
  editProfileListener();
});

const action = "/auction/profiles";
const method = "PUT";

export async function editProfile(listingData) {
  console.log(listingData);
  if (!listingData.name) {
    throw new Error("updating avatar requires an name");
  }

  const avatarURL = `${API_BASE_URL}${action}/${listingData.name}/media`;

  try {
 
    const response = await authFetch(avatarURL, {
      method: method,
      body: JSON.stringify(listingData),
    });

    if (response.ok) {
      window.location.href = "/src/profile/index.html";
    } else {
      alert("Failed to update avatar");
    }

    return await response.json();
  } catch (error) {
    alert("Failed to update avatar");
    console.error(error);
  }
}
