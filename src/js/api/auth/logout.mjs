import * as storage from "/src/js/handlers/storage/index.mjs";

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
