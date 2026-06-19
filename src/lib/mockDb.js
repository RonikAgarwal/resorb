import fs from 'fs';
import path from 'path';

// For Next.js API routes, process.cwd() points to the project root
const DB_PATH = path.join(process.cwd(), 'src', 'data', 'orders.json');

// Initialize with some mock data if empty
const INITIAL_DATA = [
  { 
    id: "ORD123456", 
    customerName: "Rahul Sharma", 
    phone: "7011779887", 
    email: "rahul@example.com",
    address: "C-12, Sector 15",
    city: "Noida",
    state: "Uttar Pradesh",
    pincode: "201301",
    items: [{ name: "RESORB LED 650", sku: "RESORB-LED-650", qty: 1, price: 249 }], 
    subtotal: 249,
    shipping: 60,
    total: 309, 
    status: "ORDER_CONFIRMED", 
    createdAt: new Date().toISOString()
  }
];

export function getOrders() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(INITIAL_DATA, null, 2));
      return INITIAL_DATA;
    }
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading orders:", error);
    return [];
  }
}

export function saveOrders(orders) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(orders, null, 2));
    return true;
  } catch (error) {
    console.error("Error saving orders:", error);
    return false;
  }
}

export function getOrderById(id) {
  const orders = getOrders();
  return orders.find(o => o.id === id);
}

export function createOrder(orderData) {
  const orders = getOrders();
  const newOrder = {
    ...orderData,
    id: "RES" + Math.floor(100000 + Math.random() * 900000), // Random 6 digit
    status: "ORDER_CONFIRMED",
    createdAt: new Date().toISOString()
  };
  orders.unshift(newOrder); // Add to top
  saveOrders(orders);
  return newOrder;
}

export function updateOrderStatus(id, updates) {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index !== -1) {
    orders[index] = { ...orders[index], ...updates, updatedAt: new Date().toISOString() };
    saveOrders(orders);
    return orders[index];
  }
  return null;
}
