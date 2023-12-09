
import * as profileSetUp from "./profileSetup.mjs";
import { loginProfile } from "./profileLogin.mjs";
import { profileListings } from "./profileListings.mjs";
import { renderSpecificCard } from "../../../templates/specificPageTemp.mjs";
import { getSellerProfile } from "./fetchProfiles.mjs";
import { editProfileListener } from "../../../handlers/profile/editProfileListener.mjs";
import { editProfile } from "./edit.mjs";


document.addEventListener("DOMContentLoaded", () => {
    const updateProfilePage = window.location.pathname;

    if (updateProfilePage.includes("/profile/edit/index.html")) {
        editProfile();
    }
});

export {profileSetUp, loginProfile, profileListings, renderSpecificCard, getSellerProfile, editProfileListener, editProfile}

