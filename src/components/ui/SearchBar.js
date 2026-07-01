'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

const QUICK_SEARCHES = [
  "Samsung TV",
  "Lloyd AC",
  "Tata Play",
  "Mi TV",
  "Fire TV Stick",
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  function handleQuickSearch(term) {
    router.push(`/search?q=${encodeURIComponent(term)}`);
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Main search input */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center border-2 border-gray-300 focus-within:border-blue-500 rounded-2xl overflow-hidden shadow-sm transition-colors bg-white">
          <div className="pl-4 text-gray-400 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </div>
          <input
            id="homepage-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your TV brand, AC model, or device name..."
            className="flex-1 h-14 px-3 text-base text-gray-800 outline-none bg-transparent placeholder-gray-400"
            autoComplete="off"
            aria-label="Search for a replacement remote"
          />
          <button
            type="submit"
            id="homepage-search-btn"
            className="h-14 bg-blue-600 hover:bg-blue-700 text-white px-6 text-sm font-semibold transition-colors flex-shrink-0 flex items-center gap-2"
          >
            <span className="hidden sm:inline">Find Remote</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </button>
        </div>
      </form>

      {/* Quick search pills */}
      <div className="flex flex-wrap items-center gap-2 mt-3" role="group" aria-label="Quick search suggestions">
        <span className="text-xs text-gray-400">Popular:</span>
        {QUICK_SEARCHES.map((term) => (
          <button
            key={term}
            onClick={() => handleQuickSearch(term)}
            className="text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 hover:border-blue-300 px-3 py-1 rounded-full transition-colors font-medium"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
