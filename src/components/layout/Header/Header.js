'use client';

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ResorbWordmark from "@/components/ui/ResorbWordmark";
import { useCart } from "@/context/CartContext";
import { categories } from "@/data/categories";
import { SearchIcon, FilterIcon, ChevronDownIcon, CloseIcon, CartIcon, TruckIcon, MenuIcon } from "@/components/icons";
import NavItem from "./NavItem";
import FilterPanel from "./FilterPanel";
import MobileSearchOverlay from "./MobileSearchOverlay";
import DesktopSearchDropdown, { useDesktopSearchAutocomplete } from "./DesktopSearchDropdown";

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

function MobileMenuDrawer({ open, onClose }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/40 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <nav
        className="fixed inset-y-0 left-0 z-[70] flex w-[280px] flex-col bg-white shadow-xl lg:hidden"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
          <ResorbWordmark size="sm" />
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#1C2E6B] hover:bg-gray-100"
            aria-label="Close menu"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          <Link
            href="/"
            onClick={onClose}
            className="block px-5 py-3 text-sm font-semibold text-[#1C2E6B] hover:bg-[#F4FAFA]"
          >
            Home
          </Link>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="block px-5 py-3 text-sm font-medium text-gray-700 hover:bg-[#F4FAFA] hover:text-[#1C2E6B]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/track"
            onClick={onClose}
            className="block px-5 py-3 text-sm font-medium text-gray-700 hover:bg-[#F4FAFA] hover:text-[#1C2E6B]"
          >
            Track Order
          </Link>
          <Link
            href="/products"
            onClick={onClose}
            className="block px-5 py-3 text-sm font-medium text-gray-700 hover:bg-[#F4FAFA] hover:text-[#1C2E6B]"
          >
            All Products
          </Link>
        </div>
      </nav>
    </>
  );
}

export default function Header() {
  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState("");
  const [activeCategorySlug, setActiveCategorySlug] = useState(categories[0]?.slug || "");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const searchRef = useRef(null);
  const router = useRouter();
  const { totalItems } = useCart();

  function navigateDesktopSearch(term) {
    router.push(`/search?q=${encodeURIComponent(term)}`);
    setFilterOpen(false);
  }

  const desktopSearch = useDesktopSearchAutocomplete({
    query,
    setQuery,
    onNavigate: navigateDesktopSearch,
  });

  const selectedCategory = categories.find((c) => c.slug === selectedCategorySlug);
  const filterLabel = selectedBrand?.name || selectedCategory?.name || "Filter";
  const hasFilter = Boolean(selectedCategorySlug || selectedBrand);

  useEffect(() => {
    function handleClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setFilterOpen(false);
        desktopSearch.setOpen(false);
      }
    }
    if (filterOpen || desktopSearch.open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [filterOpen, desktopSearch.open, desktopSearch.setOpen]);

  function handleSearch(e) {
    e.preventDefault();
    desktopSearch.setOpen(false);
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

  function closeMobileSearch() {
    setMobileSearchOpen(false);
  }

  function openMobileSearch() {
    setMenuOpen(false);
    setMobileSearchOpen(true);
  }

  return (
    <header className="sticky top-0 z-50 bg-white lg:shadow-sm">
      {/* Announcement bar — desktop only */}
      <div className="hidden text-white text-xs py-1.5 text-center font-medium lg:block" style={{ background: '#1C2E6B' }}>
        Free Shipping above ₹499 &nbsp;·&nbsp; WhatsApp: +91 98765 43210
      </div>

      {/* Mobile header */}
      {!mobileSearchOpen && (
        <div className="flex h-[72px] max-h-[80px] items-center border-b border-[#EAEAEA] bg-white lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center ml-3 text-[#1C2E6B]"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <MenuIcon className="h-6 w-6" strokeWidth={2} />
          </button>

          <Link
            href="/"
            className="flex min-w-0 flex-1 items-center pl-1"
            aria-label="RESORB Home"
          >
            <ResorbWordmark size="xs" />
          </Link>

          <div className="flex shrink-0 items-center gap-0.5 pr-3">
            <button
              type="button"
              onClick={openMobileSearch}
              className="flex h-10 w-10 items-center justify-center text-[#1C2E6B]"
              aria-label="Search"
            >
              <SearchIcon className="h-[22px] w-[22px]" strokeWidth={2.2} />
            </button>
            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center text-[#1C2E6B]"
              aria-label={`Cart, ${totalItems} items`}
            >
              <CartIcon className="h-[22px] w-[22px]" strokeWidth={1.8} />
              {totalItems > 0 && (
                <span
                  className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold leading-none text-white"
                  style={{ background: "#009B9B" }}
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}

      <MobileSearchOverlay open={mobileSearchOpen} onClose={closeMobileSearch} />

      <MobileMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Desktop main row — unchanged */}
      <div className="mx-auto hidden max-w-7xl flex-wrap items-center gap-4 px-4 py-3 lg:flex lg:flex-nowrap lg:gap-5">
        <Link
          href="/"
          className="flex-shrink-0"
          aria-label="RESORB Home"
        >
          <ResorbWordmark size="md" />
        </Link>

        <div ref={searchRef} className="relative order-3 w-full flex-1 max-w-3xl lg:order-none lg:w-auto">
          <form
            onSubmit={handleSearch}
            className="h-12 flex items-center rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm focus-within:border-[#009B9B] focus-within:ring-2 focus-within:ring-[#009B9B]/10 transition-colors"
          >
            <button
              type="button"
              onClick={() => {
                setFilterOpen((v) => !v);
                desktopSearch.setOpen(false);
              }}
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
              onChange={(e) => {
                setQuery(e.target.value);
                desktopSearch.setOpen(true);
              }}
              onFocus={() => desktopSearch.setOpen(true)}
              onKeyDown={desktopSearch.handleInputKeyDown}
              placeholder="Search model number, brand or remote code..."
              className="min-w-0 flex-1 h-full pr-3 text-base text-gray-800 outline-none placeholder-gray-400 bg-white"
              aria-label="Search products"
              aria-expanded={desktopSearch.showDropdown}
              aria-controls="desktop-search-suggestions"
              aria-autocomplete="list"
              role="combobox"
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

          <DesktopSearchDropdown
            {...desktopSearch}
          />

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

      {/* Category nav — desktop only */}
      <div className="hidden border-t border-gray-100 lg:block">
        <nav className="max-w-7xl mx-auto px-4 flex items-center" aria-label="Product categories">
          <Link
            href="/"
            className="text-sm font-medium px-3 py-3 whitespace-nowrap border-b-2 border-transparent text-gray-600 hover:text-[#1C2E6B] hover:border-gray-300 transition-colors"
          >
            Home
          </Link>

          {NAV_ITEMS.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </nav>
      </div>
    </header>
  );
}
