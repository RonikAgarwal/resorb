/**
 * RESORB Utility Functions
 *
 * Pure utility functions used across the app.
 * Keep these stateless and side-effect free.
 */

/**
 * Format a price in Indian Rupees (e.g., 1,249).
 */
export function formatPrice(amount) {
  return amount.toLocaleString("en-IN");
}

/**
 * Format a price as a display string (e.g., "₹1,249").
 */
export function formatPriceDisplay(amount) {
  return `₹${formatPrice(amount)}`;
}

/**
 * Calculate discount percentage from original and sale price.
 */
export function calculateDiscount(originalPrice, salePrice) {
  if (!originalPrice || originalPrice <= salePrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}
