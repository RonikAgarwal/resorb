import { Suspense } from "react";
import { searchProducts } from "@/lib/products";
import { getCategoryBySlug } from "@/data/categories";
import { getBrandBySlug } from "@/data/brands";
import ProductCard from "@/components/product/ProductCard";

export const metadata = {
  title: "Search Results — RESORB",
  description: "Search for replacement remotes by brand, model, or device name.",
};

export const dynamic = "force-dynamic";

function getParamValue(value) {
  if (Array.isArray(value)) return value[0] || "";
  return value || "";
}

async function SearchResults({ query, category, brand }) {
  const results = await searchProducts(query, { category, brand });
  const categoryName = category ? getCategoryBySlug(category)?.name : "";
  const brandName = brand ? getBrandBySlug(brand)?.name : "";
  const scopeLabel = [brandName, categoryName].filter(Boolean).join(" in ");

  if ((!query || query.trim().length < 2) && !category && !brand) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-4">🔍</p>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Start searching</h2>
        <p className="text-sm text-gray-500">Enter a brand name, model number, or device type above.</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-4">😕</p>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          {query ? `No results for "${query}"${scopeLabel ? ` in ${scopeLabel}` : ""}` : `No results${scopeLabel ? ` for ${scopeLabel}` : ""}`}
        </h2>
        <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
          We may still have the right remote. WhatsApp us with your device model and we&apos;ll confirm.
        </p>
        <a
          href={`https://wa.me/919876543210?text=Hi%2C%20I'm%20looking%20for%20a%20remote%20for%20${encodeURIComponent(query)}.%20Do%20you%20have%20it%3F`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Ask on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <>
      <p className="text-sm text-gray-500 mb-5">
        {results.length} result{results.length !== 1 ? "s" : ""}
        {query ? (
          <>
            {" "}for <strong className="text-gray-800">{`"${query}"`}</strong>
          </>
        ) : null}
        {scopeLabel ? <span>{query ? " in " : " for "}<strong className="text-gray-800">{scopeLabel}</strong></span> : null}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {results.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = getParamValue(params.q);
  const category = getParamValue(params.category);
  const brand = getParamValue(params.brand);
  const categoryName = category ? getCategoryBySlug(category)?.name : "";
  const brandName = brand ? getBrandBySlug(brand)?.name : "";
  const scopeLabel = [brandName, categoryName].filter(Boolean).join(" in ");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold text-gray-900 mb-6">
        {query ? `Results for "${query}"${scopeLabel ? ` in ${scopeLabel}` : ""}` : scopeLabel ? `Results for ${scopeLabel}` : "Search"}
      </h1>

      <Suspense fallback={<div className="py-16 text-center text-gray-400">Searching...</div>}>
        <SearchResults query={query} category={category} brand={brand} />
      </Suspense>
    </div>
  );
}
