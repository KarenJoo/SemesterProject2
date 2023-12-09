
//register page
import { setRegisterFormListener } from "./handlers/register.mjs";
import { setLoginFormListener } from "./handlers/login.mjs";
import { createListing } from "./listings/index.mjs";
import { createListingListener } from "./handlers/listings/createListing.mjs"
import { updateListingListener } from "./handlers/listings/updateListing.mjs";
import { removeListingListener } from "./handlers/listings/removeListing.mjs";
import { remove } from "./handlers/storage/index.mjs";
import { editProfileListener } from "./handlers/profile/editProfileListener.mjs";
 

function router() {
const pathname = location.pathname;

switch(pathname) {
    case "/":
    console.log("this is the homepage");
    break;
    case "/profile/register/index.html":
    console.log("this is the register page");
    setRegisterFormListener();
    break;
    case "/profile/login/index.html":
    console.log("this is the login page");
    setLoginFormListener();
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
    case "/profile/edit/index.html":
    console.log("this is the edit profile page");
    editProfileListener();
    break;
    case "/listing/specific.html":
    console.log("this is the specific listing page");
    break; 
    case "/profile/index.html":
    console.log("this is the profile page");
    break;
}
} 

router(); 

// if (pathname === "/" || pathname === "/index.html") {
//     console.log("This is the index page")
// } else if ( pathname === '') {
//     setRegisterFormListener()
// } else if (pathname === '/profile/login/index.html') {
//     setLoginFormListener()
// } else if (pathname === '/profile/listing/create/index.html') {
//     createListingListener()
// } else if (pathname === '/profile/listing/update/index.html') {
//     updateListingListener()
// } else if (pathname === '/profile/listing/remove/remove.html') {
//     removeListingListener()
// } else if (pathname === '/profile/edit/index.html') {
//     editProfileListener()
// }
