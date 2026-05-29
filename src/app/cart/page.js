'use client';

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, totalItems, totalPrice, totalOriginalPrice, totalDiscount, removeItem, updateQty } = useCart();
  const router = useRouter();

  const shipping = totalPrice >= 499 ? 0 : 60;
  const grandTotal = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-sm text-gray-500 mb-6">Browse our catalog to find the right remote for your device.</p>
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Browse Remotes
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold text-gray-900 mb-6">
        Cart ({totalItems} item{totalItems !== 1 ? "s" : ""})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4"
            >
              {/* Image placeholder */}
              <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 text-3xl opacity-30 select-none">
                📺
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="sku-text mb-0.5">{item.name}</p>
                <p className="text-sm font-medium text-gray-900 leading-snug line-clamp-2 mb-1">
                  {item.title}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  {/* Qty control */}
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-sm font-bold"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-sm font-bold"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-red-500 hover:text-red-700 transition-colors"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                {item.originalPrice > item.price && (
                  <p className="text-xs text-gray-400 line-through">
                    ₹{(item.originalPrice * item.quantity).toLocaleString("en-IN")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-28">
            <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{totalOriginalPrice.toLocaleString("en-IN")}</span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>−₹{totalDiscount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-600">FREE</span> : `₹${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-400">
                  Add ₹{(499 - totalPrice).toLocaleString("en-IN")} more for free shipping
                </p>
              )}
            </div>

            <div className="border-t border-gray-100 pt-3 mb-5">
              <div className="flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">Inclusive of all taxes</p>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors mb-3"
            >
              Proceed to Checkout
            </button>

            <p className="text-xs text-center text-gray-400">
              🔒 Secure checkout via Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
