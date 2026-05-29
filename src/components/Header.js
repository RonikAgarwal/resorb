'use client';

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ResorbWordmark from "@/components/ResorbWordmark";
import { useCart } from "@/context/CartContext";
import { categories } from "@/data/categories";
import { getBrandsByCategory } from "@/data/brands";

const NAV_ITEMS = [
  {
    label: "AC Remotes",
    href: "/category/ac-remotes",
    featured: ["Daikin", "Voltas", "Blue Star", "Hitachi", "Carrier", "Lloyd"],
    others: ["Azure", "Electrolux", "Godrej", "Gree", "Haier", "IFB", "Kelvinator", "LG", "Mitsubishi", "O General", "Onida", "Panasonic", "Samsung", "Whirlpool"],
  },
  {
    label: "LED TV Remotes",
    href: "/category/tv-remotes",
    featured: ["Samsung", "LG", "Sony", "Mi / Xiaomi", "Panasonic", "TCL"],
    others: ["BPL", "Haier", "Hisense", "Intex", "Kodak", "MarQ", "OnePlus", "Realme", "Sanyo", "Thomson", "VU", "Videocon"],
  },
  {
    label: "Set-Top Box",
    href: "/category/set-top-box-remotes",
    featured: ["Tata Play", "Airtel Xstream", "Dish TV", "Jio", "Sun Direct", "Videocon D2H"],
    others: ["DD Free Dish", "Den Networks", "Hathway", "NXT Digital", "SITI Cable"],
  },
  {
    label: "Home Theatre",
    href: "/category/speaker-remotes",
    featured: ["Samsung", "Sony", "LG", "boAt", "Philips", "JBL"],
    others: ["Bose", "Denon", "Harman", "Intex", "Onkyo", "Panasonic", "Yamaha", "Zebronics"],
  },
  {
    label: "Streaming",
    href: "/category/streaming-remotes",
    featured: ["Amazon Fire TV", "Mi Box", "Google Chromecast", "Apple TV", "Roku", "Nvidia Shield"],
    others: ["Airtel Xstream Box", "JioFiber", "Tata Play Binge", "Xiaomi Mi Stick"],
  },
  {
    label: "Projector",
    href: "/category/projector-remotes",
    featured: ["Epson", "BenQ", "ViewSonic", "Optoma", "Sony", "LG"],
    others: ["Acer", "Canon", "Dell", "Infocus", "NEC", "Panasonic", "Sharp"],
  },
  {
    label: "Universal",
    href: "/category/universal-remotes",
    featured: ["RESORB UNI 88", "RESORB UNI 120", "8-in-1 Smart Remote", "Multi-brand TV", "Multi-brand AC", "Voice Remote"],
    others: [],
  },
];

/* ── Dropdown Menu Panel ── */
function DropdownPanel({ item, onClose }) {
  return (
    <div
      className="absolute top-full left-0 bg-white rounded-b-lg shadow-2xl border border-gray-200 border-t-0"
      style={{ width: 280, zIndex: 9999, borderTop: '3px solid #1C2E6B' }}
    >
      <div className="max-h-[65vh] overflow-y-auto">
        {/* Featured brands */}
        <div className="px-4 pt-3 pb-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
            Featured Brands
          </p>
          {item.featured.map((brand) => (
            <Link
              key={brand}
              href={`/search?q=${encodeURIComponent(brand)}`}
              onClick={onClose}
              className="flex items-center gap-2 py-[6px] px-2 text-[13px] text-gray-700 hover:text-[#1C2E6B] hover:bg-blue-50 rounded transition-colors"
            >
              <span className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: '#009B9B' }} />
              Compatible for {brand}
            </Link>
          ))}
        </div>

        {/* Other brands */}
        {item.others.length > 0 && (
          <div className="px-4 pt-2 pb-2 border-t border-gray-100">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
              Other Brands
            </p>
            {item.others.map((brand) => (
              <Link
                key={brand}
                href={`/search?q=${encodeURIComponent(brand)}`}
                onClick={onClose}
                className="flex items-center gap-2 py-[5px] px-2 text-[13px] text-gray-500 hover:text-[#1C2E6B] hover:bg-blue-50 rounded transition-colors"
              >
                <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                Compatible for {brand}
              </Link>
            ))}
          </div>
        )}

        {/* View All */}
        <Link
          href={item.href}
          onClick={onClose}
          className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-t border-gray-100 text-xs font-semibold hover:bg-gray-100 transition-colors"
          style={{ color: '#1C2E6B' }}
        >
          View All {item.label}
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}

