import { createListing } from "../../listings/create.mjs";
import { getTimeDifference, formatTimeDifference } from "../storage/getTimeDiff.mjs";

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
        window.location.href = "/src/index.html";

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
              
// validateMediaUrls function
function validateMediaUrls(media) {
    const mediaUrls = media.split(",").map(url => url.trim());
        
    return mediaUrls;
}

// Display Time Difference Function
function displayTimeDifference(endsAt) {
    const { days, hours, minutes } = getTimeDifference(endsAt);
    const formattedTimeDifference = formatTimeDifference(days, hours, minutes);
    
    // Display the formatted time difference to the user
    document.getElementById("endsAt").innerText = `Time left: ${formattedTimeDifference}`;
}