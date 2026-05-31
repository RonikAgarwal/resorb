'use client';

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ResorbWordmark from "@/components/ui/ResorbWordmark";
import { useCart } from "@/context/CartContext";
import { categories } from "@/data/categories";
import { SearchIcon, FilterIcon, ChevronDownIcon, CloseIcon, CartIcon, TruckIcon } from "@/components/icons";
import NavItem from "./NavItem";
import FilterPanel from "./FilterPanel";

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
              <FilterIcon className="w-4 h-4 flex-shrink-0" />
              <span className="max-w-[92px] truncate">{filterLabel}</span>
              <ChevronDownIcon className={`w-3 h-3 flex-shrink-0 transition-transform ${filterOpen ? "rotate-180" : ""}`} />
            </button>

            <div className="px-3 text-[#009B9B] flex-shrink-0">
              <SearchIcon className="w-4.5 h-4.5" />
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
                <CloseIcon />
              </button>
            )}

            <button
              type="submit"
              className="h-full px-5 sm:px-6 text-white flex-shrink-0 hover:opacity-95 transition-opacity font-semibold text-sm"
              style={{ background: '#1C2E6B' }}
              aria-label="Search"
            >
              <span className="hidden sm:inline">Find</span>
              <SearchIcon className="w-4 h-4 sm:hidden" />
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
            <TruckIcon />
            Track Order
          </Link>
          <Link href="/cart" className="relative flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#1C2E6B] transition-colors" aria-label={`Cart, ${totalItems} items`}>
            <div className="relative">
              <CartIcon />
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
