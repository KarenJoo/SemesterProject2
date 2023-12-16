import { allCardsTemplate } from "./js/pages/allListings.mjs";
import { setupLogout } from "./js/api/auth/logout.mjs";
import { authCheck } from "./js/api/auth/authCheck.mjs";

// Call the authCheck function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Call the authCheck function
    await authCheck();
});

allCardsTemplate();
setupLogout(); 

