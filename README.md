# 📺 RESORB — India's Trusted Replacement Remote Control Store

RESORB is a modern, premium e-commerce platform built using **Next.js** and **Tailwind CSS**, designed specifically for finding and purchasing compatible replacement remote controls for TVs, ACs, Set-Top Boxes, Projectors, and Streaming Services across India.

Currently, the project functions as a **high-fidelity interactive demo**, backed by a local JSON database engine for seamless testing of complex flows—including customer checkout, 3-stage animated payment success, real-time order tracking, and an admin command center.

---

## ✨ Key Features Built & Ready

### 📱 1. Premium & Responsive Storefront
*   **Aesthetics First**: Vibrant, dark-mode-infused hero sections, glassmorphism elements, clean layout typography, and subtle micro-animations.
*   **Intuitive Browsing**: Category filtering (AC, LED TV, Home Theatre, Projector, Set-Top Box) and quick-search shortcuts.
*   **Search/Finder**: Real-time search engine to locate remotes by model number, remote code, or brand.

### 🛒 2. Dynamic Shopping Cart & Checkout
*   **Real-Time State**: React Context-driven cart drawer supporting seamless quantity adjustments, shipping calculation (free over ₹499), and order subtotals.
*   **Validated Checkout**: Secure checkout form covering customer name, mobile number, email, address, city, state, and pincode.

### 💳 3. Immersive Payment & Success Experience
*   **Simulated Gateway**: Smooth, asynchronous processing state on "Pay Securely".
*   **3-Stage Premium Success Animation**:
    1. ⏳ *Verifying Payment Details...*
    2. ⚙️ *Confirming Order...*
    3. 🎉 *Generating Order Details!*
*   **Order Receipt**: Clear display of the new order ID, purchase summary, and shipping information.

### 📦 4. Real-Time Order Tracking (`/track`)
*   **Interactive Timeline**: Customers can enter their unique order ID (e.g., `RES123456`) or search using their registered phone number.
*   **Dynamic Statuses**: Visual tracking steps mapping out order stages from `ORDER_CONFIRMED` to `PICKED_UP` and `DELIVERED`.

### 🛡️ 5. Admin Command Center (`/admin`)
*   **Secure Authentication**: Secure admin login and session management.
*   **Live Dashboard Stats**: Computes revenue, total orders count, pending shipments, and recent activity in real time.
*   **Order Management**: Full list of customer orders with status filters (Pending, Confirmed, Shipped, Delivered).
*   **Simulated "Create Shipment" integration**:
    *   Generates a fake shipment ID (e.g., `SHIP100200`) and tracking code (e.g., `TRK300400`).
    *   Assigns a courier (Delhivery, BlueDart, DTDC, or Ekart).
    *   Saves updates immediately to the database and promotes status to `PICKED_UP`.

---

## 🛠️ Tech Stack & Architecture

*   **Framework**: Next.js 16+ (App Router)
*   **Library**: React 19
*   **Styling**: Tailwind CSS v4
*   **Mock Database**: Node.js file-system (`fs`) based JSON store (`src/data/orders.json`), providing reliable local persistence that acts identically to a real production database.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) (v18+ recommended) installed.

### Installation
1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/RonikAgarwal/resorb.git
   cd resorb/resorb-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to [http://localhost:3000](http://localhost:3000) to view the storefront!

---

## 🗺️ Project Structure Highlights

```
resorb-app/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── admin/                # Admin Panel (Dashboard & Orders management)
│   │   ├── api/                  # REST APIs (Orders creation, tracking, admin auth)
│   │   ├── cart/                 # Cart page & details
│   │   ├── checkout/             # Payment processing & shipping form
│   │   ├── order-success/        # Premium success animation and receipts
│   │   ├── track/                # Order tracking timeline
│   │   └── page.js               # Landing store page
│   ├── components/               # Shareable React components (Navbar, Cards, etc.)
│   ├── context/                  # Global Cart Context & state
│   ├── data/                     # Product catalog and dynamic JSON order DB
│   └── lib/
│       └── mockDb.js             # Local persistence logic (gets/saves/updates orders)
└── package.json
```

---

## ⚡ Production Blueprint (Supabase & Twilio Integration)

For a fully automated production deployment, the backend will transition from the local mock DB to:
1. **Supabase PostgreSQL Database**: Storing persistent, queryable order, shipment, and customer records.
2. **Twilio WhatsApp Business API**: Triggering instant automated notifications to the customer's WhatsApp:
   *   *Order Confirmation Message* (immediately upon checkout, including order summaries).
   *   *Shipment Pickup Notification* (sent when the admin clicks "Create Shipment", sharing tracking links and courier details).

### Environment Setup (`.env.local`)
To transition, configure the following variables inside your local environment:
```env
# Supabase Integration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Twilio WhatsApp Setup
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
```

---

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request with any improvements or feature additions.

Developed with ❤️ for RESORB.
