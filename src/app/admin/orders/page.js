"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STATUS_COLORS = {
  DELIVERED: "bg-green-100 text-green-700",
  PICKED_UP: "bg-blue-100 text-blue-700",
  ORDER_CONFIRMED: "bg-amber-100 text-amber-700",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shippingId, setShippingId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      setOrders(data.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateShipment(id) {
    setShippingId(id);
    try {
      const res = await fetch(`/api/admin/orders/${id}/shipment`, {
        method: "POST"
      });
      const data = await res.json();
      if (data.order) {
        setOrders(orders.map(o => o.id === id ? data.order : o));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setShippingId(null);
    }
  }

  if (loading) return <div className="p-8 text-center text-gray-500">Loading orders...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage shipments and view tracking.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left border-b border-gray-100">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500">Order ID & Date</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500">Customer</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 hidden md:table-cell">Product Details</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500">Total Amount</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <p className="font-mono text-sm font-bold text-gray-900">{order.id}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                    <p className="text-xs text-gray-500 mt-0.5">+91 {order.phone}</p>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell max-w-[200px]">
                    <div className="space-y-1">
                      {order.items.map((item, i) => (
                        <p key={i} className="text-xs text-gray-600 truncate" title={item.name}>
                          {item.quantity || item.qty || 1}x {item.name}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm font-bold text-gray-900">₹{order.total}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full ${STATUS_COLORS[order.status] || "bg-gray-100 text-gray-600"}`}>
                      {order.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {order.status === "ORDER_CONFIRMED" ? (
                      <button
                        onClick={() => handleCreateShipment(order.id)}
                        disabled={shippingId === order.id}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex items-center justify-center min-w-[140px]"
                      >
                        {shippingId === order.id ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Creating...
                          </span>
                        ) : "Create Shipment"}
                      </button>
                    ) : (
                      <div className="text-xs text-gray-600 min-w-[140px]">
                        <p className="font-semibold">{order.courier}</p>
                        <p className="font-mono text-gray-500">{order.trackingId}</p>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                    No orders found. Try placing an order in the store!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
