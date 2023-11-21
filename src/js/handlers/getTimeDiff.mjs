// Calculate time difference between two dates
export function getTimeDifference(endsAt) {
    const now = new Date();
    const endsAtDate = new Date(endsAt);
    const timeDifference = endsAtDate - now;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
}
