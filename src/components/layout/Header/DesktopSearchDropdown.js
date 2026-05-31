"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import {
  POPULAR_SEARCHES,
  flattenDesktopAutocompleteSections,
  flattenDesktopEmptyState,
  getDesktopAutocompleteSections,
} from "@/lib/searchSuggestions";

function HighlightMatch({ text, query }) {
  if (!query?.trim()) return text;

  const q = query.trim();
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;

  return (
    <>
      {text.slice(0, idx)}
      <span className="font-semibold text-[#1C2E6B]">{text.slice(idx, idx + q.length)}</span>
      {text.slice(idx + q.length)}
    </>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="border-b border-gray-100 bg-[#F7F8FA] px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-gray-500">
      {children}
    </div>
  );
}

function SuggestionItem({ item, query, itemIndex, isHighlighted, onSelect, onHover }) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={isHighlighted}
      data-suggestion-index={itemIndex}
      onMouseEnter={onHover}
      onClick={() => onSelect(item.searchTerm)}
      className={`flex w-full items-start gap-3 px-4 py-2.5 text-left transition-colors ${
        isHighlighted ? "bg-[#EEF6F6]" : "hover:bg-[#F3F3F3]"
      }`}
    >
      <svg
        className="mt-0.5 h-4 w-4 shrink-0 text-gray-400"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
        />
      </svg>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm text-gray-900">
          <HighlightMatch text={item.label} query={query} />
        </span>
        {item.subtitle && (
          <span className="mt-0.5 block truncate text-xs text-gray-500">{item.subtitle}</span>
        )}
      </span>
    </button>
  );
}

function EmptyStateItem({ item, itemIndex, isHighlighted, onSelect, onHover, icon }) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={isHighlighted}
      data-suggestion-index={itemIndex}
      onMouseEnter={onHover}
      onClick={() => onSelect(item.searchTerm)}
      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
        isHighlighted ? "bg-[#EEF6F6]" : "hover:bg-[#F3F3F3]"
      }`}
    >
      {icon === "clock" ? (
        <svg className="h-4 w-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0z" />
        </svg>
      ) : (
        <svg className="h-4 w-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" />
        </svg>
      )}
      <span className="truncate text-sm text-gray-900">{item.label}</span>
    </button>
  );
}

export function useDesktopSearchAutocomplete({ query, setQuery, onNavigate }) {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const debouncedQuery = useDebounce(query, 250);
  const { recent, addRecent } = useRecentSearches();
  const listRef = useRef(null);

  const trimmedDebounced = debouncedQuery.trim();
  const hasQuery = trimmedDebounced.length > 0;

  const sections = useMemo(
    () =>
      hasQuery
        ? getDesktopAutocompleteSections(trimmedDebounced)
        : { brands: [], categories: [], products: [], popularSearches: [] },
    [hasQuery, trimmedDebounced]
  );

  const flatItems = useMemo(() => {
    if (!open) return [];
    if (!hasQuery) return flattenDesktopEmptyState(recent);
    return flattenDesktopAutocompleteSections(sections);
  }, [open, hasQuery, recent, sections]);

  const showDropdown = open;

  useEffect(() => {
    setHighlightedIndex(flatItems.length > 0 ? 0 : -1);
  }, [trimmedDebounced, open, flatItems.length]);

  useEffect(() => {
    if (highlightedIndex < 0 || !listRef.current) return;
    const el = listRef.current.querySelector(
      `[data-suggestion-index="${highlightedIndex}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex]);

  function selectSearch(term) {
    const value = term.trim();
    if (!value) return;
    addRecent(value);
    setOpen(false);
    setHighlightedIndex(-1);
    onNavigate(value);
  }

  function handleInputKeyDown(e) {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        setOpen(true);
      }
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      setHighlightedIndex(-1);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (flatItems.length === 0) return;
      setHighlightedIndex((i) => (i + 1) % flatItems.length);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (flatItems.length === 0) return;
      setHighlightedIndex((i) => (i <= 0 ? flatItems.length - 1 : i - 1));
      return;
    }

    if (e.key === "Enter" && highlightedIndex >= 0 && flatItems[highlightedIndex]) {
      e.preventDefault();
      selectSearch(flatItems[highlightedIndex].searchTerm);
    }
  }

  return {
    open,
    setOpen,
    showDropdown,
    debouncedQuery: trimmedDebounced,
    hasQuery,
    sections,
    flatItems,
    highlightedIndex,
    setHighlightedIndex,
    recent,
    listRef,
    selectSearch,
    handleInputKeyDown,
  };
}

export default function DesktopSearchDropdown({
  open,
  showDropdown,
  query,
  debouncedQuery,
  hasQuery,
  sections,
  flatItems,
  highlightedIndex,
  setHighlightedIndex,
  recent,
  listRef,
  selectSearch,
}) {
  if (!showDropdown) return null;

  let runningIndex = 0;

  function nextIndex() {
    const idx = runningIndex;
    runningIndex += 1;
    return idx;
  }

  function renderSection(title, items) {
    if (!items?.length) return null;

    return (
      <div key={title}>
        <SectionLabel>{title}</SectionLabel>
        {items.map((item) => {
          const itemIndex = nextIndex();
          return (
            <SuggestionItem
              key={item.id}
              item={item}
              query={debouncedQuery}
              itemIndex={itemIndex}
              isHighlighted={highlightedIndex === itemIndex}
              onSelect={selectSearch}
              onHover={() => setHighlightedIndex(itemIndex)}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div
      ref={listRef}
      id="desktop-search-suggestions"
      role="listbox"
      aria-label="Search suggestions"
      className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 max-h-[450px] overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
    >
      {!hasQuery ? (
        <>
          {recent.length > 0 && (
            <div>
              <SectionLabel>Recent searches</SectionLabel>
              {recent.map((term) => {
                const item = { id: `recent-${term}`, label: term, searchTerm: term };
                const itemIndex = nextIndex();
                return (
                  <EmptyStateItem
                    key={item.id}
                    item={item}
                    itemIndex={itemIndex}
                    icon="clock"
                    isHighlighted={highlightedIndex === itemIndex}
                    onSelect={selectSearch}
                    onHover={() => setHighlightedIndex(itemIndex)}
                  />
                );
              })}
            </div>
          )}
          <div>
            <SectionLabel>Popular searches</SectionLabel>
            {POPULAR_SEARCHES.map((term) => {
              const item = { id: `popular-empty-${term}`, label: term, searchTerm: term };
              const itemIndex = nextIndex();
              return (
                <EmptyStateItem
                  key={item.id}
                  item={item}
                  itemIndex={itemIndex}
                  icon="trending"
                  isHighlighted={highlightedIndex === itemIndex}
                  onSelect={selectSearch}
                  onHover={() => setHighlightedIndex(itemIndex)}
                />
              );
            })}
          </div>
        </>
      ) : flatItems.length === 0 ? (
        <div className="px-4 py-8 text-center text-sm text-gray-500">
          No suggestions for &ldquo;{debouncedQuery}&rdquo;
        </div>
      ) : (
        <>
          {renderSection("Brands", sections.brands)}
          {renderSection("Categories", sections.categories)}
          {renderSection("Products", sections.products)}
          {renderSection("Popular searches", sections.popularSearches)}
        </>
      )}
    </div>
  );
}
