import { NextResponse } from "next/server";
import { updateOrderStatus, getOrderById } from "@/lib/mockDb";

const COURIERS = ["Delhivery", "BlueDart", "DTDC", "Ekart", "Xpressbees"];

export async function POST(request, { params }) {
  const { id } = await params;
  
  const order = getOrderById(id);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  // Simulate Shiprocket API call
  await new Promise(r => setTimeout(r, 1000));

  const shipmentId = "SHIP" + Math.floor(100000 + Math.random() * 900000);
  const trackingId = "TRK" + Math.floor(10000000 + Math.random() * 90000000);
  const courier = COURIERS[Math.floor(Math.random() * COURIERS.length)];

  const updatedOrder = updateOrderStatus(id, {
    status: "PICKED_UP",
    shipmentId,
    trackingId,
    courier
  });

  return NextResponse.json({ order: updatedOrder });
}
