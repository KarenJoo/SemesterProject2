import { createListing } from "../../listings/create.mjs";


export function createListingListener() {
    const form = document.getElementById("createListing");
    console.log("Form element:", form)

    if (form) {
        form.addEventListener("submit", async (event) => {
            console.log("Form submitted");
            event.preventDefault();

            const formData = new FormData(event.target);
            const listingData = {
                title: formData.get("title"),
                body: formData.get("body"),
                media: formData.get("media").split(",").map(url => url.trim()),
                tags: formData.get("tags").split(",").map(tag => tag.trim()),
            };

            try {
                const response = await createListing(listingData);
                console.log("Listing created successfully:", response);

                // Redirect or perform any other actions
                window.location.href = "/feed";
            } catch (error) {
                console.error("Error creating listing:", error.message);
                if (error.response) {
                    console.error("Response data:", await error.response.json());
                }
            }
        });
    }
}
