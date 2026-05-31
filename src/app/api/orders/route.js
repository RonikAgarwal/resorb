import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendOrderConfirmation } from "@/lib/whatsapp";
import crypto from "crypto";

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Verify Razorpay Payment Signature
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = data;
    
    console.log("Payment Details:", { razorpay_payment_id, razorpay_order_id, razorpay_signature });
    console.log("Secret Key Present:", !!process.env.RAZORPAY_KEY_SECRET);

    if (razorpay_payment_id && razorpay_order_id && razorpay_signature) {
      if (!process.env.RAZORPAY_KEY_SECRET) {
        console.error("Missing RAZORPAY_KEY_SECRET in environment variables");
        return NextResponse.json(
          { success: false, error: "Server configuration error" },
          { status: 500 }
        );
      }

      const generated_signature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

      console.log("Generated:", generated_signature);
      console.log("Received :", razorpay_signature);

      if (generated_signature !== razorpay_signature) {
        return NextResponse.json(
          { success: false, error: "Invalid payment signature" },
          { status: 400 }
        );
      }
    }

    // Generate Order ID: RES + 6 digits
    const orderId = "RES" + Math.floor(100000 + Math.random() * 900000);
    
    const newOrder = {
      id: orderId,
      customer_name: data.name,
      phone: data.phone,
      email: data.email || "",
      address: data.address,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      items: data.items,
      subtotal: data.subtotal,
      shipping: data.shipping,
      total: data.total,
      status: "ORDER_CONFIRMED"
    };

    // Insert into Supabase
    const { error } = await supabaseAdmin
      .from('orders')
      .insert([newOrder]);

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }

    // Adapt to the format expected by our whatsapp service
    const orderForWhatsapp = {
      id: orderId,
      customerName: newOrder.customer_name,
      phone: newOrder.phone,
      total: newOrder.total,
      items: newOrder.items
    };

    // Send WhatsApp confirmation
    await sendOrderConfirmation(orderForWhatsapp);

    return NextResponse.json({ success: true, orderId: orderId });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}
