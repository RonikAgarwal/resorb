"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, CloseIcon, SearchIcon } from "@/components/icons";
import { useDebounce } from "@/hooks/useDebounce";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import {
  getLiveSearchResults,
  POPULAR_SEARCHES,
} from "@/lib/searchSuggestions";
import { getBrandBySlug } from "@/data/brands";

const CATEGORY_IMAGES = {
  "tv-remotes": "/images/remotes/tv.png",
  "ac-remotes": "/images/remotes/ac.png",
  "set-top-box-remotes": "/images/remotes/stb.png",
  "speaker-remotes": "/images/remotes/speaker.png",
  "streaming-remotes": "/images/remotes/streaming.png",
  "projector-remotes": "/images/remotes/projector.png",
  "universal-remotes": "/images/remotes/universal.png",
};

function SectionHeading({ children }) {
  return (
    <h3 className="px-4 pb-2 pt-4 text-[11px] font-bold uppercase tracking-wide text-gray-400">
      {children}
    </h3>
  );
}

function SuggestionRow({ label, onSelect, icon = "search" }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(label)}
      className="flex w-full items-center gap-3 px-4 py-3 text-left active:bg-[#F4FAFA]"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F4FAFA] text-[#1C2E6B]">
        {icon === "clock" ? (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z" />
          </svg>
        ) : icon === "trending" ? (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" />
          </svg>
        ) : (
          <SearchIcon className="h-4 w-4" strokeWidth={2.2} />
        )}
      </span>
      <span className="min-w-0 flex-1 truncate text-[15px] text-gray-900">{label}</span>
      <svg className="h-4 w-4 shrink-0 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
      </svg>
    </button>
  );
}

function ProductResultRow({ product, onSelect }) {
  const imgSrc = CATEGORY_IMAGES[product.category] || "/images/remotes/tv.png";
  const brandName = getBrandBySlug(product.brand)?.name || product.compatibleBrands[0] || "";

  return (
    <Link
      href={`/product/${product.id}`}
      onClick={onSelect}
      className="flex items-center gap-3 px-4 py-3 active:bg-[#F4FAFA]"
    >
      <div className="relative h-12 w-12 shrink-0 rounded-lg bg-[#F8FAFA] p-1.5">
        <Image src={imgSrc} alt="" fill sizes="48px" className="object-contain" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-semibold text-[#1C2E6B]">{product.name}</p>
        <p className="truncate text-[12px] text-gray-500">
          {brandName ? `${brandName} · ` : ""}
          {product.title}
        </p>
        <p className="mt-0.5 text-[13px] font-bold text-[#009B9B]">₹{product.price.toLocaleString("en-IN")}</p>
      </div>
    </Link>
  );
}

function BrandResultRow({ brand, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(brand.name)}
      className="flex w-full items-center gap-3 px-4 py-3 text-left active:bg-[#F4FAFA]"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E0EEF0] text-sm font-bold text-[#1C2E6B]">
        {brand.name.charAt(0)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-medium text-gray-900">{brand.name}</p>
        <p className="text-[12px] text-gray-400">Brand</p>
      </div>
    </button>
  );
}

function CategoryResultRow({ category, onSelect }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      onClick={onSelect}
      className="flex items-center gap-3 px-4 py-3 active:bg-[#F4FAFA]"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F4FAFA] text-lg">
        {category.icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-medium text-gray-900">{category.name}</p>
        <p className="truncate text-[12px] text-gray-400">{category.description}</p>
      </div>
    </Link>
  );
}

