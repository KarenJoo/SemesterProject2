import { pathAuthorization } from "../../js/api/auth/authCheck.mjs";
import { setupLogout } from "../../js/api/auth/logout.mjs";
import { editProfileListener } from "../../js/handlers/profile/editProfileListener.mjs";

pathAuthorization();
editProfileListener();
setupLogout();

