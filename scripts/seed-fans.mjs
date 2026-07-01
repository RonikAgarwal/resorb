import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wcppestkxqnoriurmkel.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjcHBlc3RreHFub3JpdXJta2VsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDA1NTEwMywiZXhwIjoyMDk1NjMxMTAzfQ.VtH___vQlTYrV1xcxh0hU2hxzwoS00VoKdzf92hrTPQ';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

function calculateDiscount(mrp, price) {
  return Math.round(((mrp - price) / mrp) * 100);
}

const fanProducts = [
  {
    id: "fan-rfn1",
    sku: "RFN 1",
    title: "RESORB RFN1 Remote Control Compatible with Crompton, BPL, V-GUARD, Energion Stylus & Crompton SilentPro Enso 1200mm (48 inch) BLDC Ceiling Fan Model DR-300",
    category: "fan-remotes",
    brand: "Crompton",
    images: ["/images/categories/fan-remotes.png"],
    price: 689,
    mrp: 999,
    discount: calculateDiscount(999, 689),
    warranty: "",
    specs: [
      { key: "Material", value: "ABS PLASTIC" },
      { key: "Battery", value: "AAA" },
      { key: "Color", value: "White" }
    ],
    description: "Wide Compatibility - Compatible with Crompton, BPL, V-GUARD, Energion Stylus & SilentPro Enso 1200mm (48 inch) BLDC Ceiling Fans.",
    in_stock: true,
    popular: false,
    compatible_brands: ["Crompton", "BPL", "V-GUARD"],
    compatible_models: ["Energion Stylus", "SilentPro Enso"],
    tags: ["fan", "crompton", "bpl", "v-guard", "dr-300"],
  },
  {
    id: "fan-fn2",
    sku: "FN -2",
    title: "RESORB FN 2 Compatible for Atomberg renesa Fan Remote Control DR-251 | Remote for V2 Series BLDC Ceiling Fans | Easy Pairing",
    category: "fan-remotes",
    brand: "Atomberg",
    images: ["/images/categories/fan-remotes.png"],
    price: 589,
    mrp: 999,
    discount: calculateDiscount(999, 589),
    warranty: "",
    specs: [
      { key: "Material", value: "ABS PLASTIC" },
      { key: "Battery", value: "AAA" },
      { key: "Color", value: "White" }
    ],
    description: "Perfect Compatibility: Designed for Atomberg BLDC ceiling fans, compatible with V2 series models. Ensure your old remote matches DR-251 design before purchase.",
    in_stock: true,
    popular: true,
    compatible_brands: ["Atomberg"],
    compatible_models: ["Renesa", "V2 Series", "DR-251"],
    tags: ["fan", "atomberg", "renesa", "dr-251"],
  },
  {
    id: "fan-fn3",
    sku: "FN-3",
    title: "Resorb® FN 3 Orient Fan Remote Control Replacement | Compatible with EcoTech Supreme, Falcon, I-Tome, Hector Deco Models",
    category: "fan-remotes",
    brand: "Orient",
    images: ["/images/categories/fan-remotes.png"],
    price: 589,
    mrp: 999,
    discount: calculateDiscount(999, 589),
    warranty: "30 days replacement",
    specs: [
      { key: "Setup", value: "Match Old Remote" },
      { key: "Material", value: "ABS PLASTIC" },
      { key: "Battery", value: "AAA" },
      { key: "Color", value: "White" }
    ],
    description: "Compatible Remote for Orient Electric Fans - Supports EcoTech Supreme, Falcon, I-Tome & Hector Deco models.",
    in_stock: true,
    popular: true,
    compatible_brands: ["Orient"],
    compatible_models: ["EcoTech Supreme", "Falcon", "I-Tome", "Hector Deco"],
    tags: ["fan", "orient", "ecotech", "falcon", "i-tome"],
  },
  {
    id: "fan-fn4",
    sku: "FN 4",
    title: "RESORB Compatible Fan Remote Control for Orient Electric Ceiling Fan with Light & Speed Control, LED Display, IR Replacement Remote",
    category: "fan-remotes",
    brand: "Orient",
    images: ["/images/categories/fan-remotes.png"],
    price: 389,
    mrp: 999,
    discount: calculateDiscount(999, 389),
    warranty: "",
    specs: [
      { key: "Material", value: "ABS PLASTIC" },
      { key: "Battery", value: "AAA" },
      { key: "Color", value: "White" }
    ],
    description: "Compatible Remote for Orient Electric Ceiling Fan with Light & Speed Control, LED Display.",
    in_stock: true,
    warranty: "30 days replacement",
    popular: false,
    compatible_brands: ["Orient"],
    compatible_models: ["Ceiling Fan with Light"],
    tags: ["fan", "orient", "led display"],
  },
  {
    id: "fan-fn5",
    sku: "FN 5",
    title: "RESORB Compatible with Havells BLDC Ceiling Fan Light, Timer, Colour & Speed Control, IR Replacement Remote",
    category: "fan-remotes",
    brand: "Havells",
    images: ["/images/categories/fan-remotes.png"],
    price: 489,
    mrp: 999,
    discount: calculateDiscount(999, 489),
    specs: [
      { key: "Setup", value: "Plug & Play" },
      { key: "Material", value: "ABS PLASTIC" },
      { key: "Battery", value: "AAA" },
      { key: "Color", value: "Black" }
    ],
    description: "Compatible Remote for Havells BLDC Ceiling Fan Light, Timer, Colour & Speed Control.",
    in_stock: true,
    warranty: "30 days replacement",
    popular: true,
    compatible_brands: ["Havells"],
    compatible_models: ["BLDC Ceiling Fan"],
    tags: ["fan", "havells", "bldc", "light control"],
  },
  {
    id: "fan-fn6",
    sku: "FN 6",
    title: "RESORB Compatible for Crompton ENERGION CROMAIR BLDC Ceiling Fan Sleep Mode, IR Replacement Remote",
    category: "fan-remotes",
    brand: "Crompton",
    images: ["/images/categories/fan-remotes.png"],
    price: 449,
    mrp: 999,
    discount: calculateDiscount(999, 449),
    specs: [
      { key: "Setup", value: "Plug & Play" },
      { key: "Material", value: "ABS PLASTIC" },
      { key: "Battery", value: "AAA" },
      { key: "Color", value: "Black" }
    ],
    description: "Compatible Remote for Crompton ENERGION CROMAIR BLDC Ceiling Fan Sleep Mode.",
    in_stock: true,
    warranty: "30 days replacement",
    popular: false,
    compatible_brands: ["Crompton"],
    compatible_models: ["Energion Cromair"],
    tags: ["fan", "crompton", "energion", "cromair"],
  }
];

async function main() {
  console.log("Seeding 6 fan remotes from data sheet...");
  const { error } = await supabase.from("products").upsert(fanProducts, { onConflict: "id" });
  if (error) {
    console.error("Error inserting fan products:", error);
  } else {
    console.log("Successfully inserted fan products.");
  }
}

main().catch(console.error);
