/**
 * RESORB Orders Service
 *
 * API call abstractions for order operations.
 * Centralizes fetch calls so components don't hardcode URLs.
 */

/**
 * Create a new order via the API.
 */
export async function createOrder(orderData) {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  return res.json();
}

/**
 * Fetch a single order by ID.
 */
export async function fetchOrder(orderId) {
  const res = await fetch(`/api/orders/${orderId}`);
  return res.json();
}
