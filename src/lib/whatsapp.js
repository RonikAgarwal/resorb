import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioWhatsAppFrom = process.env.TWILIO_WHATSAPP_FROM;

let client = null;
if (accountSid && authToken) {
  try {
    client = twilio(accountSid, authToken);
  } catch (error) {
    console.error("Failed to initialize Twilio client:", error);
  }
}

/**
 * Sends a WhatsApp message via Twilio.
 * Falls back to console.log if Twilio isn't configured properly.
 */
async function sendWhatsApp(toPhone, message) {
  // Format phone number to E.164. Assuming India (+91) if no country code provided.
  let formattedPhone = toPhone.trim();
  if (!formattedPhone.startsWith('+')) {
    formattedPhone = '+91' + formattedPhone;
  }
  
  if (!client || !twilioWhatsAppFrom) {
    console.log(`\n========================================`);
    console.log(`💬 [SIMULATED WHATSAPP TO ${formattedPhone}]`);
    console.log(`${message}`);
    console.log(`========================================\n`);
    return true; // Simulate success
  }

  try {
    const response = await client.messages.create({
      body: message,
      from: twilioWhatsAppFrom,
      to: `whatsapp:${formattedPhone}`
    });
    console.log(`WhatsApp sent successfully to ${formattedPhone}, SID: ${response.sid}`);
    return true;
  } catch (error) {
    console.error(`Error sending WhatsApp to ${formattedPhone}:`, error);
    return false;
  }
}

export async function sendOrderConfirmation(order) {
  const itemsText = order.items.map(item => `${item.qty}x ${item.name}`).join(', ');
  
  const message = `🎉 *Order Confirmed!*\n\nHi ${order.customerName || 'Customer'},\nThank you for shopping at RESORB.\n\n*Order ID:* ${order.id}\n*Items:* ${itemsText}\n*Total:* ₹${order.total}\n\nWe will notify you once your order is shipped.\n\nTrack your order anytime at: https://resorb.in/track`;
  
  return sendWhatsApp(order.phone, message);
}

export async function sendPickupNotification(order) {
  const message = `📦 *Your Order is Shipped!*\n\nHi ${order.customerName || 'Customer'},\nYour RESORB order (${order.id}) has been picked up by our courier partner.\n\n*Courier:* ${order.courier}\n*Tracking ID:* ${order.tracking_id}\n\nYou can track the exact status on our website or the courier's portal.`;
  
  return sendWhatsApp(order.phone, message);
}
