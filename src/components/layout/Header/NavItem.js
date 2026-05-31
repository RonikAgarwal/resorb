'use client';

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "@/components/icons";
import DropdownPanel from "./DropdownPanel";

export default function NavItem({ item }) {
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
        <ChevronDownIcon className={`w-3 h-3 ml-0.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </Link>

      {open && (
        <DropdownPanel item={item} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}
