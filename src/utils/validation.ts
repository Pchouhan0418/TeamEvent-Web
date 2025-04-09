/**
 * Validate an email address format
 * @param email - Email address to validate
 * @returns True if the email format is valid
 */
export const isValidEmail = (email: string): boolean => {
  // Simple email regex pattern for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate event form data
 * @param name - Event name
 * @param startTime - Event start time
 * @param endTime - Event end time
 * @param venue - Event venue
 * @param attendeesCount - Number of attendees
 * @returns Object with validation result and error message
 */
export const validateEventForm = (
  name: string, 
  startTime: string, 
  endTime: string, 
  venue: string, 
  attendeesCount: number
): { isValid: boolean; errorMessage?: string } => {
  if (!name.trim()) {
    return { isValid: false, errorMessage: 'Event name is required' };
  }
  
  if (!startTime) {
    return { isValid: false, errorMessage: 'Start time is required' };
  }
  
  if (!endTime) {
    return { isValid: false, errorMessage: 'End time is required' };
  }
  
  if (!venue.trim()) {
    return { isValid: false, errorMessage: 'Venue is required' };
  }
  
  if (attendeesCount < 1) {
    return { isValid: false, errorMessage: 'At least one attendee is required' };
  }
  
  try {
    const now = new Date();
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    
    if (startDate <= now) {
      return { isValid: false, errorMessage: 'Start time must be in the future' };
    }
    
    if (endDate <= startDate) {
      return { isValid: false, errorMessage: 'End time must be after the start time' };
    }
  } catch (e) {
    return { isValid: false, errorMessage: 'Invalid date format' };
  }
  
  return { isValid: true };
}; 