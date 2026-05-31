"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "resorb_recent_searches";
const MAX_RECENT = 8;

export function useRecentSearches() {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setRecent(parsed);
      }
    } catch {
      // ignore corrupt storage
    }
  }, []);

  const persist = useCallback((next) => {
    setRecent(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore quota errors
    }
  }, []);

  const addRecent = useCallback(
    (term) => {
      const trimmed = term.trim();
      if (!trimmed) return;
      setRecent((prev) => {
        const next = [
          trimmed,
          ...prev.filter((s) => s.toLowerCase() !== trimmed.toLowerCase()),
        ].slice(0, MAX_RECENT);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    },
    []
  );

  const removeRecent = useCallback(
    (term) => {
      setRecent((prev) => {
        const next = prev.filter((s) => s !== term);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    },
    []
  );

  const clearRecent = useCallback(() => {
    persist([]);
  }, [persist]);

  return { recent, addRecent, removeRecent, clearRecent };
}
