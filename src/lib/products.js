import { supabaseAdmin } from "@/lib/supabase";

/**
 * Fetch a single product by ID from Supabase
 */
export async function getProductById(id) {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data;
}

/**
 * Fetch all products, optionally filtered
 */
export async function getAllProducts() {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
  return data || [];
}

/**
 * Fetch products by category
 */
export async function getProductsByCategory(categorySlug) {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("category", categorySlug)
    .order("popular", { ascending: false });

  if (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
  return data || [];
}

/**
 * Fetch popular/featured products
 */
export async function getPopularProducts(limit = 10) {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("popular", true)
    .limit(limit);

  if (error) {
    console.error("Error fetching popular products:", error);
    return [];
  }
  return data || [];
}

/**
 * Fetch related products (same category, excluding current)
 */
export async function getRelatedProducts(product, limit = 4) {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("category", product.category)
    .neq("id", product.id)
    .limit(limit);

  if (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
  return data || [];
}

/**
 * Search products across multiple fields
 */
export async function searchProducts(query, { category, brand } = {}) {
  if (!query || query.trim().length < 2) {
    // If no query but filters exist, just return filtered
    if (category || brand) {
      let q = supabaseAdmin.from("products").select("*");
      if (category) q = q.eq("category", category);
      if (brand) q = q.eq("brand", brand);
      const { data } = await q.order("popular", { ascending: false });
      return data || [];
    }
    return [];
  }

  const searchTerm = query.trim().toLowerCase();

  // Fetch all products (Supabase doesn't support OR across text + array fields easily)
  const { data: allProducts, error } = await supabaseAdmin
    .from("products")
    .select("*");

  if (error || !allProducts) return [];

  return allProducts.filter((p) => {
    // Apply category/brand filters first
    if (category && p.category !== category) return false;
    if (brand && p.brand !== brand) return false;

    // Search across text fields
    if (p.title.toLowerCase().includes(searchTerm)) return true;
    if (p.sku.toLowerCase().includes(searchTerm)) return true;
    if (p.brand.toLowerCase().includes(searchTerm)) return true;
    if (p.description.toLowerCase().includes(searchTerm)) return true;
    if (p.category.replace(/-/g, " ").includes(searchTerm)) return true;

    // Search array fields
    if ((p.compatible_brands || []).some((b) => b.toLowerCase().includes(searchTerm))) return true;
    if ((p.compatible_models || []).some((m) => m.toLowerCase().includes(searchTerm))) return true;
    if ((p.tags || []).some((t) => t.toLowerCase().includes(searchTerm))) return true;

    return false;
  });
}