/* ── Single Nav Item with Dropdown ── */
function NavItem({ item }) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const ref = useRef(null);

  const show = useCallback(() => {
    clearTimeout(timer.current);
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    timer.current = setTimeout(() => setOpen(false), 150);
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <Link
        href={item.href}
        onFocus={show}
        onClick={() => setOpen(false)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`flex items-center gap-1 text-sm font-medium px-3 py-3 whitespace-nowrap transition-colors border-b-2 ${
          open
            ? 'text-[#1C2E6B] border-[#009B9B]'
            : 'text-gray-600 border-transparent hover:text-[#1C2E6B] hover:border-gray-300'
        }`}
      >
        {item.label}
        <svg
          className={`w-3 h-3 ml-0.5 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6"/>
        </svg>
      </Link>

      {open && (
        <DropdownPanel item={item} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}

function FilterPanel({
  activeCategorySlug,
  selectedCategorySlug,
  selectedBrand,
  onActiveCategory,
  onSelectCategory,
  onSelectBrand,
  onClear,
  onClose,
}) {
  const activeCategory = categories.find((c) => c.slug === activeCategorySlug) || categories[0];
  const activeBrands = activeCategory ? getBrandsByCategory(activeCategory.slug) : [];

  return (
    <div
      className="absolute top-[calc(100%+8px)] left-0 w-[680px] max-w-[calc(100vw-2rem)] rounded-xl border border-gray-200 bg-white shadow-2xl overflow-hidden"
      style={{ zIndex: 9999 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-[250px_1fr]">
        <div className="border-b sm:border-b-0 sm:border-r border-gray-100 bg-gray-50 p-2">
          <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Category
          </div>
          <div className="space-y-1">
            {categories.map((category) => {
              const active = activeCategory?.slug === category.slug;
              const selected = selectedCategorySlug === category.slug;
              return (
                <button
                  key={category.id}
                  type="button"
                  onMouseEnter={() => onActiveCategory(category.slug)}
                  onFocus={() => onActiveCategory(category.slug)}
                  onClick={() => onSelectCategory(category.slug)}
                  className={`w-full flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-xs transition-colors ${
                    active || selected
                      ? "bg-white text-[#1C2E6B] shadow-sm"
                      : "text-gray-600 hover:bg-white hover:text-[#1C2E6B]"
                  }`}
                >
                  <span className="flex items-center min-w-0">
                    <span className="font-semibold truncate">{category.name}</span>
                  </span>
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6"/>
                  </svg>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-3">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Brand</p>
              <p className="text-xs font-semibold text-gray-700">{activeCategory?.name}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center"
              aria-label="Close filters"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-1">
            {activeBrands.map((brand) => {
              const selected = selectedBrand?.slug === brand.slug;
              return (
                <button
                  key={brand.id}
                  type="button"
                  onClick={() => onSelectBrand(activeCategory.slug, brand)}
                  className={`rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors ${
                    selected
                      ? "border-[#009B9B] bg-[#E0EEF0] text-[#1C2E6B]"
                      : "border-gray-100 text-gray-600 hover:border-[#009B9B] hover:text-[#1C2E6B]"
                  }`}
                >
                  {brand.name}
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClear}
              className="text-xs font-medium text-gray-500 hover:text-red-600"
            >
              Clear filter
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-white rounded-lg px-4 py-2 bg-[#1C2E6B] hover:bg-[#162352] transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Header ── */
export default function Header() {
  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState("");
  const [activeCategorySlug, setActiveCategorySlug] = useState(categories[0]?.slug || "");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const searchRef = useRef(null);
  const router = useRouter();
  const { totalItems } = useCart();

  const selectedCategory = categories.find((c) => c.slug === selectedCategorySlug);
  const filterLabel = selectedBrand?.name || selectedCategory?.name || "Filter";
  const hasFilter = Boolean(selectedCategorySlug || selectedBrand);

  useEffect(() => {
    function handleClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    }
    if (filterOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [filterOpen]);

  function handleSearch(e) {
    e.preventDefault();
    const trimmed = query.trim();

    if (!trimmed && selectedCategorySlug && !selectedBrand) {
      router.push(`/category/${selectedCategorySlug}`);
      setFilterOpen(false);
      return;
    }

    const params = new URLSearchParams();
    if (trimmed) params.set("q", trimmed);
    if (selectedCategorySlug) params.set("category", selectedCategorySlug);
    if (selectedBrand) params.set("brand", selectedBrand.slug);

    if (params.toString()) {
      router.push(`/search?${params.toString()}`);
      setFilterOpen(false);
    }
  }

  function clearFilter() {
    setSelectedCategorySlug("");
    setSelectedBrand(null);
    setActiveCategorySlug(categories[0]?.slug || "");
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Announcement bar */}
      <div className="text-white text-xs py-1.5 text-center font-medium" style={{ background: '#1C2E6B' }}>
        Free Shipping above ₹499 &nbsp;·&nbsp; 30-Day Replacement Warranty &nbsp;·&nbsp; WhatsApp: +91 98765 43210
      </div>

      {/* Main row */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap lg:flex-nowrap items-center gap-4 lg:gap-5">
        {/* Logo */}
        <Link
          href="/"
          className="flex-shrink-0"
          aria-label="RESORB Home"
        >
          <ResorbWordmark size="md" />
        </Link>

        {/* Search */}
        <div ref={searchRef} className="relative order-3 w-full lg:order-none lg:w-auto flex-1 max-w-3xl">
          <form
            onSubmit={handleSearch}
            className="h-12 flex items-center rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm focus-within:border-[#009B9B] focus-within:ring-2 focus-within:ring-[#009B9B]/10 transition-colors"
          >
            <button
              type="button"
              onClick={() => setFilterOpen((v) => !v)}
              className={`h-full flex items-center gap-1.5 px-3 text-xs font-semibold border-r border-gray-100 transition-colors ${
                hasFilter
                  ? "bg-[#E0EEF0] text-[#1C2E6B]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-[#1C2E6B]"
              }`}
              aria-expanded={filterOpen}
              aria-label="Filter search"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h18M6.75 12h10.5M10.5 19.5h3"/>
              </svg>
              <span className="max-w-[92px] truncate">{filterLabel}</span>
              <svg className={`w-3 h-3 flex-shrink-0 transition-transform ${filterOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6"/>
              </svg>
            </button>

            <div className="px-3 text-[#009B9B] flex-shrink-0">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
              </svg>
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search model number, brand or remote code..."
              className="min-w-0 flex-1 h-full pr-3 text-base text-gray-800 outline-none placeholder-gray-400 bg-white"
              aria-label="Search products"
            />

            {hasFilter && (
              <button
                type="button"
                onClick={clearFilter}
                className="hidden sm:flex mr-2 w-7 h-7 rounded-full items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                aria-label="Clear search filters"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                </svg>
              </button>
            )}

            <button
              type="submit"
              className="h-full px-5 sm:px-6 text-white flex-shrink-0 hover:opacity-95 transition-opacity font-semibold text-sm"
              style={{ background: '#1C2E6B' }}
              aria-label="Search"
            >
              <span className="hidden sm:inline">Find</span>
              <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
              </svg>
            </button>
          </form>

          {filterOpen && (
            <FilterPanel
              activeCategorySlug={activeCategorySlug}
              selectedCategorySlug={selectedCategorySlug}
              selectedBrand={selectedBrand}
              onActiveCategory={setActiveCategorySlug}
              onSelectCategory={(slug) => {
                setSelectedCategorySlug(slug);
                setSelectedBrand(null);
                setActiveCategorySlug(slug);
              }}
              onSelectBrand={(categorySlug, brand) => {
                setSelectedCategorySlug(categorySlug);
                setSelectedBrand(brand);
                setFilterOpen(false);
              }}
              onClear={clearFilter}
              onClose={() => setFilterOpen(false)}
            />
          )}
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-5 flex-shrink-0">
          <Link href="/track" className="hidden md:flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#1C2E6B] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>
            </svg>
            Track Order
          </Link>
          <Link href="/cart" className="relative flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#1C2E6B] transition-colors" aria-label={`Cart, ${totalItems} items`}>
            <div className="relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center" style={{ background: '#009B9B' }}>
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden sm:block">Cart</span>
          </Link>
        </div>
      </div>

      {/* Category nav — no overflow hidden so dropdowns aren't clipped */}
      <div className="border-t border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 flex items-center" aria-label="Product categories">
          {/* Home link */}
          <Link
            href="/"
            className="text-sm font-medium px-3 py-3 whitespace-nowrap border-b-2 border-transparent text-gray-600 hover:text-[#1C2E6B] hover:border-gray-300 transition-colors"
          >
            Home
          </Link>

          {/* Category dropdowns */}
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </nav>
      </div>
    </header>
  );
}
