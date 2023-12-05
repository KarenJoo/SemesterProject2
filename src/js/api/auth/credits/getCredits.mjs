import * as storage from "/src/js/handlers/storage/index.mjs";

export async function getCredits(url) {
    try {
      const token = storage.load("accessToken");
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }