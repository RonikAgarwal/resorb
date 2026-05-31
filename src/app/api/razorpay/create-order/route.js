import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const { amount } = await request.json();

    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 });
    }

    // Razorpay amount is in paise (INR * 100)
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    };

    const order = await razorpay.orders.create(options);
    
    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
