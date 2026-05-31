'use client';

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function AddToCartButton({ product }) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);
  const router = useRouter();

  const isInCart = items.some((i) => i.id === product.id);

  useEffect(() => {
    if (isInCart && added) {
      const t = setTimeout(() => setAdded(false), 2000);
      return () => clearTimeout(t);
    }
  }, [isInCart, added]);

  function handleAdd() {
    addItem(product);
    setAdded(true);
  }

  function handleBuyNow() {
    if (!isInCart) {
      addItem(product);
    }
    router.push("/checkout");
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <button
        onClick={handleAdd}
        disabled={!product.inStock}
        className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all ${
          !product.inStock
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : added
            ? "bg-green-500 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
        aria-label={`Add ${product.name} to cart`}
      >
        {!product.inStock
          ? "Out of Stock"
          : added
          ? "✓ Added to Cart"
          : "Add to Cart"}
      </button>

      {product.inStock && (
        <button
          onClick={handleBuyNow}
          className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm bg-gray-900 hover:bg-black text-white transition-colors text-center"
        >
          Buy Now
        </button>
      )}
    </div>
  );
}
