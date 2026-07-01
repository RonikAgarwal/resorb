/**
 * Migration script: Seed existing 56 hardcoded products into Supabase
 * 
 * Run with: node src/scripts/migrate-products.mjs
 * 
 * This reads the old products data and transforms it into the new schema,
 * then inserts into the Supabase `products` table.
 */

import { createClient } from '@supabase/supabase-js';

// ── Supabase config (copy from .env.local) ──
const SUPABASE_URL = 'https://wcppestkxqnoriurmkel.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjcHBlc3RreHFub3JpdXJta2VsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDA1NTEwMywiZXhwIjoyMDk1NjMxMTAzfQ.VtH___vQlTYrV1xcxh0hU2hxzwoS00VoKdzf92hrTPQ';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

/**
 * Transform old product shape → new DB schema
 */
function transformProduct(old) {
  // Build specs from old fields
  const specs = [];

  if (old.remoteType) specs.push({ key: "Connectivity Technology", value: old.remoteType === "IR" ? "Infrared" : old.remoteType });
  if (old.batteryType) specs.push({ key: "Battery Type", value: old.batteryType });
  if (old.batteryIncluded !== undefined) specs.push({ key: "Batteries Included", value: old.batteryIncluded ? "Yes" : "No" });
  if (old.plugAndPlay !== undefined) specs.push({ key: "Setup", value: old.plugAndPlay ? "Plug & Play" : "Pairing needed" });
  if (old.voiceEnabled !== undefined) specs.push({ key: "Voice Control", value: old.voiceEnabled ? "Yes" : "No" });

  // Add old features as specs
  if (old.features) {
    old.features.forEach((f) => {
      // Skip features already captured above
      if (f.toLowerCase().includes("batteries included")) return;
      if (f.toLowerCase().includes("plug & play") || f.toLowerCase().includes("plug and play")) return;
      if (f.toLowerCase().includes("no pairing")) return;
      specs.push({ key: "Feature", value: f });
    });
  }

  return {
    id: old.id,
    sku: old.sku,
    title: old.title,
    category: old.category,
    brand: old.brand,
    images: old.images || (old.image ? [old.image] : []),
    price: old.price,
    mrp: old.originalPrice || old.price,
    discount: old.discount || 0,
    specs,
    description: old.description || "",
    weight_grams: null,
    length_cm: null,
    width_cm: null,
    height_cm: null,
    in_stock: old.inStock !== undefined ? old.inStock : true,
    warranty: old.warranty || "30 days replacement",
    popular: old.popular || false,
    compatible_brands: old.compatibleBrands || [],
    compatible_models: old.compatibleModels || [],
    tags: old.tags || [],
  };
}

// ── All 56 hardcoded products (inline to avoid ESM import issues) ──
// We'll dynamically import them
async function main() {
  console.log("🚀 Starting product migration...\n");

  // Import the old products data
  let oldProducts;
  try {
    const mod = await import('../data/products.js');
    oldProducts = mod.products;
  } catch (err) {
    console.error("❌ Failed to import products.js:", err.message);
    console.log("\nTrying alternative path...");
    try {
      const mod = await import('./src/data/products.js');
      oldProducts = mod.products;
    } catch (err2) {
      console.error("❌ Could not import products:", err2.message);
      process.exit(1);
    }
  }

  console.log(`📦 Found ${oldProducts.length} products to migrate\n`);

  // Transform all products
  const newProducts = oldProducts.map(transformProduct);

  // Insert in batches of 10
  const batchSize = 10;
  let inserted = 0;
  let errors = 0;

  for (let i = 0; i < newProducts.length; i += batchSize) {
    const batch = newProducts.slice(i, i + batchSize);
    const { error } = await supabase.from("products").upsert(batch, { onConflict: "id" });

    if (error) {
      console.error(`❌ Batch ${Math.floor(i / batchSize) + 1} error:`, error.message);
      errors += batch.length;
    } else {
      inserted += batch.length;
      console.log(`✅ Batch ${Math.floor(i / batchSize) + 1}: ${batch.length} products inserted`);
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ Inserted: ${inserted}`);
  if (errors > 0) console.log(`❌ Errors: ${errors}`);
  console.log(`📊 Total: ${newProducts.length}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  // Verify
  const { data, error: countError } = await supabase.from("products").select("id", { count: "exact" });
  if (!countError) {
    console.log(`🔍 Verification: ${data.length} products in database`);
  }
}

main().catch(console.error);
