import { API_BASE_URL } from "../../API.mjs";
import * as storage from "../../../handlers/storage/index.mjs";
import { load } from "../../../handlers/storage/index.mjs";
import { authFetch } from "../../../listings/authFetch.mjs";
import { bidListener } from "./bidListener.mjs";


export async function placeBid(url, bid, method) {
  try {
    const token = storage.load("accessToken");
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bid),
    });
    if (response.ok) {
      window.location.reload();
    }
    if (!response.ok) {
      alert(
        "Error when placing bid"
      );
    }
  } catch (error) {
    console.log(error);
    alert(
      "Error when placing bid"
    );
  }
}