import { NextResponse } from "next/server";
import { createOrder } from "@/lib/mockDb";

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Create order in DB
    const order = createOrder({
      customerName: data.name,
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
    });

    // We will add WhatsApp logic here later

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}
