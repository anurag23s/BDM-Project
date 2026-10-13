import { useEffect, useState } from "react";

// Simple localStorage-backed state hook. Used only for locally-entered
// operational/demo data (retention actions, supplement transactions) --
// never for the original project dataset, which is static and read-only.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.error("useLocalStorage read error:", err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("useLocalStorage write error:", err);
    }
  }, [key, value]);

  return [value, setValue];
}
