import { placeBid} from "./bidAuth.mjs";
import { API_BASE_URL } from "../../API.mjs";


export function bidListener(listingId, bidURL) {
  const form = document.querySelector("#bid-form");

  if (!form) {
    console.error("Bid form not found");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = event.target;
    const method = formData.method;
    const amount = JSON.parse(formData.bid.value);
    const bid = {
      amount: amount,
    };
    
    await placeBid(listingId, bid, method, bidURL); 
  });
}
