import { updateListing } from "../../listings/update.mjs"; 
import { getTimeDifference, formatTimeDifference } from "../storage/getTimeDiff.mjs";
import { load } from "../storage/index.mjs";

/**
 * Sets up a listener for updating a listing form, validating input, and handling the update process.
 *
 * @returns {void}
 *
 * @example
 * // Call the function to set up the update listing listener
 * updateListingListener();
 */
export function updateListingListener () {
    const form = document.getElementById("updateListing");
    console.log("Form element:", form);

    const url = new URL(location.href);
    const id = url.searchParams.get("id");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

                const formData = new FormData(event.target);
                // Convert input > endsAt
                const convertedEndsAt = formData.get("endsAt");
                // Convert endsAt input to a valid date and time
                const endsAt = new Date(convertedEndsAt);
                console.log('Converted endsAt:', endsAt);

                const listingData = {
                    title: formData.get("title"),
                    description: formData.get("description"),
                    media: validateMediaUrls(formData.get("media")),
                    tags: formData.get("tags").split(",").map(tag => tag.trim()),
                    endsAt: endsAt,
                };

                console.log(listingData);

                try {
                    const response = await updateListing(id, listingData);
                    console.log("Listing updated successfully:", response);
                    window.location.href = "/index.html";

            
                    // Check if the user is the author and redirect accordingly
                    const profile = load("profile");
                    const userName = profile?.name || "unknown name";
                    const { seller: author } = response;
                    const isAuthorAndUser = author && author.name === userName;
            
                    if (isAuthorAndUser) {
                      window.location.href = `/src/profile/listing/update/index.html?id=${id}`;
                    } else {
                      window.location.href = `/src/listing/specific.html?id=${response.id}`;
                    }
            
                  } catch (error) {
                    console.error("Error updating listing:", error.message);
                    if (error.response) {
                      console.error("Response data:", await error.response.json());
                    }
                  }
                });
              }
            }

            
/**
 * Validates media URLs by trimming and splitting the input string.
 *
 * @param {string} media - Comma-separated URLs to validate.
 * @returns {string[]} - Array of validated and trimmed media URLs.
 *
 * @example
 * // Call the function to validate media URLs
 * const validatedMedia = validateMediaUrls("url1, url2, url3");
 */
function validateMediaUrls(media) {
    const mediaUrls = media.split(",").map(url => url.trim());
        
    return mediaUrls;
}

/**
 * Displays the time difference between the current time and the specified end time.
 *
 * @param {Date} endsAt - The end time for the listing.
 * @returns {void}
 *
 * @example
 * // Call the function to display the time difference
 * displayTimeDifference(new Date("2023-01-01T12:00:00"));
 */
function displayTimeDifference(endsAt) {
    const { days, hours, minutes } = getTimeDifference(endsAt);
    const formattedTimeDifference = formatTimeDifference(days, hours, minutes);
    
    // Display the formatted time difference to the user
    document.getElementById("endsAt").innerText = `Time left: ${formattedTimeDifference}`;
}