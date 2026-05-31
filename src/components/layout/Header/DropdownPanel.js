import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";

export default function DropdownPanel({ item, onClose }) {
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
          <ChevronRightIcon className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
