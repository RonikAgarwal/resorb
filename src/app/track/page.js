'use client';

import { useState } from "react";



export default function TrackPage() {
  const [input, setInput] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleTrack(e) {
    e.preventDefault();
    setError("");
    setOrder(null);
    if (!input.trim() || !phone.trim()) {
      setError("Please enter both Order ID and Phone Number");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/orders/${input.trim().toUpperCase()}?phone=${encodeURIComponent(phone.trim())}`);
      const data = await res.json();

      if (res.ok && data.order) {
        setOrder(data.order);
      } else {
        setError(data.error || "No order found. Try WhatsApp for help.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Track Your Order</h1>
      <p className="text-sm text-gray-500 mb-8">Enter your Order ID (e.g., ORD123456) to check status.</p>

      {/* Search */}
      <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Order ID (e.g. RES123456)"
          className="flex-1 border-2 border-gray-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
          aria-label="Order ID"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
          className="flex-1 border-2 border-gray-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
          aria-label="Phone number"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm sm:w-auto w-full"
        >
          {loading ? "..." : "Track"}
        </button>
      </form>

      {/* Demo helper removed */}

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
          <p className="text-sm text-red-600">{error}</p>
          <a
            href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20tracking%20my%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-green-600 font-medium mt-2 inline-block"
          >
            💬 WhatsApp us for help
          </a>
        </div>
      )}

      {order && (
        <div className="space-y-5">
          {/* Status card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Order ID</p>
                <p className="font-mono font-semibold text-gray-900">{order.id}</p>
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${order.status === "DELIVERED" ? "bg-green-100 text-green-700" :
                order.status === "PICKED_UP" ? "bg-blue-100 text-blue-700" :
                  "bg-amber-100 text-amber-700"
                }`}>
                {order.status.replace("_", " ")}
              </span>
            </div>

            {order.trackingId && (
              <div className="bg-gray-50 rounded-xl p-3 text-sm mb-4">
                <p className="text-xs text-gray-400 mb-0.5">Tracking ID ({order.courier})</p>
                <p className="font-mono font-medium text-gray-800">{order.trackingId}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Estimated Delivery: {new Date(new Date(order.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
            )}

            {/* Timeline */}
            <div className="space-y-3 mt-4">
              {order.timeline.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${step.done ? "bg-green-500" : "bg-gray-200"
                    }`}>
                    {step.done ? (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    )}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${step.done ? "text-gray-900" : "text-gray-400"}`}>
                      {step.status}
                    </p>
                    <p className="text-xs text-gray-400">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Items */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-semibold text-gray-900 mb-3 text-sm">Items in this order</h2>
            {order.items.map((item) => {
              const qty = item.quantity || item.qty || 1;
              return (
                <div key={item.sku} className="flex justify-between text-sm text-gray-700">
                  <span>{item.name} × {qty}</span>
                  <span className="font-medium">₹{(item.price * qty).toLocaleString("en-IN")}</span>
                </div>
              );
            })}
            <p className="text-xs text-gray-400 mt-3">Delivery to: {order.address}</p>
          </div>
        </div>
      )}

      {/* WhatsApp fallback */}
      {!order && !error && (
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 mt-4">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Can&apos;t find your order? </strong>  WhatsApp us with your phone number and we&apos;ll fetch the details for you.
          </p>
          <a
            href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20tracking%20my%20order.%20My%20number%20is%3A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp us to track
          </a>
        </div>
      )}
    </div>
  );
}
