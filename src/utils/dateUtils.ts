/**
 * Format a date string into a human-readable format
 * @param dateTimeStr - ISO date string to format
 * @returns Formatted date string
 */
export const formatDateTime = (dateTimeStr: string): string => {
  try {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateTimeStr).toLocaleString(undefined, options);
  } catch (e) {
    console.error('Error formatting date:', e);
    return dateTimeStr;
  }
};

/**
 * Check if a date is in the future
 * @param dateStr - Date string to check
 * @returns True if the date is in the future
 */
export const isDateInFuture = (dateStr: string): boolean => {
  try {
    const dateToCheck = new Date(dateStr);
    const now = new Date();
    return dateToCheck > now;
  } catch (e) {
    console.error('Error checking if date is in future:', e);
    return false;
  }
};

/**
 * Check if one date is after another
 * @param laterDateStr - Later date string
 * @param earlierDateStr - Earlier date string
 * @returns True if laterDate is after earlierDate
 */
export const isDateAfter = (laterDateStr: string, earlierDateStr: string): boolean => {
  try {
    const laterDate = new Date(laterDateStr);
    const earlierDate = new Date(earlierDateStr);
    return laterDate > earlierDate;
  } catch (e) {
    console.error('Error comparing dates:', e);
    return false;
  }
}; 