export default function MobileSearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 150);
  const inputRef = useRef(null);
  const router = useRouter();
  const { recent, addRecent, removeRecent } = useRecentSearches();

  const trimmedQuery = debouncedQuery.trim();
  const hasQuery = trimmedQuery.length > 0;
  const results = hasQuery ? getLiveSearchResults(trimmedQuery) : null;
  const hasResults =
    results &&
    (results.suggestions.length > 0 ||
      results.products.length > 0 ||
      results.brands.length > 0 ||
      results.categories.length > 0);

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }

    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
    }, 100);

    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  if (!open) return null;

  function navigateToSearch(term) {
    const value = term.trim();
    if (!value) return;
    addRecent(value);
    onClose();
    router.push(`/search?q=${encodeURIComponent(value)}`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigateToSearch(query);
  }

  function handleClear() {
    setQuery("");
    inputRef.current?.focus({ preventScroll: true });
  }

  function handleResultSelect() {
    if (trimmedQuery) addRecent(trimmedQuery);
    onClose();
  }

  return (
    <div
      className="mobile-search-slide-down fixed inset-0 z-[80] flex flex-col bg-white lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
    >
      <form
        onSubmit={handleSubmit}
        className="flex h-[72px] shrink-0 items-center gap-1.5 border-b border-[#EAEAEA] px-2"
      >
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 shrink-0 items-center justify-center text-[#1C2E6B]"
          aria-label="Close search"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>

        <div className="flex h-11 min-w-0 flex-1 items-center overflow-hidden rounded-lg border border-[#EAEAEA] bg-white px-3 focus-within:border-[#009B9B] focus-within:ring-1 focus-within:ring-[#009B9B]/20">
          <SearchIcon className="h-5 w-5 shrink-0 text-[#1C2E6B]" strokeWidth={2.2} />
          <input
            ref={inputRef}
            type="search"
            enterKeyHint="search"
            inputMode="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search model, brand or code..."
            className="ml-2 h-full min-w-0 flex-1 bg-transparent text-[15px] text-gray-900 outline-none placeholder:text-gray-400"
            aria-label="Search products"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          {hasQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              aria-label="Clear search"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="h-10 w-10 shrink-0" aria-hidden="true" />
      </form>

      <div className="flex-1 overflow-y-auto overscroll-contain pb-6">
        {!hasQuery ? (
          <>
            {recent.length > 0 && (
              <section>
                <SectionHeading>Recent searches</SectionHeading>
                {recent.map((term) => (
                  <div key={term} className="group flex items-center">
                    <div className="min-w-0 flex-1">
                      <SuggestionRow
                        label={term}
                        icon="clock"
                        onSelect={navigateToSearch}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeRecent(term)}
                      className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-300 active:bg-gray-100 active:text-gray-500"
                      aria-label={`Remove ${term} from recent searches`}
                    >
                      <CloseIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </section>
            )}

            <section>
              <SectionHeading>Popular searches</SectionHeading>
              {POPULAR_SEARCHES.map((term) => (
                <SuggestionRow
                  key={term}
                  label={term}
                  icon="trending"
                  onSelect={navigateToSearch}
                />
              ))}
            </section>
          </>
        ) : hasResults ? (
          <>
            {results.suggestions.length > 0 && (
              <section>
                <SectionHeading>Suggestions</SectionHeading>
                {results.suggestions.map((term) => (
                  <SuggestionRow key={term} label={term} onSelect={navigateToSearch} />
                ))}
              </section>
            )}

            {results.products.length > 0 && (
              <section>
                <SectionHeading>Products</SectionHeading>
                {results.products.map((product) => (
                  <ProductResultRow
                    key={product.id}
                    product={product}
                    onSelect={handleResultSelect}
                  />
                ))}
              </section>
            )}

            {results.brands.length > 0 && (
              <section>
                <SectionHeading>Brands</SectionHeading>
                {results.brands.map((brand) => (
                  <BrandResultRow key={brand.slug} brand={brand} onSelect={navigateToSearch} />
                ))}
              </section>
            )}

            {results.categories.length > 0 && (
              <section>
                <SectionHeading>Categories</SectionHeading>
                {results.categories.map((category) => (
                  <CategoryResultRow
                    key={category.slug}
                    category={category}
                    onSelect={handleResultSelect}
                  />
                ))}
              </section>
            )}

            {trimmedQuery.length >= 2 && (
              <div className="px-4 py-4">
                <button
                  type="button"
                  onClick={() => navigateToSearch(trimmedQuery)}
                  className="w-full rounded-xl bg-[#1C2E6B] py-3.5 text-sm font-semibold text-white active:opacity-90"
                >
                  Search for &ldquo;{trimmedQuery}&rdquo;
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="px-4 py-12 text-center">
            <p className="text-3xl mb-3">🔍</p>
            <p className="text-[15px] font-semibold text-gray-700">
              No matches for &ldquo;{trimmedQuery}&rdquo;
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Try a brand name, model number, or device type
            </p>
            {trimmedQuery.length >= 2 && (
              <button
                type="button"
                onClick={() => navigateToSearch(trimmedQuery)}
                className="mt-5 rounded-xl border border-[#1C2E6B] px-5 py-2.5 text-sm font-semibold text-[#1C2E6B]"
              >
                Search anyway
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
