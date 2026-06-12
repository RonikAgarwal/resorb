'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const CATEGORY_IMAGES = {
  "tv-remotes": "/images/remotes/tv.png",
  "ac-remotes": "/images/remotes/ac.png",
  "set-top-box-remotes": "/images/remotes/stb.png",
  "speaker-remotes": "/images/remotes/speaker.png",
  "streaming-remotes": "/images/remotes/streaming.png",
  "projector-remotes": "/images/remotes/projector.png",
  "universal-remotes": "/images/remotes/universal.png",
};

const CATEGORY_LABELS = {
  "tv-remotes": "Smart TV Remote",
  "ac-remotes": "AC Remote",
  "set-top-box-remotes": "Set-Top Box Remote",
  "speaker-remotes": "Home Theatre Remote",
  "streaming-remotes": "Streaming Remote",
  "projector-remotes": "Projector Remote",
  "universal-remotes": "Universal Remote",
};

export default function CategoryProductCard({ product, index = 0 }) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);

  const id = product.id;
  const price = product.price;
  const originalPrice = product.mrp || product.originalPrice || price;
  const discount = product.discount || 0;
  const inStock = product.in_stock !== undefined ? product.in_stock : product.inStock;
  const category = product.category;
  const popular = product.popular;
  const compatibleBrands = product.compatible_brands || product.compatibleBrands || [];

  const hasProductImages = product.images && product.images.length > 0 && product.images[0].startsWith("http");
  const imgSrc = hasProductImages
    ? product.images[0]
    : CATEGORY_IMAGES[category] || "/images/remotes/tv.png";
  const isExternal = imgSrc.startsWith("http");

  const primaryBrand = compatibleBrands[0] || product.brand || "RESORB";
  const categoryLabel = CATEGORY_LABELS[category] || "Replacement Remote";
  const productTitle = `${primaryBrand} ${categoryLabel}`;
  const compatibilityText =
    compatibleBrands.length > 1
      ? `Compatible with multiple ${primaryBrand} models`
      : `Compatible with ${primaryBrand} models`;

  const isInCart = items.some((i) => i.id === id);

  useEffect(() => {
    if (added) {
      const t = setTimeout(() => setAdded(false), 1500);
      return () => clearTimeout(t);
    }
  }, [added]);

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock) return;
    addItem(product);
    setAdded(true);
  }

  // Stagger animation delay based on card index
  const animDelay = `${Math.min(index * 60, 600)}ms`;

  return (
    <Link
      href={`/product/${id}`}
      className="cat-card cat-card-animated"
      style={{ animationDelay: animDelay }}
      aria-label={`${productTitle} — ₹${price}`}
    >
      {/* ── Image Area ── */}
      <div className="cat-card-image-wrap">
        {/* Badges */}
        <div className="cat-card-badges">
          {discount > 0 && (
            <span className="cat-badge-discount">{discount}% OFF</span>
          )}
          {popular && (
            <span className="cat-badge-bestseller">BEST SELLER</span>
          )}
        </div>

        {/* Product Image */}
        <div className="cat-card-image-inner">
          {isExternal ? (
            <img
              src={imgSrc}
              alt={productTitle}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          ) : (
            <Image
              src={imgSrc}
              alt={productTitle}
              fill
              sizes="100px"
              style={{ objectFit: "contain" }}
            />
          )}
        </div>

        {/* Out of Stock */}
        {!inStock && (
          <div className="cat-card-oos-overlay">
            <span className="cat-card-oos-label">Out of Stock</span>
          </div>
        )}
      </div>

      {/* ── Info Area ── */}
      <div className="cat-card-info">
        <span className="cat-card-brand">{primaryBrand}</span>
        <p className="cat-card-title">{productTitle}</p>
        <p className="cat-card-compat">{compatibilityText}</p>

        {/* Price */}
        <div className="cat-card-price-row">
          <span className="cat-card-price">₹{price.toLocaleString("en-IN")}</span>
          {originalPrice > price && (
            <span className="cat-card-mrp">₹{originalPrice.toLocaleString("en-IN")}</span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          className={`cat-card-cta ${
            !inStock
              ? "cat-card-cta-disabled"
              : added
              ? "cat-card-cta-added"
              : ""
          }`}
          onClick={handleAddToCart}
          disabled={!inStock}
        >
          {!inStock ? (
            "Out of Stock"
          ) : added ? (
            "✓ Added"
          ) : (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
              </svg>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </Link>
  );
}
