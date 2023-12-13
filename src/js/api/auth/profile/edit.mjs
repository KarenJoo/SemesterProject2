import * as storage from "../../../handlers/storage/index.mjs";
import { authFetch } from "../../../listings/authFetch.mjs";
import { API_BASE_URL } from "../../API.mjs";
import { editProfileListener } from "../../../handlers/profile/editProfileListener.mjs";

document.addEventListener("DOMContentLoaded", () => {
  editProfileListener();
});

const action = "/auction/listings/";
const method = "PUT";

export async function editProfile(name, listingData) {
  if (!name) {
    throw new Error("updating avatar requires an name");
  }

  const avatarURL = `${API_BASE_URL}${action}/${name}/media`;

  try {
    const token = storage.load("token");
 

    const response = await authFetch(avatarURL, {
      method: method,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ avatar: listingData.avatar }),
    });

    if (response.ok) {
      window.location.reload();
    } else {
      alert("Failed to update avatar");
    }
  } catch (error) {
    alert("Failed to update avatar");
    console.error(error);
  }
}

