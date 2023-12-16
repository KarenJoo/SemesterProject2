import { removeListing } from "../../listings/remove.mjs";

/**
 * Sets up a listener for the remove listing button to trigger the removal of a listing.
 *
 * @returns {void}
 *
 * @example
 * // Call the function to set up the remove listing listener
 * removeListingListener();
 */
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