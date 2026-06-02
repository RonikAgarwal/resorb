import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// GET /api/brands — List all brands, ordered alphabetically
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("brands")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching brands:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch brands" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, brands: data || [] });
  } catch (error) {
    console.error("Error in GET /api/brands:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/brands — Create a new brand (deduplicates by slug)
export async function POST(request) {
  try {
    const { name } = await request.json();

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Brand name is required" },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const slug = trimmedName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    // Check if brand already exists
    const { data: existing } = await supabaseAdmin
      .from("brands")
      .select("*")
      .eq("slug", slug)
      .single();

    if (existing) {
      // Return existing brand instead of creating duplicate
      return NextResponse.json({ success: true, brand: existing, existing: true });
    }

    // Create new brand
    const { data, error } = await supabaseAdmin
      .from("brands")
      .insert([{ name: trimmedName, slug }])
      .select()
      .single();

    if (error) {
      console.error("Error creating brand:", error);
      // Handle unique constraint violation gracefully
      if (error.code === "23505") {
        const { data: existingBrand } = await supabaseAdmin
          .from("brands")
          .select("*")
          .eq("slug", slug)
          .single();
        return NextResponse.json({ success: true, brand: existingBrand, existing: true });
      }
      return NextResponse.json(
        { success: false, error: "Failed to create brand" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, brand: data });
  } catch (error) {
    console.error("Error in POST /api/brands:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
