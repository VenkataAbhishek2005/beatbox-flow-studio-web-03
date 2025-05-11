
/**
 * Generate a reminder message for a student with unpaid fees
 * @param {Object} student - The student object
 * @returns {string} - The formatted reminder message
 */
export const generateReminderMessage = (student) => {
  return `Hello ${student.studentName.split(' ')[0]},\n\n`
    + `This is a reminder from Beatbox Dance & Fitness Studio that your payment of ₹${student.amountDue} is pending.\n\n`
    + `Please clear your dues at the earliest.\n\n`
    + `Thank you,\n`
    + `Beatbox Studio Team`;
};

/**
 * Format a phone number for Twilio WhatsApp
 * @param {Object} mobileNumber - Object containing countryCode and number
 * @returns {string} - Formatted phone number
 */
export const formatPhoneForWhatsApp = (mobileNumber) => {
  // Remove any spaces or dashes from the number
  const cleanNumber = mobileNumber.number.replace(/[\s-]/g, '');
  
  // Ensure country code starts with +
  const countryCode = mobileNumber.countryCode.startsWith('+') 
    ? mobileNumber.countryCode 
    : `+${mobileNumber.countryCode}`;
  
  return `${countryCode}${cleanNumber}`;
};

/**
 * Get the current month and year
 * @returns {Object} - Object containing month and year
 */
export const getCurrentMonthYear = () => {
  const now = new Date();
  return {
    month: now.getMonth() + 1, // Months are 0-indexed in JS
    year: now.getFullYear()
  };
};
