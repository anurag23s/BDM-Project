import React, { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

// This context holds ONLY locally-entered operational/demo state:
//   - retention outreach actions (contacted / response / return / renewal)
//   - manually logged supplement transactions
//   - custom supplement products added on the Inventory Analysis page
// None of this is part of the original project dataset. It is frontend-only,
// persisted to localStorage on this browser, and clearly labelled in the UI
// as "Locally entered operational data -- not part of original project dataset."

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [retentionActions, setRetentionActions] = useLocalStorage("armstrong.retentionActions", {});
  const [transactions, setTransactions] = useLocalStorage("armstrong.transactions", []);
  const [customProducts, setCustomProducts] = useLocalStorage("armstrong.customProducts", []);

  const updateRetentionAction = (memberId, patch) => {
    setRetentionActions((prev) => ({
      ...prev,
      [memberId]: {
        ...(prev[memberId] || {}),
        ...patch,
      },
    }));
  };

  const addTransaction = (tx) => {
    const withId = { ...tx, id: `TX-${Date.now()}-${Math.floor(Math.random() * 1000)}` };
    setTransactions((prev) => [withId, ...prev]);
  };

  const updateTransaction = (id, patch) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const addCustomProduct = (product) => {
    const withId = { ...product, id: `CP-${Date.now()}-${Math.floor(Math.random() * 1000)}` };
    setCustomProducts((prev) => [...prev, withId]);
  };

  const deleteCustomProduct = (id) => {
    setCustomProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const resetDemoData = () => {
    setRetentionActions({});
    setTransactions([]);
    setCustomProducts([]);
  };

  const value = useMemo(
    () => ({
      retentionActions,
      updateRetentionAction,
      transactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      customProducts,
      addCustomProduct,
      deleteCustomProduct,
      resetDemoData,
    }),
    [retentionActions, transactions, customProducts]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
}
