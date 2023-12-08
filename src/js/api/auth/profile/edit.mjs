import * as storage from "/src/js/handlers/storage/index.mjs";
import { editProfileListener } from "../../../handlers/profile/editProfileListener.mjs";
import { authFetch } from "../../../listings/authFetch.mjs";


  const action = "/auction/profiles/{name}/media";
  const method = "PUT"; 

  export async function editProfile(url, body, method) {
    try {
      const token = storage.load("accessToken");
      const response = await authFetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        window.location.reload();
      }
      if (!response.ok) {
        alert(
          "Failed to update avatar"
        );
      }
    } catch (error) {
      alert(
        "Failed to update avatar"
      );
      console.log(error);
    }
  }