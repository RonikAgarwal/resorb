import { searchProducts } from "@/data/products";
import { brands } from "@/data/brands";
import { categories } from "@/data/categories";

export const POPULAR_SEARCHES = [
  "Samsung TV",
  "Voltas AC",
  "Tata Play",
  "Mi TV",
];

function matchesQuery(value, q) {
  return (value || "").toLowerCase().includes(q);
}

export function searchBrands(query = "", limit = 5) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return brands
    .filter(
      (b) =>
        matchesQuery(b.name, q) ||
        matchesQuery(b.slug, q) ||
        matchesQuery(b.slug.replace(/-/g, " "), q)
    )
    .slice(0, limit);
}

export function searchCategories(query = "", limit = 4) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return categories
    .filter(
      (c) =>
        matchesQuery(c.name, q) ||
        matchesQuery(c.slug, q) ||
        matchesQuery(c.slug.replace(/-/g, " "), q) ||
        matchesQuery(c.description, q)
    )
    .slice(0, limit);
}

export function getSearchSuggestions(query = "", limit = 6) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const suggestions = new Set();

  POPULAR_SEARCHES.filter((term) => matchesQuery(term, q)).forEach((term) =>
    suggestions.add(term)
  );

  searchBrands(q, 8).forEach((b) => suggestions.add(b.name));
  searchCategories(q, 8).forEach((c) => suggestions.add(c.name));

  if (q.length >= 2) {
    const products = searchProducts(query);
    products.forEach((p) => {
      suggestions.add(p.name);
      if (matchesQuery(p.sku, q)) suggestions.add(p.sku);
      if (matchesQuery(p.title, q)) suggestions.add(p.title);
      p.compatibleModels.forEach((model) => {
        if (matchesQuery(model, q)) suggestions.add(model);
      });
    });
  }

  return [...suggestions].slice(0, limit);
}

export function getLiveSearchResults(query = "", options = {}) {
  const {
    productLimit = 5,
    brandLimit = 4,
    categoryLimit = 4,
    suggestionLimit = 6,
  } = options;

  const q = query.trim();
  if (!q) {
    return {
      suggestions: [],
      products: [],
      brands: [],
      categories: [],
    };
  }

  const products = q.length >= 2 ? searchProducts(q).slice(0, productLimit) : [];
  const matchedBrands = searchBrands(q, brandLimit);
  const matchedCategories = searchCategories(q, categoryLimit);
  const suggestions = getSearchSuggestions(q, suggestionLimit);

  return {
    suggestions,
    products,
    brands: matchedBrands,
    categories: matchedCategories,
  };
}

/**
 * Desktop autocomplete sections — Brands, Categories, Products, Popular Searches.
 * Each item includes a searchTerm used when the user selects it.
 */
export function getDesktopAutocompleteSections(query = "", options = {}) {
  const {
    brandLimit = 5,
    categoryLimit = 5,
    productLimit = 6,
    modelLimit = 4,
    popularLimit = 4,
  } = options;

  const q = query.trim();
  const qLower = q.toLowerCase();

  if (!q) {
    return {
      brands: [],
      categories: [],
      products: [],
      popularSearches: [],
    };
  }

  const brandsSection = searchBrands(q, brandLimit).map((b) => ({
    id: `brand-${b.slug}`,
    label: b.name,
    searchTerm: b.name,
  }));

  const categoriesSection = searchCategories(q, categoryLimit).map((c) => ({
    id: `category-${c.slug}`,
    label: c.name,
    searchTerm: c.name,
    subtitle: c.description,
  }));

  const seenCategoryLabels = new Set(categoriesSection.map((c) => c.label));
  const matchedBrandsForCombos = searchBrands(q, 3);

  for (const brand of matchedBrandsForCombos) {
    for (const catSlug of brand.categories) {
      if (categoriesSection.length >= categoryLimit) break;
      const cat = categories.find((c) => c.slug === catSlug);
      if (!cat) continue;
      const label = `${brand.name} ${cat.name}`;
      if (seenCategoryLabels.has(label)) continue;
      if (!matchesQuery(label, qLower) && !matchesQuery(brand.name, qLower)) continue;
      seenCategoryLabels.add(label);
      categoriesSection.push({
        id: `combo-${brand.slug}-${cat.slug}`,
        label,
        searchTerm: label,
        subtitle: cat.description,
      });
    }
  }

  const productsSection = [];
  const seenProductLabels = new Set();

  if (qLower.length >= 2) {
    const matchedProducts = searchProducts(q);

    for (const product of matchedProducts) {
      if (productsSection.length >= productLimit) break;
      if (seenProductLabels.has(product.name)) continue;
      seenProductLabels.add(product.name);
      productsSection.push({
        id: `product-${product.id}`,
        label: product.name,
        subtitle: product.title,
        searchTerm: product.name,
      });
    }

    const seenModels = new Set();
    for (const product of matchedProducts) {
      for (const model of product.compatibleModels) {
        if (productsSection.length >= productLimit + modelLimit) break;
        if (!matchesQuery(model, qLower) || seenModels.has(model)) continue;
        seenModels.add(model);
        productsSection.push({
          id: `model-${product.id}-${model}`,
          label: model,
          subtitle: product.name,
          searchTerm: model,
        });
      }
      if (productsSection.length >= productLimit + modelLimit) break;
    }
  }

  const popularSearchesSection = POPULAR_SEARCHES.filter((term) =>
    matchesQuery(term, qLower)
  )
    .slice(0, popularLimit)
    .map((term) => ({
      id: `popular-${term}`,
      label: term,
      searchTerm: term,
    }));

  return {
    brands: brandsSection,
    categories: categoriesSection,
    products: productsSection,
    popularSearches: popularSearchesSection,
  };
}

export function flattenDesktopAutocompleteSections(sections) {
  return [
    ...sections.brands,
    ...sections.categories,
    ...sections.products,
    ...sections.popularSearches,
  ];
}

export function flattenDesktopEmptyState(recent, popular = POPULAR_SEARCHES) {
  const recentItems = recent.map((term) => ({
    id: `recent-${term}`,
    label: term,
    searchTerm: term,
    kind: "recent",
  }));
  const popularItems = popular.map((term) => ({
    id: `popular-empty-${term}`,
    label: term,
    searchTerm: term,
    kind: "popular",
  }));
  return [...recentItems, ...popularItems];
}
