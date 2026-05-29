import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendOrderConfirmation } from "@/lib/whatsapp";

export async function POST(request) {
  try {
    const data = await request.json();
    
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
