import { createListing } from "../../listings/create.mjs";
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.10.7';

export function createListingListener() {

    const form = document.getElementById("createListing");
    console.log("Form element:", form)

    if (form) {
        form.addEventListener("submit", async (event) => {
            console.log("Form submitted");
            event.preventDefault();

            const formData = new FormData(event.target);

            // Get user-friendly input for endsAt
            const userFriendlyEndsAt = formData.get("endsAt");

            // Convert user-friendly input to a valid date and time
            const endsAt = convertUserFriendlyToISO(userFriendlyEndsAt);



            const listingData = {
                title: formData.get("title"),
                body: formData.get("body"),
                media: formData.get("media").split(",").map(url => url.trim()),
                tags: [formData.get("tags").split(",").map(tag => tag.trim())],
                endsAt: endsAt,
            };
            try {
                const response = await createListing(listingData);
                console.log(listingData)
                console.log("Listing created successfully:", response);

                // Redirect or perform any other actions
                alert("Your listing is created");
                // window.location.href = "/index.html";
            } catch (error) {
                console.error("Error creating listing:", error.message);
                if (error.response) {
                    console.error("Response data:", await error.response.json());
                }
            }
        });
    }
}

