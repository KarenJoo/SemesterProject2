/**
 * Calculates the time difference between the current date and the provided end date.
 *
 * @param {Date} endsAt - The end date and time.
 * @returns {Object} An object containing the time difference in days, hours, and minutes.
 *
 * @example
 * // Calculate time difference for a specific end date
 * const { days, hours, minutes } = getTimeDifference("2023-12-31T23:59:59");
 */
export function getTimeDifference(endsAt) {
    const now = new Date();
    const endsAtDate = new Date(endsAt);
    const timeDifference = endsAtDate - now;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
}


/**
 * Formats the time difference into a human-readable string with days, hours, and minutes.
 *
 * @param {number} days - The number of days in the time difference.
 * @param {number} hours - The number of hours in the time difference.
 * @param {number} minutes - The number of minutes in the time difference.
 * @returns {string} A formatted string representing the time difference.
 *
 * @example
 * // Format time difference for 2 days, 5 hours, and 30 minutes
 * const formattedTime = formatTimeDifference(2, 5, 30);
 * console.log(formattedTime); // Output: "2d 5h 30m"
 */
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