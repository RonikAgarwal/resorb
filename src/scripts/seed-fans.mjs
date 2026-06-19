import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wcppestkxqnoriurmkel.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjcHBlc3RreHFub3JpdXJta2VsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDA1NTEwMywiZXhwIjoyMDk1NjMxMTAzfQ.VtH___vQlTYrV1xcxh0hU2hxzwoS00VoKdzf92hrTPQ';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const fanProducts = [
  {
    id: "fan-dummy-1",
    sku: "RES-FAN-001",
    title: "RESORB Universal Fan Remote",
    category: "fan-remotes",
    brand: "Generic",
    images: ["/images/categories/ac-remotes.png"],
    price: 349,
    mrp: 599,
    discount: 41,
    specs: [{ key: "Setup", value: "Pairing needed" }],
    description: "Universal remote for all major ceiling fan brands.",
    in_stock: true,
    warranty: "30 days replacement",
    popular: false,
    compatible_brands: ["Orient", "Crompton", "Havells"],
    compatible_models: [],
    tags: ["fan", "universal"],
  },
  {
    id: "fan-dummy-2",
    sku: "RES-FAN-002",
    title: "Replacement Remote for Orient Fans",
    category: "fan-remotes",
    brand: "Orient",
    images: ["/images/categories/ac-remotes.png"],
    price: 299,
    mrp: 499,
    discount: 40,
    specs: [{ key: "Setup", value: "Plug & Play" }],
    description: "Exact replacement remote for Orient BLDC fans.",
    in_stock: true,
    warranty: "30 days replacement",
    popular: true,
    compatible_brands: ["Orient"],
    compatible_models: ["Aeroslim"],
    tags: ["fan", "orient"],
  },
  {
    id: "fan-dummy-3",
    sku: "RES-FAN-003",
    title: "Replacement Remote for Crompton Fans",
    category: "fan-remotes",
    brand: "Crompton",
    images: ["/images/categories/ac-remotes.png"],
    price: 329,
    mrp: 549,
    discount: 40,
    specs: [{ key: "Setup", value: "Plug & Play" }],
    description: "Replacement remote for Crompton Energion fans.",
    in_stock: true,
    warranty: "30 days replacement",
    popular: false,
    compatible_brands: ["Crompton"],
    compatible_models: ["Energion"],
    tags: ["fan", "crompton"],
  },
  {
    id: "fan-dummy-4",
    sku: "RES-FAN-004",
    title: "Replacement Remote for Havells Fans",
    category: "fan-remotes",
    brand: "Havells",
    images: ["/images/categories/ac-remotes.png"],
    price: 299,
    mrp: 499,
    discount: 40,
    specs: [{ key: "Setup", value: "Plug & Play" }],
    description: "Replacement remote for Havells BLDC ceiling fans.",
    in_stock: true,
    warranty: "30 days replacement",
    popular: false,
    compatible_brands: ["Havells"],
    compatible_models: ["Efficiencia"],
    tags: ["fan", "havells"],
  }
];

async function main() {
  console.log("Seeding 4 dummy fan remotes...");
  const { error } = await supabase.from("products").upsert(fanProducts, { onConflict: "id" });
  if (error) {
    console.error("Error inserting fan products:", error);
  } else {
    console.log("Successfully inserted fan products.");
  }
}

main().catch(console.error);
