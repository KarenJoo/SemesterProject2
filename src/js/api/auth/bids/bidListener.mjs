import { placeBid} from "./bidAuth.mjs";
import { API_BASE_URL } from "../../API.mjs";
import { singleCardTemplate } from "../../../pages/singleListing.mjs";


export function bidListener(form) {
  const urlParams = new URLSearchParams(window.location.search)
  const listingId = urlParams.get('id')

   if (!form) {
    console.error("Bid form not found");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = event.target;
    const method = formData.method;
    const amount = JSON.parse(formData.bidAmount.value);
    const bid = {
      amount: amount,
    };
    console.log(bid)
    await placeBid(listingId, bid, method); 
  });


}
