import { notFound } from "next/navigation";
import Link from "next/link";
import CategoryProductCard from "@/components/product/CategoryProductCard";
import { getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/lib/products";
import { getBrandsByCategory } from "@/data/brands";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} — RESORB Replacement Remotes`,
    description: `Shop replacement remotes for ${category.name}. Verified compatibility with top Indian brands. Plug & play. WhatsApp support.`,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getProductsByCategory(slug);
  const brands = getBrandsByCategory(slug);

  // Construct subtle descriptive line
  const brandNames = brands.map(b => b.name);
  let descriptionText = category.description;
  if (brandNames.length > 0) {
    const topBrands = brandNames.slice(0, 5).join(", ");
    descriptionText = `Find compatible replacement remotes for ${topBrands}${brandNames.length > 5 ? " and more" : ""}.`;
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-12">

        {/* ── Section 1: Breadcrumb ── */}
        <nav className="text-xs text-gray-400 mb-5 flex items-center gap-1.5" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#1C2E6B] transition-colors">Home</Link>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6"/>
          </svg>
          <span className="text-gray-700 font-medium">{category.name}</span>
        </nav>

        {/* ── Section 2: Category Heading ── */}
        <div className="mb-6">
          <h1 className="category-heading">{category.name}</h1>
          <p className="text-sm text-gray-500 mt-2">{descriptionText}</p>
        </div>

        {/* ── Section 3: Brand Filter Pills ── */}
        {brands.length > 0 && (
          <div className="brand-pills-row mb-8">
            <Link
              href={`/category/${slug}`}
              className="brand-pill brand-pill-active"
            >
              All Brands
            </Link>
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={`/search?q=${encodeURIComponent(brand.name)}&category=${slug}`}
                className="brand-pill"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        )}

        {/* ── Section 4: Product Grid ── */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product, idx) => (
              <CategoryProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
            </svg>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">No products yet</h2>
            <p className="text-sm text-gray-500 mb-4">
              We&apos;re adding products to this category. WhatsApp us for specific requirements.
            </p>
            <a
              href="https://wa.me/917011779887"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
          </div>
        )}

      </div>
    </div>
  );
}
