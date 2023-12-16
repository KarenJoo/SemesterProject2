import { placeBid} from "./bidAuth.mjs";
import { API_BASE_URL } from "../../API.mjs";
import { singleCardTemplate } from "../../../pages/singleListing.mjs";

/**
 * Adds a submit event listener to the bid form, preventing the default form submission
 * and triggering the bid placement process.
 *
 * @param {HTMLFormElement} form - The bid form element.
 * @returns {void}
 *
 * @example
 * const bidForm = document.getElementById("bid-form");
 * bidListener(bidForm);
 */
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
