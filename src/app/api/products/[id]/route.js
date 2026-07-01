import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// GET /api/products/[id] — Get a single product
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const { data, error } = await supabaseAdmin
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product: data });
  } catch (error) {
    console.error("Error in GET /api/products/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] — Update a product (admin only)
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();

    const updates = {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.item_name !== undefined && { item_name: data.item_name }),
      ...(data.model_name !== undefined && { model_name: data.model_name }),
      ...(data.category !== undefined && { category: data.category }),
      ...(data.brand !== undefined && { brand: data.brand }),
      ...(data.images !== undefined && { images: data.images }),
      ...(data.price !== undefined && { price: data.price }),
      ...(data.mrp !== undefined && { mrp: data.mrp }),
      ...(data.discount !== undefined && { discount: data.discount }),
      ...(data.specs !== undefined && { specs: data.specs }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.model_family !== undefined && { model_family: data.model_family }),
      ...(data.compatibility !== undefined && { compatibility: data.compatibility }),
      ...(data.quality !== undefined && { quality: data.quality }),
      ...(data.quality_assurance !== undefined && { quality_assurance: data.quality_assurance }),
      ...(data.disclaimer !== undefined && { disclaimer: data.disclaimer }),
      ...(data.safety_information !== undefined && { safety_information: data.safety_information }),
      ...(data.pairing_required !== undefined && { pairing_required: data.pairing_required }),
      ...(data.pairing_instructions !== undefined && { pairing_instructions: data.pairing_instructions }),
      ...(data.weight_grams !== undefined && { weight_grams: data.weight_grams }),
      ...(data.length_cm !== undefined && { length_cm: data.length_cm }),
      ...(data.width_cm !== undefined && { width_cm: data.width_cm }),
      ...(data.height_cm !== undefined && { height_cm: data.height_cm }),
      ...(data.in_stock !== undefined && { in_stock: data.in_stock }),
      ...(data.warranty !== undefined && { warranty: data.warranty }),
      ...(data.popular !== undefined && { popular: data.popular }),
      ...(data.compatible_brands !== undefined && { compatible_brands: data.compatible_brands }),
      ...(data.compatible_models !== undefined && { compatible_models: data.compatible_models }),
      ...(data.tags !== undefined && { tags: data.tags }),
      ...(data.status !== undefined && { status: data.status }),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabaseAdmin
      .from("products")
      .update(updates)
      .eq("id", id);

    if (error) {
      console.error("Error updating product:", error);
      return NextResponse.json(
        { success: false, error: "Failed to update product" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in PUT /api/products/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] — Delete a product (admin only)
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const { error } = await supabaseAdmin
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting product:", error);
      return NextResponse.json(
        { success: false, error: "Failed to delete product" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/products/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
