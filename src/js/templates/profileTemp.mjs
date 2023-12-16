import { profileSetUp } from "../api/auth/profile/profileSetup.mjs";

/**
 * Generates a profile template with user information.
 * @param {string} name - The user's name.
 * @param {string} avatar - The URL of the user's avatar image.
 * @param {string} email - The user's email address.
 * @param {number} credits - The number of credits associated with the user.
 * @param {Object[]} listings - Array of user's listings data.
 * @param {string} listings[].title - The title of the listing.
 * @param {string} listings[].endsAt - The end date and time of the listing.
 * @param {string[]} listings[].media - Array of media URLs associated with the listing.
 * @returns {HTMLElement} The generated profile container element.
 */
export function profileTemplate(name, avatar, email, credits, listings) {
    const existingContainers = document.querySelectorAll('.container-fluid.mb-1.col-12.mb-5');
    existingContainers.forEach(container => container.remove());

    
    const profileContainer = document.createElement("div");
    profileContainer.classList.add("container-fluid", "mb-1", "col-12", "mb-5");

    const profile = document.createElement("div");
    profile.classList.add("mx-1", "mb-3", "mt-3", "d-flex", "flex-column");

    const profileInfo = document.createElement("div");
    profileInfo.classList.add(
        "mx-1",
        "mb-3",
        "mt-3",
        "d-flex",
        "flex-column",
        "justify-content-center",
        "align-items-center",
        
    );

    const profileImage = document.createElement("img");
    profileImage.src = avatar;
    profileImage.alt = "Profile Image";
    profileImage.classList.add(
        "profile-image",
        "mb-2",
        "mt-5",
        "shadow",
        "rounded-circle",
        "object-fit-cover",
        "border",
        "border-2"
    );
    profileImage.width = "210";
    profileImage.height = "200";

     // Placeholder if avatar can not display successfully  
     profileImage.addEventListener("error", () => {
        profileImage.src = "/src/img/example_listing.jpg";
        profileImage.alt ="placeholder for profile avatar";
    });

    const userNameContainer = document.createElement("div");
    userNameContainer.classList.add("container-fluid", "mb-1", "col-12", "mb-5", "bg-light", "shadow");


    const userName = document.createElement("h1");
    userName.id = "userName";
    userName.classList.add("mb-3", "display-5", "text-primary");
    userName.innerText = name;

    const creditsContainer = document.createElement("div");
    creditsContainer.classList.add("creditsContainer", "d-flex");

    const userCredits = document.createElement("p");
    userCredits.id = "userCredits";
    userCredits.classList.add("h6", "mb-2", "text-primary");
    userCredits.innerText = `Credits: ${credits}`;

    profileContainer.appendChild(profile);
    profileContainer.appendChild(userNameContainer);

    creditsContainer.appendChild(userCredits);
    profileInfo.appendChild(profileImage);
    profileInfo.appendChild(userName);
    profileInfo.appendChild(creditsContainer);

    profileContainer.appendChild(profileInfo);

    // Append the profileContainer to the main section
    const mainSection = document.querySelector('main');
    mainSection.appendChild(profileContainer);

    
    return profileContainer;
}
