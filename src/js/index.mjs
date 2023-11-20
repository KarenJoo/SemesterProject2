// import * as constants from "./api/API.mjs";
import { setRegisterFormListener } from "./handlers/register.mjs";
import { setLoginFormListener } from "./handlers/login.mjs";
import * as listings from "./listings/index.mjs";
import { getListing, getListings } from "./listings/index.mjs";
import { cardTemplate } from "./templates/cardTemp.mjs";


const path = location.pathname;

if (path === "/profile/register/index.html") {
    setRegisterFormListener()
} else if (path === "/profile/login/index.html") {
    setLoginFormListener()
}


listings.getListings().then(console.log);