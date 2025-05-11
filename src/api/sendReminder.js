
import twilio from 'twilio';

export const sendWhatsAppReminder = async (to, message) => {
  try {
    // Initialize Twilio client with account credentials
    const accountSid = process.env.TWILIO_ACCOUNT_SID || import.meta.env.VITE_TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN || import.meta.env.VITE_TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_PHONE_NUMBER || import.meta.env.VITE_TWILIO_PHONE_NUMBER;
    
    if (!accountSid || !authToken || !fromNumber) {
      throw new Error('Twilio credentials not found');
    }
    
    const client = twilio(accountSid, authToken);

    // Format the 'to' number to ensure it's in the right format for WhatsApp
    // Twilio WhatsApp requires the format: whatsapp:+{countryCode}{number}
    const formattedTo = `whatsapp:${to}`;
    const formattedFrom = `whatsapp:${fromNumber}`;
    
    // Send the message
    const result = await client.messages.create({
      body: message,
      from: formattedFrom,
      to: formattedTo
    });
    
    console.log(`Message sent with SID: ${result.sid}`);
    return result;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
};
