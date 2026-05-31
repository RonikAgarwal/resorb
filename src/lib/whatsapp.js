const accessToken = process.env.WHATSAPP_CLOUD_TOKEN;
const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

/**
 * Sends a WhatsApp message via WhatsApp Cloud API.
 * Falls back to console.log if credentials aren't configured properly.
 */
async function sendWhatsApp(toPhone, message) {
  // Format phone number to E.164 without the plus sign for WhatsApp Cloud API.
  let formattedPhone = toPhone.trim().replace('+', '');
  
  // Assuming India (91) if no country code provided.
  if (formattedPhone.length === 10) {
    formattedPhone = '91' + formattedPhone;
  }
  
  if (!accessToken || !phoneNumberId) {
    console.log(`\n========================================`);
    console.log(`💬 [SIMULATED WHATSAPP TO ${formattedPhone}]`);
    console.log(`${message}`);
    console.log(`========================================\n`);
    return true; // Simulate success
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: formattedPhone,
          type: "text",
          text: {
            preview_url: false,
            body: message
          }
        }),
      }
    );

    const data = await response.json();
    
    if (response.ok) {
      console.log(`WhatsApp sent successfully to ${formattedPhone}, Message ID: ${data.messages[0].id}`);
      return true;
    } else {
      console.error(`Error from WhatsApp API to ${formattedPhone}:`, data.error);
      return false;
    }
  } catch (error) {
    console.error(`Error sending WhatsApp to ${formattedPhone}:`, error);
    return false;
  }
}

export async function sendOrderConfirmation(order) {
  const itemsText = order.items.map(item => `${item.quantity || item.qty || 1}x ${item.name}`).join(', ');
  
  const message = `🎉 *Order Confirmed!*\n\nHi ${order.customerName || 'Customer'},\nThank you for shopping at RESORB.\n\n*Order ID:* ${order.id}\n*Items:* ${itemsText}\n*Total:* ₹${order.total}\n\nWe will notify you once your order is shipped.\n\nTrack your order anytime at: https://resorb.in/track`;
  
  return sendWhatsApp(order.phone, message);
}

export async function sendPickupNotification(order) {
  const message = `📦 *Your Order is Shipped!*\n\nHi ${order.customerName || 'Customer'},\nYour RESORB order (${order.id}) has been picked up by our courier partner.\n\n*Courier:* ${order.courier}\n*Tracking ID:* ${order.tracking_id}\n\nYou can track the exact status on our website or the courier's portal.`;
  
  return sendWhatsApp(order.phone, message);
}
