import { placeBid} from "./bidAuth.mjs";
import { API_BASE_URL } from "../../API.mjs";

export function bidListener(url) {
  const form = document.querySelector("#bid-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const method = "POST";
    const amount = formData.get("amount");
    const bid = {
      amount: parseFloat(amount),
    };
    await placeBid(url, bid, method);
  });
}
