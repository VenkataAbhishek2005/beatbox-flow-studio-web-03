
// In-memory storage for sent reminders
const sentReminders = [];

// Configuration (in a real app, these would be securely stored)
const config = {
  twilioAccountSid: 'ACdbfe0e6bf38af781a5b8579a35358b6d',
  twilioAuthToken: 'f2f268b73fd6c691e86825310d0bde69',
  twilioPhoneNumber: '+14155238886'
};

/**
 * This is a browser-compatible version of the send reminder function
 * In a real application, this would make an API call to a backend service
 */
export const sendWhatsAppReminder = async (to, message) => {
  try {
    console.log(`Sending reminder to ${to} with message: ${message}`);
    console.log(`Using Twilio credentials: Account: ${config.twilioAccountSid.substring(0, 5)}... Phone: ${config.twilioPhoneNumber}`);
    
    // Simulate API call to backend
    // In a real application, this would be a fetch call to your backend API
    const mockResponse = await new Promise(resolve => {
      setTimeout(() => {
        const sid = 'MOCK_' + Math.random().toString(36).substring(2, 10).toUpperCase();
        
        // Store the reminder in our in-memory storage
        sentReminders.push({
          sid,
          to,
          message,
          status: 'queued',
          sentAt: new Date()
        });
        
        resolve({
          sid,
          status: 'queued',
          to: to,
          body: message
        });
      }, 1000); // Simulate network delay
    });
    
    console.log(`Mock message sent with SID: ${mockResponse.sid}`);
    return mockResponse;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
};

// Add comment explaining the situation
/**
 * NOTE: The Twilio package cannot be used directly in browser environments.
 * In a real production application, you would need to:
 * 1. Create a server-side API endpoint that uses the Twilio SDK
 * 2. Call that API endpoint from your client-side code
 * 
 * The implementation above is a mock version for client-side development and testing.
 */

// Export the sentReminders for potential inspection in the UI
export const getSentReminders = () => [...sentReminders];
