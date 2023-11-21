// Calculate time difference to insert as "endsAt" (chatGPT)
export function getTimeDifference(endsAt) {
    const now = new Date();
    const endsAtDate = new Date(endsAt);
    const timeDifference = endsAtDate - now;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
}

// formats the time difference > days, hours, minutes
export function formatTimeDifference(days, hours, minutes) {
    const parts = [];
    if (days > 0) {
      parts.push(`${days} day${days > 1 ? 's' : ''}`);
    }
    if (hours > 0) {
      parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    }
    if (minutes > 0) {
      parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
    }
    return parts.join(' ');
  }