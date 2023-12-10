import { API_BASE_URL } from "../../API.mjs";
import { authFetch } from "../../../listings/authFetch.mjs";

const action = "/auction/profiles";

export async function getSellerProfiles() {
    const editProfileURL = `${API_BASE_URL}${action}`;

    const response = await authFetch(editProfileURL);
    return await response.json(); 
}

export async function getSellerProfile(name) {
    if (!name) {
        throw new Error("Get requires a profile name");
    }

    const getSellerProfile_URL = `${API_BASE_URL}${action}/${name}`;
    
    const response = await authFetch(getSellerProfile_URL);
    return await response.json();
}