// import * as constants from "./api/API.mjs";
import { setRegisterFormListener } from "./handlers/register.mjs";
import { setLoginFormListener } from "./handlers/login.mjs";
import * as listings from "./listings/index.mjs";
import { createListing } from "./listings/index.mjs";
import { cardTemplate } from "./templates/cardTemp.mjs";
import { createListingListener } from "./handlers/listings/createListing.mjs";
import { getListing, getListings } from "./listings/index.mjs";
import { updateListingListener } from "./handlers/listings/updateListing.mjs";
import { removeListingListener } from "./handlers/listings/removeListing.mjs";
import { remove } from "./handlers/storage/index.mjs";


const path = location.pathname;

if (path === '/profile/register/index.html') {
    setRegisterFormListener()
} else if (path === '/profile/login/index.html') {
    setLoginFormListener()
} else if (path === '/profile/listing/create/index.html') {
    createListingListener()
} else if (path === '/profile/listing/update/index.html') {
    updateListingListener()
} else if (path === '/src/js/handlers/listings/removeListing.mjs') {
    removeListingListener()
} 