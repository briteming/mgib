/**
 * Formats a date string into a more readable format.
 *
 * @param {Date} dateString - The date to format.
 * @returns {string} The formatted date string.
 */
export const formatDate = (dateString: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric", 
    month: "long", 
    day: "numeric"
  };
  return dateString.toLocaleDateString(undefined, options);
};

/**
 * Truncates a string to a specified length and appends an ending, defaulting to "...".
 *
 * @param {string} str - The string to truncate.
 * @param {number} length - Maximum length of the string before truncation. Default is 100.
 * @param {string} ending - The string to append at the end of truncation. Default is "...".
 * @returns {string} The truncated string with the specified ending.
 */
export const truncate = (str: string, length = 100, ending = "...") => {
  if (str.length > length) {
    // Subtract the length of the ending string to ensure the total length respects the limit
    return str.substring(0, length - ending.length) + ending;
  } else {
    // Return the original string if it's shorter than the specified length
    return str;
  }
};
