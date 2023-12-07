import { API_BASE_URL } from "../api/API.mjs";
import { authFetch } from "../listings/authFetch.mjs";
import { editProfileListener } from "../../../handlers/profile/editProfileListener.mjs";


  const action = "/auction/profiles/{name}/media";
  const method = "PUT"; 

export async function editProfile(profileData) {
        if (!profileData.name) {
          throw new Error("edit profile requires a name");
        }
      
        const editProfileURL = `${API_BASE_URL}${action}/${profileData.name}`;
      
        try {
          const response = await authFetch(editProfileURL, {
            method,
            body: JSON.stringify(profileData),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          return await response.json();
        } catch (error) {
          console.error("Error updating profile", error.message);
          throw error;
        }
      }
