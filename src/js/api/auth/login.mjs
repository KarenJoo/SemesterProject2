import { API_BASE_URL } from "../API.mjs";

const action = "/auction/auth/login";
const method = "post";

export async function login(profile) {
    const loginURL = API_BASE_URL + action;
    const body = JSON.stringify(profile);
   
const response = await fetch(loginURL, {
        headers: {
            "Content-Type": "application/json"
        },
        method,
        body
    })

    const result = await response.json()
    console.log(result);
}