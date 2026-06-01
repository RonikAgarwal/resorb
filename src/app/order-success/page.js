"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const STAGES = {
  PROCESSING: 0,
  SUCCESS: 1,
  DETAILS: 2,
};

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");
  const rpayPid = searchParams.get("rpay_pid");
  const [stage, setStage] = useState(STAGES.PROCESSING);
  const [orderId, setOrderId] = useState(null);
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart when landing on the success page
    clearCart();

    // Stage 1: Show processing for 2.5s
    const t1 = setTimeout(() => setStage(STAGES.SUCCESS), 2500);
    // Stage 2: Show details after 4.5s
    const t2 = setTimeout(() => setStage(STAGES.DETAILS), 4500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [clearCart]);

  // Poll for the order ID once we have a Razorpay payment ID
  useEffect(() => {
    if (!rpayPid) return;
    let cancelled = false;

    async function fetchOrderId() {
      for (let attempt = 0; attempt < 10; attempt++) {
        try {
          const res = await fetch(`/api/orders/by-payment?rpay_pid=${rpayPid}`);
          const data = await res.json();
          if (data.success && data.orderId) {
            if (!cancelled) setOrderId(data.orderId);
            return;
          }
        } catch {}
        // Wait 1.5s before retrying
        await new Promise((r) => setTimeout(r, 1500));
      }
    }
    fetchOrderId();
    return () => { cancelled = true; };
  }, [rpayPid]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full max-w-md">

        {/* ── Stage 0: Processing Animation ── */}
        {stage === STAGES.PROCESSING && (
          <div className="text-center animate-fadeIn">
            {/* Pulsing card icon */}
            <div className="relative mx-auto w-28 h-28 mb-8">
              <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1C2E6B] to-[#2a47a0] rounded-2xl flex items-center justify-center shadow-xl animate-pulse">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
              </div>
            </div>

            <h1 className="text-xl font-bold text-gray-900 mb-2">Processing Payment...</h1>
            <p className="text-sm text-gray-500 mb-8">Please wait while we confirm your payment</p>

            {/* Loading dots */}
            <div className="flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#1C2E6B] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2.5 h-2.5 bg-[#1C2E6B] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2.5 h-2.5 bg-[#1C2E6B] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        {/* ── Stage 1: Success Checkmark ── */}
        {stage === STAGES.SUCCESS && (
          <div className="text-center animate-fadeIn">
            {/* Animated checkmark circle */}
            <div className="relative mx-auto w-32 h-32 mb-8">
              {/* Expanding ring */}
              <div className="absolute inset-0 rounded-full border-4 border-green-400 animate-expandRing" />
              {/* Inner circle with check */}
              <div className="absolute inset-2 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-200 animate-scaleIn">
                <svg className="w-14 h-14 text-white animate-drawCheck" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" className="check-path" />
                </svg>
              </div>
              {/* Celebration particles */}
              <div className="absolute -inset-4">
                {[...Array(8)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute w-2 h-2 rounded-full animate-particle"
                    style={{
                      background: ["#fbbf24", "#34d399", "#60a5fa", "#f472b6", "#a78bfa", "#fb923c", "#14C7B8", "#1C2E6B"][i],
                      top: "50%",
                      left: "50%",
                      animationDelay: `${i * 80}ms`,
                      "--angle": `${i * 45}deg`,
                    }}
                  />
                ))}
              </div>
            </div>

            <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Payment Successful!</h1>
            <p className="text-sm text-green-600 font-medium">Your order has been placed</p>
          </div>
        )}

        {/* ── Stage 2: Full Details Card ── */}
        {stage === STAGES.DETAILS && (
          <div className="animate-slideUp">
            {/* Success header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Payment Successful!</h1>
              <p className="text-sm text-gray-500">Thank you for shopping with RESORB</p>
            </div>

            {/* Order ID Card */}
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-6 mb-5 text-center animate-fadeIn" style={{ animationDelay: "200ms" }}>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">Your Order ID</p>
              <p className="text-3xl font-extrabold font-mono text-[#1C2E6B] tracking-wide mb-2">{orderId || "—"}</p>
              <p className="text-xs text-gray-500">Save this for tracking your order</p>
            </div>

            {/* WhatsApp notification note */}
            {phone && (
              <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-5 flex items-start gap-3 animate-fadeIn" style={{ animationDelay: "400ms" }}>
                <span className="text-lg mt-0.5">📲</span>
                <div>
                  <p className="text-sm font-semibold text-green-800 mb-0.5">WhatsApp Confirmation Sent</p>
                  <p className="text-xs text-green-700">
                    A confirmation message has been sent to <span className="font-mono font-bold">+91 {phone}</span> with your order details.
                  </p>
                </div>
              </div>
            )}

            {/* What happens next */}
            <div className="bg-gray-50 rounded-xl p-5 mb-5 animate-fadeIn" style={{ animationDelay: "600ms" }}>
              <p className="text-sm font-bold text-gray-800 mb-3">📦 What happens next?</p>
              <div className="space-y-3">
                {[
                  { icon: "✅", text: "Order confirmed & payment received", active: true },
                  { icon: "📦", text: "Packed and dispatched within 24 hours", active: false },
                  { icon: "🚚", text: "Tracking ID sent via WhatsApp", active: false },
                  { icon: "🎉", text: "Delivered in 3–5 business days", active: false },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className={`text-sm ${step.active ? "" : "opacity-40"}`}>{step.icon}</span>
                    <span className={`text-sm ${step.active ? "text-gray-900 font-medium" : "text-gray-400"}`}>{step.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 animate-fadeIn" style={{ animationDelay: "800ms" }}>
              <Link
                href="/track"
                className="w-full bg-[#1C2E6B] hover:bg-[#162352] text-white font-semibold py-3.5 rounded-xl transition-colors text-center text-sm shadow-md"
              >
                🔍 Track Your Order
              </Link>
              <Link
                href="/"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3.5 rounded-xl transition-colors text-center text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Custom keyframe animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes expandRing {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        @keyframes drawCheck {
          0% { stroke-dashoffset: 30; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes particle {
          0% { transform: translate(-50%, -50%) rotate(var(--angle)) translateX(0) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) rotate(var(--angle)) translateX(70px) scale(0); opacity: 0; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out both;
        }
        .animate-slideUp {
          animation: slideUp 0.7s ease-out both;
        }
        .animate-scaleIn {
          animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .animate-expandRing {
          animation: expandRing 1s ease-out infinite;
        }
        .animate-drawCheck {
          stroke-dasharray: 30;
          stroke-dashoffset: 30;
          animation: drawCheck 0.5s ease-out 0.3s both;
        }
        .animate-particle {
          animation: particle 0.8s ease-out both;
        }
      `}</style>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[85vh] flex items-center justify-center">Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
