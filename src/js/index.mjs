import * as auth from "./api/auth/index.mjs";
import * as API from "./api/API.mjs";
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
import * as profile from "./api/auth/profile/index.mjs";
import * as bids from "../js/api/auth/bids/index.mjs";
import * as profiles from "../js/api/auth/profiles/index.mjs";
import * as handlers from "./handlers/index.mjs";
import * as storageIndex from "./handlers/index.mjs";
import { authFetch } from "./listings/authFetch.mjs";
import * as listingPages from "./pages/index.mjs";
import * as templates from "./templates/index.mjs";

 
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