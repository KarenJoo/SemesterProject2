import { removeListing } from "../../listings/remove.mjs";

export function removeListingListener() {
    const removeListingBtn = document.querySelector("#removeListingBtn");
  
    const url = new URL(location.href);
    const id = url.searchParams.get("id");
  
    if (removeListingBtn) {
      removeListingBtn.addEventListener("click", async (event) => {
    event.preventDefault(); 

        try {
          await removeListing(id);

        } catch (error) {
          console.error("Error removing Listing:", error.message);
          if (error.response) {
            console.error("Response data:", await error.response.json());
          }
        }
      });
    }
  }