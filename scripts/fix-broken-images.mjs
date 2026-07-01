import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wcppestkxqnoriurmkel.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjcHBlc3RreHFub3JpdXJta2VsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDA1NTEwMywiZXhwIjoyMDk1NjMxMTAzfQ.VtH___vQlTYrV1xcxh0hU2hxzwoS00VoKdzf92hrTPQ';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function main() {
  console.log("🚀 Finding broken Cloudinary URLs...");
  
  const { data: products, error } = await supabase.from('products').select('*');
  if (error) {
    console.error("Error fetching products", error);
    return;
  }

  let fixedCount = 0;

  for (const product of products) {
    if (product.images && product.images.length > 0) {
      // Check if the image contains the old broken 'resorb' cloudinary account
      const hasBrokenImage = product.images.some(img => img.includes('res.cloudinary.com/resorb'));
      
      if (hasBrokenImage) {
        // Clear the broken images so the frontend fallback logic works
        const { error: updateError } = await supabase
          .from('products')
          .update({ images: [] })
          .eq('id', product.id);

        if (updateError) {
          console.error(`Failed to update ${product.id}`, updateError);
        } else {
          fixedCount++;
        }
      }
    }
  }

  console.log(`✅ Fixed ${fixedCount} products with broken images.`);
}

main().catch(console.error);
