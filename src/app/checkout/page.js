"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry",
];

export default function CheckoutPage() {
  const { items, totalPrice, totalDiscount } = useCart();
  const router = useRouter();

  const shipping = totalPrice >= 499 ? 0 : 60;
  const grandTotal = totalPrice + shipping;

  const [form, setForm] = useState({
    name: "", phone: "", email: "", address: "",
    city: "", state: "", pincode: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const cartIsEmpty = items.length === 0;

  useEffect(() => {
    if (cartIsEmpty) router.replace("/cart");
    
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [cartIsEmpty, router]);

  if (cartIsEmpty) return null;

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Enter a valid 10-digit Indian mobile number";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.state) e.state = "State is required";
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Enter a valid 6-digit PIN code";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    try {
      // 1. Create a Razorpay order on the backend
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: grandTotal }),
      });
      const data = await res.json();
      
      if (!data.success) {
        alert("Failed to initiate payment. Please try again.");
        setLoading(false);
        return;
      }

      // 2. Initialize Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_SvqZL7l37Kz4JU",
        amount: data.order.amount,
        currency: "INR",
        name: "RESORB",
        description: "Replacement Remote Order",
        order_id: data.order.id,
        handler: async function (response) {
          try {
            // 3. Confirm payment and create order in our database
            const confirmRes = await fetch("/api/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...form,
                items,
                subtotal: totalPrice,
                shipping,
                total: grandTotal,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            
            const confirmData = await confirmRes.json();
            
            if (confirmData.success) {
              router.push(`/order-success?id=${confirmData.orderId}&phone=${form.phone}`);
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            console.error(err);
            alert("Error confirming order. Please contact support.");
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: "#2563EB", // blue-600
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      
      // Stop loading once modal is open
      setLoading(false);
      
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
      setLoading(false);
    }
  }

  function field(key, label, type = "text", opts = {}) {
    return (
      <div>
        <label htmlFor={`checkout-${key}`} className="block text-xs font-medium text-gray-700 mb-1">
          {label} {!opts.optional && <span className="text-red-500">*</span>}
        </label>
        <input
          id={`checkout-${key}`}
          type={type}
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          placeholder={opts.placeholder || ""}
          className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors ${
            errors[key] ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
          }`}
        />
        {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Delivery form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Contact Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {field("name", "Full Name", "text", { placeholder: "As on ID" })}
                {field("phone", "Mobile Number", "tel", { placeholder: "10-digit number" })}
                {field("email", "Email", "email", { placeholder: "Optional", optional: true })}
              </div>
            </div>

            {/* Address */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Delivery Address</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="checkout-address" className="block text-xs font-medium text-gray-700 mb-1">
                    Full Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="checkout-address"
                    value={form.address}
                    onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                    placeholder="House/Flat number, Street, Area"
                    rows={2}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none resize-none transition-colors ${
                      errors.address ? "border-red-400" : "border-gray-200 focus:border-blue-500"
                    }`}
                  />
                  {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {field("city", "City", "text", { placeholder: "Mumbai" })}
                  {field("pincode", "PIN Code", "text", { placeholder: "400001" })}
                </div>
                <div>
                  <label htmlFor="checkout-state" className="block text-xs font-medium text-gray-700 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="checkout-state"
                    value={form.state}
                    onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors bg-white ${
                      errors.state ? "border-red-400" : "border-gray-200 focus:border-blue-500"
                    }`}
                  >
                    <option value="">Select State</option>
                    {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Payment Method</h2>
              <div className="flex items-center gap-3 p-3 rounded-xl border border-blue-500 bg-blue-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="razorpay"
                  checked
                  readOnly
                  className="accent-blue-600"
                />
                <span className="text-xl">💳</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">Online Payment</p>
                  <p className="text-xs text-gray-500">UPI, Cards, and Net Banking via Razorpay. Prepaid orders only.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary sidebar */}
          <div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-28">
              <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs text-gray-600">
                    <span className="flex-1 truncate pr-2">{item.name} × {item.quantity}</span>
                    <span className="font-medium">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-3 space-y-1.5 text-sm mb-4">
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-green-600 text-xs">
                    <span>Savings</span>
                    <span>−₹{totalDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-600">FREE</span> : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 border-t border-gray-100 pt-2 mt-1">
                  <span>Total</span>
                  <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    🔒 Pay Securely
                  </>
                )}
              </button>

              <p className="text-xs text-center text-gray-400 mt-2">
                Estimated delivery: 3–5 business days
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
