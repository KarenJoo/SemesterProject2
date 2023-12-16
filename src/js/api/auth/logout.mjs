import * as storage from "/src/js/handlers/storage/index.mjs";

/**
 * Sets up the logout functionality by attaching an event listener to the logout button.
 * Clears user-related data from storage and redirects to the login page upon logout.
 *
 * Event handler for the logout button click.
 *
 * @param {Event} event - The click event.
 */
export function setupLogout() {
  const logoutButton = document.getElementById("logoutButton");

  if (logoutButton) {
      logoutButton.addEventListener("click", (event) => {
          event.preventDefault();

          storage.clear();

          window.location.href = "/src/profile/login/index.html";
      });
  }
}
