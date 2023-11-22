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

// formats the time difference > days, hours, minutes (chatGPT)
export function formatTimeDifference(days, hours, minutes) {
    const parts = [];
    if (days > 0) {
      parts.push(`${days}d${days > 1 ? '' : ''}`);
    }
    if (hours > 0) {
      parts.push(`${hours}h${hours > 1 ? '' : ''}`);
    }
    if (minutes > 0) {
      parts.push(`${minutes}m${minutes > 1 ? '' : ''}`);
    }
    return parts.join(' ');
  }