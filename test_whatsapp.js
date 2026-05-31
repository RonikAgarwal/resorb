// Env vars provided via node --env-file

async function test() {
  const accessToken = process.env.WHATSAPP_CLOUD_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const toPhone = "918099450121"; // The phone number from the Meta screenshot

  console.log("Token starts with:", accessToken.substring(0, 15) + "...");
  console.log("Phone Number ID:", phoneNumberId);

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
          to: toPhone,
          type: "template",
          template: {
            name: "hello_world",
            language: { code: "en_US" }
          }
        }),
      }
    );

    const data = await response.json();
    console.log("Response status:", response.status);
    console.log("Response data:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

test();
