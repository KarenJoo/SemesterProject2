import { API_BASE_URL } from "../API.mjs";

const action = "/auction/auth/register";
const method = "post";

export async function register(profile) {
    const registerURL = API_BASE_URL + action;
    const body = JSON.stringify(profile);
   
const response = await fetch(registerURL, {
        headers: {
            "Content-Type": "application/json"
        },
        method,
        body
    })

    const result = await response.json()
    alert("You are now registered")
    return result
}