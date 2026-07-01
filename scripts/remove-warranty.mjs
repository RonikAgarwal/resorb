import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wcppestkxqnoriurmkel.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjcHBlc3RreHFub3JpdXJta2VsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDA1NTEwMywiZXhwIjoyMDk1NjMxMTAzfQ.VtH___vQlTYrV1xcxh0hU2hxzwoS00VoKdzf92hrTPQ';
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function main() {
  console.log("Fetching all products...");
  const { data: products, error } = await supabase.from('products').select('*');
  if (error) {
    console.error("Error fetching products:", error);
    return;
  }

  let updatedCount = 0;
  for (const product of products) {
    let needsUpdate = false;
    let newPayload = {};

    // Remove warranty
    if (product.warranty) {
      newPayload.warranty = null;
      needsUpdate = true;
    }

    // Remove "Setup" from specs if it exists
    if (product.specs && Array.isArray(product.specs)) {
      const newSpecs = product.specs.filter(spec => spec.key !== "Setup");
      if (newSpecs.length !== product.specs.length) {
        newPayload.specs = newSpecs;
        needsUpdate = true;
      }
    }

    if (needsUpdate) {
      const { error: updateError } = await supabase.from('products').update(newPayload).eq('id', product.id);
      if (updateError) {
        console.error(`Error updating product ${product.id}:`, updateError);
      } else {
        updatedCount++;
      }
    }
  }
  
  console.log(`Successfully updated ${updatedCount} products.`);
}

main().catch(console.error);
