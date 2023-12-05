import { placeBid, getToken } from "./bidAuth.mjs";

export function bidListener() {
  const form = document.querySelector("#bid-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = event.target;
    const bidURL = formData.getAttribute("action");
    const method = formData.getAttribute("method");
    const amount = JSON.parse(formData.bid.value);
    const bid = {
      amount: amount,
    };
    await bidAuth(bidURL, bid, method);
  });
}
