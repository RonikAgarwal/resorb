import { categories } from "@/data/categories";
import { getBrandsByCategory } from "@/data/brands";
import { ChevronRightIcon, CloseIcon } from "@/components/icons";

export default function FilterPanel({
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
                  <ChevronRightIcon className="w-3 h-3 flex-shrink-0" />
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
              <CloseIcon />
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
