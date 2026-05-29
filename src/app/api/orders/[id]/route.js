import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(request, { params }) {
  const { id } = await params;
  
  // We can also extract phone from search params to validate
  const { searchParams } = new URL(request.url);
  const phone = searchParams.get('phone');
  
  // Fetch from Supabase
  const { data: order, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error || !order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  
  // Optional: Add simple security check
  if (phone && order.phone !== phone) {
    return NextResponse.json({ error: "Phone number does not match" }, { status: 401 });
  }

  // Generate timeline dynamically based on status
  const timeline = [
    { status: "Order Placed", time: new Date(order.created_at).toLocaleDateString("en-IN", { hour: "2-digit", minute: "2-digit" }), done: true },
    { status: "Payment Confirmed", time: new Date(order.created_at).toLocaleDateString("en-IN", { hour: "2-digit", minute: "2-digit" }), done: true },
    { status: "Packed & Ready", time: "Pending", done: order.status === "PICKED_UP" || order.status === "DELIVERED" },
    { status: "Dispatched", time: order.status === "PICKED_UP" ? new Date(order.updated_at || order.created_at).toLocaleDateString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "Pending", done: order.status === "PICKED_UP" || order.status === "DELIVERED" },
    { status: "Out for Delivery", time: "Pending", done: order.status === "DELIVERED" },
    { status: "Delivered", time: "Pending", done: order.status === "DELIVERED" },
  ];

  // Return formatted order
  return NextResponse.json({
    order: {
      ...order,
      timeline,
      // Map postgres snake_case back to camelCase for the frontend
      customerName: order.customer_name,
      createdAt: order.created_at,
      updatedAt: order.updated_at
    }
  });
}
