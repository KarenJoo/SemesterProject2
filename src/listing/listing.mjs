import { setupLogout } from "../js/api/auth/logout.mjs";
import { singleCardTemplate } from "../js/pages/singleListing.mjs";
import { pathAuthorization } from "../js/api/auth/authCheck.mjs";

pathAuthorization();
singleCardTemplate();
setupLogout();