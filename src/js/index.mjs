
//register page
import { setRegisterFormListener } from "./handlers/register.mjs";
//login page
import { setLoginFormListener } from "./handlers/login.mjs";

// feed all listings 
import { allCardsTemplate } from "./pages/allListings.mjs";

// single listing bids
import { singleCardTemplate } from "./pages/singleListing.mjs";
import { renderSpecificCard } from "./templates/specificPageTemp.mjs";

// profile page
import { profileSetUp } from "./api/auth/profile/profileSetup.mjs";

// edit profile
import { editProfileListener } from "./handlers/profile/editProfileListener.mjs";
// create listing
import { createListingListener } from "./handlers/listings/createListing.mjs"
// update listing
import { updateListingListener } from "./handlers/listings/updateListing.mjs";
// remove listing
import { removeListingListener } from "./handlers/listings/removeListing.mjs";
 

function router() {
const pathname = location.pathname;

switch(pathname) {
    case "/":
    console.log("this is the homepage");
    allCardsTemplate();
    break;
    case "/profile/register/index.html":
    console.log("this is the register page");
    setRegisterFormListener();
    break;
    case "/profile/login/index.html":
    console.log("this is the login page");
    setLoginFormListener();
    break;
    case "/listing/specific.html":
    console.log("this is the specific listing page");
    singleCardTemplate();
    renderSpecificCard();
    break; 
    case "/profile/index.html":
    console.log("this is the profile page");
    profileSetUp();
    break; 
    case "/profile/edit/index.html":
    console.log("this is the edit profile page");
    editProfileListener();
    break;
    case "/profile/listing/create/index.html":
    console.log("this is the create listing page");
    createListingListener();
    break;
    case "/profile/listing/update/index.html":
    console.log("this is the update listing page");
    updateListingListener();
    break;
    case "/profile/listing/remove/remove.html":
    console.log("this is the remove listing page");
    removeListingListener();
    break;
    
}
} 

router(); 

