import { API_BASE_URL } from "../../API.mjs";
import { authFetch } from "../../../listings/authFetch.mjs";

const action = "/auction/profiles";

/**
 * Gets a list of seller profiles.
 *
 * @returns {Promise<Array<Object>>} - A Promise that resolves with an array of seller profiles.
 *
 * @example
 * const sellerProfiles = await getSellerProfiles();
 */
export async function getSellerProfiles() {
    const editProfileURL = `${API_BASE_URL}${action}`;

    const response = await authFetch(editProfileURL);
    return await response.json(); 
}

/**
 * Gets a specific seller profile by name.
 *
 * @param {string} name - The name of the seller profile to retrieve.
 * @returns {Promise<Object>} - A Promise that resolves with the seller profile data.
 * @throws {Error} - Throws an error if the profile name is not provided.
 *
 * @example
 * const sellerName = "user_name";
 * const sellerProfile = await getSellerProfile(sellerName);
 */
export async function getSellerProfile(name) {
    if (!name) {
        throw new Error("Get requires a profile name");
    }

    const getSellerProfile_URL = `${API_BASE_URL}${action}/${name}`;
    
    const response = await authFetch(getSellerProfile_URL);
    return await response.json();
}