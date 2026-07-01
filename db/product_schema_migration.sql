-- ═══════════════════════════════════════════════════
-- RESORB Product Schema Migration
-- Run in Supabase SQL Editor
-- ═══════════════════════════════════════════════════

-- New structured fields for the redesigned product upload flow
ALTER TABLE products ADD COLUMN IF NOT EXISTS item_name TEXT DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS model_name TEXT DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS model_family TEXT[] DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS compatibility TEXT DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS quality TEXT DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS quality_assurance TEXT DEFAULT 'Every remote is tested before dispatch before shipping.';
ALTER TABLE products ADD COLUMN IF NOT EXISTS disclaimer TEXT DEFAULT 'Please match your existing remote with the product image before placing an order.';
ALTER TABLE products ADD COLUMN IF NOT EXISTS safety_information TEXT DEFAULT 'Remove batteries when not in use for extended periods. Avoid exposure to heat and moisture.';
ALTER TABLE products ADD COLUMN IF NOT EXISTS pairing_required BOOLEAN DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS pairing_instructions TEXT DEFAULT '';

-- Backfill item_name from title for existing products
UPDATE products SET item_name = title WHERE item_name = '' OR item_name IS NULL;
