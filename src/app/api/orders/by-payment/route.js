import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const rpayPid = searchParams.get("rpay_pid");

    if (!rpayPid) {
      return NextResponse.json(
        { success: false, error: "Missing rpay_pid" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("orders")
      .select("id")
      .eq("razorpay_payment_id", rpayPid)
      .single();

    if (error || !data) {
      return NextResponse.json({ success: false });
    }

    return NextResponse.json({ success: true, orderId: data.id });
  } catch (error) {
    console.error("Error fetching order by payment ID:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
