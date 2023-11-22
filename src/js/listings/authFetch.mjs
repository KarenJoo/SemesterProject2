import { load } from "../handlers/storage/index.mjs";


export async function headers() {
    const token = load("token");
  
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
        };
  }
  

  export async function authFetch(url, options = {}) {
    return fetch(url, {
        ...options,
        headers: await headers(),
      });
  
  }