import { profileSetUp } from "../api/auth/profile/profileSetup.mjs";

// profileTemp.mjs
export function profileTemplate(name, avatar, email, credits, listings) {
    // Remove existing profile containers
    const existingContainers = document.querySelectorAll('.container-fluid.mb-1.col-12.mb-5');
    existingContainers.forEach(container => container.remove());

    // Create a new profile container
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
        "align-items-center"
    );

    const profileImage = document.createElement("img");
    profileImage.src = avatar;
    profileImage.alt = "Profile Image";
    profileImage.classList.add(
        "profile-image",
        "mb-2",
        "shadow",
        "rounded-circle",
        "object-fit-cover",
        "border",
        "border-2"
    );
    profileImage.width = "210";
    profileImage.height = "200";

    const userName = document.createElement("h1");
    userName.id = "userName";
    userName.classList.add("mb-3", "display-5", "text-green");
    userName.innerText = name;

    const followers = document.createElement("div");
    followers.classList.add("followers", "d-flex");

    const userCredits = document.createElement("p");
    userCredits.id = "userCredits";
    userCredits.classList.add("h6", "mb-2", "text-dark");
    userCredits.innerText = `Your Credits: ${credits}`;

    profileContainer.appendChild(profile);

    followers.appendChild(userCredits);

    profileInfo.appendChild(profileImage);
    profileInfo.appendChild(userName);
    profileInfo.appendChild(followers);

    profileContainer.appendChild(profileInfo);

    // Append the profileContainer to the main section
    const mainSection = document.querySelector('main');
    mainSection.appendChild(profileContainer);

    // Return the created profileElement
    return profileContainer;
}
