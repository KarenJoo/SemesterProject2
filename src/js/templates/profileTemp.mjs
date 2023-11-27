import { profileSetUp } from "../api/auth/profile/profileSetup.mjs";

export function profileTemplate(name, avatar, email, credits, listings) {
    const profileContainer = document.createElement("div");
    profileContainer.classList.add("container-fluid", "mb-1", "col-12", "mb-5");
  
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
  
    followers.appendChild(userCredits);
  
    profileInfo.appendChild(profileImage);
    profileInfo.appendChild(userName);
    profileInfo.appendChild(followers);
  
    profileContainer.appendChild(profileInfo);
  
    // Append the profileContainer to the body or any other desired element
    document.body.appendChild(profileContainer);
  
    console.log(profileContainer);
  }
  