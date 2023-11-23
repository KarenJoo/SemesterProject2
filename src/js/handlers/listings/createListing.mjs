import { createListing } from "../../listings/create.mjs";

export function createListingListener() {

    const form = document.getElementById("createListing");
    console.log("Form element:", form)

    if (form) {
        form.addEventListener("submit", async (event) => {
            console.log("Form submitted");
            event.preventDefault();

            const formData = new FormData(event.target);

            // Convert input > endsAt
            const convertedEndsAt = formData.get("endsAt");

            // Convert endsAt input to a valid date and time
            const endsAt = convertEndsAt(convertedEndsAt);



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


function convertEndsAt(userFriendlyInput) {
    // convert input using the datetime-local format
    return userFriendlyInput;
}

function parseUserFriendlyDuration(userFriendlyInput) {
    // return milliseconds, example: "00 days, 00h 00m"
    return 0;
}

