import {cardTemplate} from "/src/js/templates/cardTemp.mjs"


export function profileListings(profileData) {
    profileData.forEach(({ title, endsAt, media, id, _count }) => {
        const { bids } = _count;
        cardTemplate(title, endsAt, media, id, bids);
    });
}
