import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import MobileProductCard from "@/components/product/MobileProductCard";
import { ChevronRightIcon } from "@/components/icons";

export default function FeaturedProducts({ products }) {
  return (
    <section className="-mt-1 pb-5 pt-4 lg:pb-8 lg:pt-6" aria-labelledby="featured-products-heading">
      <div className="mb-4 flex items-center justify-between gap-4 lg:mb-5">
        <div>
          <h2 id="featured-products-heading" className="text-xl font-bold lg:text-2xl" style={{ color: "#1C2E6B" }}>
            Featured Products
          </h2>
          <p className="mt-1 hidden text-sm text-gray-500 lg:block">
            Popular compatible replacement remotes customers buy often
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#1C2E6B] transition-colors hover:text-[#009B9B] lg:rounded-lg lg:border lg:border-gray-200 lg:px-3 lg:py-2 lg:text-gray-600 lg:hover:border-[#009B9B] lg:hover:text-[#1C2E6B] whitespace-nowrap"
        >
          View All
          <ChevronRightIcon className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Mobile — continuous horizontal scroll */}
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar lg:hidden">
        {products.map((product) => (
          <MobileProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Desktop grid — unchanged */}
      <div className="hidden grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid lg:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
