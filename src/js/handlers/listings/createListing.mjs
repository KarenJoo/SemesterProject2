import { createListing } from "../../listings/create.mjs";
import { getTimeDifference, formatTimeDifference } from "../storage/getTimeDiff.mjs";

/**
 * Sets up a listener for the create listing form submission.
 *
 * @returns {void}
 *
 * @example
 * // Call the function to set up the listener
 * createListingListener();
 */
export function createListingListener() {
  const form = document.getElementById("createListing");
  const submitButton = form.querySelector('#submit');
  console.log("Form element:", form);

  document.addEventListener("DOMContentLoaded", function() {
  if (form) {
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Disable the submit button to prevent multiple submissions
      submitButton.setAttribute("disabled", "true");

      try {
        console.log("form submitted");
        const formData = new FormData(event.target);
        const convertedEndsAt = formData.get("endsAt");
        const endsAt = new Date(convertedEndsAt);

  

        const listingData = {
          title: formData.get("title"),
          description: formData.get("description"),
          media: validateMediaUrls(formData.get("media")),
          tags: formData.get("tags").split(",").map(tag => tag.trim()),
          endsAt: endsAt,
        };

        console.log("listing data:", listingData);

        const response = await createListing(listingData);
        console.log("Listing created successfully:", response);
        window.location.href = "/index.html";

      } catch (error) {
        console.error("Error creating listing:", error.message);
        if (error.response) {
          console.error("Response data:", await error.response.json());
        }

      } finally {
        // Enable the submit button after the request is completed
        submitButton.removeAttribute("disabled");
      }
    });
  }
}
)};


/**
 * Validates media URLs by splitting and trimming them.
 *
 * @param {string} media - Comma-separated list of media URLs.
 * @returns {string[]} - Array of validated media URLs.
 *
 * @example
 * const validatedMedia = validateMediaUrls("https://example.com/image.jpg, https://example.com/video.mp4");
 * console.log("Validated media URLs:", validatedMedia);
 */              
function validateMediaUrls(media) {
    const mediaUrls = media.split(",").map(url => url.trim());
        
    return mediaUrls;
}

/**
 * Displays the time difference between the current date and the provided end date.
 *
 * @param {Date} endsAt - The end date of the listing.
 * @returns {void}
 *
 * @example
 * // Assume 'endsAt' is a valid Date object
 * displayTimeDifference(endsAt);
 */
function displayTimeDifference(endsAt) {
    const { days, hours, minutes } = getTimeDifference(endsAt);
    const formattedTimeDifference = formatTimeDifference(days, hours, minutes);
    
    // Display the formatted time difference to the user
    document.getElementById("endsAt").innerText = `Time left: ${formattedTimeDifference}`;
}