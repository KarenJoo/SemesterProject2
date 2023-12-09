import * as auth from "./api/auth/index.mjs";
import * as API from "./api/API.mjs";
import { setRegisterFormListener } from "./handlers/register.mjs";
import { setLoginFormListener } from "./handlers/login.mjs";
import { createListing } from "./listings/index.mjs";
import { createListingListener } from "./handlers/listings/createListing.mjs"
import { updateListingListener } from "./handlers/listings/updateListing.mjs";
import { removeListingListener } from "./handlers/listings/removeListing.mjs";
import { remove } from "./handlers/storage/index.mjs";

import { authFetch } from "./listings/authFetch.mjs";
import { editProfileListener } from "./handlers/profile/editProfileListener.mjs";
 
const pathname = location.pathname;
 
if (pathname === "/" || pathname === "/index.html") {
    console.log("This is the index page")
} else if ( pathname === '/profile/register/index.html') {
    setRegisterFormListener()
} else if (pathname === '/profile/login/index.html') {
    setLoginFormListener()
} else if (pathname === '/profile/listing/create/index.html') {
    createListingListener()
} else if (pathname === '/profile/listing/update/index.html') {
    updateListingListener()
} else if (pathname === '/profile/listing/remove/remove.html') {
    removeListingListener()
} else if (pathname === '/profile/edit/index.html') {
    editProfileListener()
}