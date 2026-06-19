const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function main() {
  const dummyFans = [
    {
      id: crypto.randomUUID(),
      title: "Atomberg BLDC Fan Remote",
      sku: "AT-FAN-01",
      description: "Compatible with Atomberg Renesa and Efficio BLDC fans.",
      price: 349,
      mrp: 499,
      images: ["/images/categories/fan-remotes.png"],
      category: "fan-remotes",
      brand: "Atomberg",
      compatible_brands: ["Atomberg"],
      compatible_models: ["Renesa", "Efficio"],
      tags: ["bldc", "fan", "atomberg"],
      in_stock: true,
      popular: true,
      status: "active"
    },
    {
      id: crypto.randomUUID(),
      title: "Crompton SilentPro Remote",
      sku: "CR-FAN-02",
      description: "Replacement remote for Crompton SilentPro Enso fans.",
      price: 299,
      mrp: 399,
      images: ["/images/categories/fan-remotes.png"],
      category: "fan-remotes",
      brand: "Crompton",
      compatible_brands: ["Crompton"],
      compatible_models: ["SilentPro", "Enso"],
      tags: ["fan", "crompton"],
      in_stock: true,
      popular: false,
      status: "active"
    },
    {
      id: crypto.randomUUID(),
      title: "Orient Aeroslim Fan Remote",
      sku: "OR-FAN-03",
      description: "Compatible remote for Orient Aeroslim IoT smart fans.",
      price: 399,
      mrp: 599,
      images: ["/images/categories/fan-remotes.png"],
      category: "fan-remotes",
      brand: "Orient",
      compatible_brands: ["Orient"],
      compatible_models: ["Aeroslim"],
      tags: ["smart fan", "orient", "iot"],
      in_stock: true,
      popular: true,
      status: "active"
    },
    {
      id: crypto.randomUUID(),
      title: "Havells Stealth Air Remote",
      sku: "HA-FAN-04",
      description: "Replacement remote for Havells Stealth Air ceiling fans.",
      price: 299,
      mrp: 499,
      images: ["/images/categories/fan-remotes.png"],
      category: "fan-remotes",
      brand: "Havells",
      compatible_brands: ["Havells"],
      compatible_models: ["Stealth Air"],
      tags: ["fan", "havells"],
      in_stock: true,
      popular: false,
      status: "active"
    }
  ];

  const { data, error } = await supabase.from('products').insert(dummyFans).select();
  if (error) {
    console.error("Error inserting:", error);
  } else {
    console.log("Successfully inserted", data.length, "dummy fan remotes!");
  }
}

main();
