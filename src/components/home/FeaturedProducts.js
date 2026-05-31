import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { ChevronRightIcon } from "@/components/icons";

export default function FeaturedProducts({ products }) {
  return (
    <section className="-mt-1 pb-8 pt-6" aria-labelledby="featured-products-heading">
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <h2 id="featured-products-heading" className="text-2xl font-bold" style={{ color: "#1C2E6B" }}>
            Featured Products
          </h2>
          <p className="text-sm text-gray-500 mt-1">Popular compatible replacement remotes customers buy often</p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 hover:border-[#009B9B] hover:text-[#1C2E6B] transition-colors whitespace-nowrap"
        >
          View all products
          <ChevronRightIcon className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
