import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendPickupNotification } from "@/lib/whatsapp";

export async function POST(request, { params }) {
  const { id } = await params;
  
  const couriers = ["Delhivery", "BlueDart", "DTDC", "Ekart"];
  const randomCourier = couriers[Math.floor(Math.random() * couriers.length)];
  const shipmentId = "SHIP" + Math.floor(100000 + Math.random() * 900000);
  const trackingId = "TRK" + Math.floor(100000 + Math.random() * 900000);

  const updates = {
    status: "PICKED_UP",
    shipment_id: shipmentId,
    tracking_id: trackingId,
    courier: randomCourier,
    updated_at: new Date().toISOString()
  };

  const { data: order, error } = await supabaseAdmin
    .from('orders')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error || !order) {
    console.error("Error updating order shipment:", error);
    return NextResponse.json({ error: "Failed to create shipment" }, { status: 500 });
  }

  // Format for frontend and whatsapp
  const formattedOrder = {
    ...order,
    customerName: order.customer_name,
    createdAt: order.created_at,
    updatedAt: order.updated_at,
    trackingId: order.tracking_id,
    shipmentId: order.shipment_id
  };

  // Send WhatsApp notification
  await sendPickupNotification(formattedOrder);

  return NextResponse.json({ success: true, order: formattedOrder });
}
