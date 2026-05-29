import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const { data: orders, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }

  // Map back to camelCase for the frontend
  const formattedOrders = orders.map(order => ({
    ...order,
    customerName: order.customer_name,
    createdAt: order.created_at,
    updatedAt: order.updated_at,
    trackingId: order.tracking_id,
    shipmentId: order.shipment_id
  }));

  return NextResponse.json({ orders: formattedOrders });
}
