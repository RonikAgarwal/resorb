import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// GET /api/products — List all products (with optional filters)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const popular = searchParams.get("popular");
    const status = searchParams.get("status");
    const q = searchParams.get("q");

    let query = supabaseAdmin.from("products").select("*");

    if (category) {
      query = query.eq("category", category);
    }

    if (brand) {
      query = query.eq("brand", brand);
    }

    if (popular === "true") {
      query = query.eq("popular", true);
    }

    if (status) {
      query = query.eq("status", status);
    }

    if (q && q.trim().length >= 2) {
      const searchTerm = q.trim().toLowerCase();
      // Use Postgres full-text or ilike for search across multiple fields
      query = query.or(
        `title.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%,sku.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`
      );
    }

    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching products:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch products" },
        { status: 500 }
      );
    }

    // If search query, also search compatible_models and tags arrays
    let results = data || [];
    if (q && q.trim().length >= 2) {
      const searchTerm = q.trim().toLowerCase();
      // Fetch all products and filter client-side for array fields
      const { data: allProducts } = await supabaseAdmin
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (allProducts) {
        const existingIds = new Set(results.map((p) => p.id));
        const arrayMatches = allProducts.filter((p) => {
          if (existingIds.has(p.id)) return false;
          if (category && p.category !== category) return false;
          if (brand && p.brand !== brand) return false;
          return (
            (p.compatible_models || []).some((m) =>
              m.toLowerCase().includes(searchTerm)
            ) ||
            (p.compatible_brands || []).some((b) =>
              b.toLowerCase().includes(searchTerm)
            ) ||
            (p.tags || []).some((t) => t.toLowerCase().includes(searchTerm))
          );
        });
        results = [...results, ...arrayMatches];
      }
    }

    return NextResponse.json({ success: true, products: results });
  } catch (error) {
    console.error("Error in GET /api/products:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/products — Create a new product (admin only)
export async function POST(request) {
  try {
    const data = await request.json();

    // Generate ID from SKU
    const id = data.sku.toLowerCase().replace(/\s+/g, "-");

    const newProduct = {
      id,
      sku: data.sku,
      title: data.title || data.item_name || "",
      item_name: data.item_name || data.title || "",
      model_name: data.model_name || "",
      category: data.category,
      brand: data.brand,
      images: data.images || [],
      price: data.price,
      mrp: data.mrp,
      discount: data.discount || Math.round(((data.mrp - data.price) / data.mrp) * 100),
      specs: data.specs || [],
      description: data.description || "",
      model_family: data.model_family || [],
      compatibility: data.compatibility || "",
      quality: data.quality || "",
      quality_assurance: data.quality_assurance || "Every remote is tested before dispatch before shipping.",
      disclaimer: data.disclaimer || "Please match your existing remote with the product image before placing an order.",
      safety_information: data.safety_information || "Remove batteries when not in use for extended periods. Avoid exposure to heat and moisture.",
      pairing_required: data.pairing_required || false,
      pairing_instructions: data.pairing_instructions || "",
      weight_grams: data.weight_grams || null,
      length_cm: data.length_cm || null,
      width_cm: data.width_cm || null,
      height_cm: data.height_cm || null,
      in_stock: data.in_stock !== undefined ? data.in_stock : true,
      warranty: data.warranty || "",
      popular: data.popular || false,
      compatible_brands: data.compatible_brands || [],
      compatible_models: data.compatible_models || [],
      tags: data.tags || [],
      status: data.status || "draft",
    };

    const { error } = await supabaseAdmin.from("products").insert([newProduct]);

    if (error) {
      console.error("Error creating product:", error);
      if (error.code === "23505") {
        return NextResponse.json(
          { success: false, error: "A product with this SKU already exists" },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { success: false, error: "Failed to create product" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Error in POST /api/products:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
