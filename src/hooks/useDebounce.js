/**
 * Custom React hooks for the RESORB app.
 *
 * Add reusable hooks here, e.g.:
 * - useDebounce(value, delay)
 * - useMediaQuery(query)
 * - useLocalStorage(key, initialValue)
 */

import { useState, useEffect } from "react";

/**
 * Debounces a value by the specified delay.
 * Useful for search inputs to avoid excessive re-renders/API calls.
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
