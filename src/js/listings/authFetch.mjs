import { load } from "../handlers/storage/index.mjs";


export async function headers() {
    const token = load("token");
  
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Origin": window.location.origin
    };
  }
  

  export async function authFetch(url, options = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: await headers(),
      });
  
      return response;
    } catch (error) {
      console.error("Error authenticated request:", error.message);
      throw error;
    }
  }