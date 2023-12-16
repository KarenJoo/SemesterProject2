import {cardTemplate} from "/src/js/templates/cardTemp.mjs"

/**
 * Renders listings for a user profile.
 *
 * @param {Array<Object>} profileData - An array of listing data for the user profile.
 * @param {string} profileData[].title - The title of the listing.
 * @param {string} profileData[].endsAt - The end date of the listing.
 * @param {Array<string>} profileData[].media - An array of media URLs associated with the listing.
 * @param {string} profileData[].id - The unique identifier of the listing.
 * @param {Object} profileData[]._count - Additional count data for the listing.
 * @param {number} profileData[]._count.bids - The number of bids on the listing.
 *
 * @example
 * const profileData = [
 *   {
 *     title: "Example Listing",
 *     endsAt: "2023-12-31",
 *     media: ["url1", "url2"],
 *     id: "123456",
 *     _count: {
 *       bids: 5
 *     }
 *   },
 *   
 * ];
 *
 * profileListings(sampleProfileData);
 */
export function profileListings(profileData) {
    profileData.forEach(({ title, endsAt, media, id, _count }) => {
        const { bids } = _count;
        cardTemplate(title, endsAt, media, id, bids);
    });
}
