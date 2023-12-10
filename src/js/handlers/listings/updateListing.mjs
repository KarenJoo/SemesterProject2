import { updateListing } from "../../listings/update.mjs"; 
import { getTimeDifference, formatTimeDifference } from "../storage/getTimeDiff.mjs";
import { load } from "../storage/index.mjs";

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