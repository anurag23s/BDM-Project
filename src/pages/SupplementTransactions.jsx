import React, { useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import DataTable from "../components/DataTable.jsx";
import FilterBar from "../components/FilterBar.jsx";
import AssumptionBanner from "../components/AssumptionBanner.jsx";
import { products } from "../data/supplement.js";
import { useAppData } from "../context/AppDataContext.jsx";

const money = (n) => `\u20b9${n.toLocaleString("en-IN")}`;

export default function SupplementTransactions() {
  const { transactions, deleteTransaction } = useAppData();
  const [filters, setFilters] = useState({});

  const filtered = transactions.filter((t) => {
    if (filters.product && t.product !== filters.product) return false;
    if (filters.search && !t.notes?.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <PageHeader
        title="Supplement Transactions"
        purpose="This is where Armstrong Gym starts collecting the real data needed to validate the survey-based demand scenario."
      />

      <AssumptionBanner variant="info">
        Recording actual transactions is required to validate the survey-based demand scenario. Every row
        entered here counts as real observed data going forward, not a planning estimate.
      </AssumptionBanner>

      {transactions.length === 0 ? (
        <div className="panel">
          <div className="empty-state">
            <h4>No actual supplement transactions have been recorded yet.</h4>
            <p>Use the Supplement Inventory page to log the first one -- purchases and sales alike.</p>
          </div>
        </div>
      ) : (
        <div className="panel">
          <FilterBar
            filters={[
              { key: "search", type: "search", label: "Search notes" },
              { key: "product", type: "select", label: "Product", options: products.map((p) => ({ value: p.name, label: p.name })) },
            ]}
            values={filters}
            onChange={(key, value) => setFilters((f) => ({ ...f, [key]: value }))}
          />
          <DataTable
            columns={[
              { key: "date", label: "Date", render: (r) => <span className="mono">{r.date}</span> },
              { key: "product", label: "Product" },
              { key: "quantity", label: "Quantity" },
              { key: "unitCost", label: "Unit cost", render: (r) => money(r.unitCost) },
              { key: "sellingPrice", label: "Selling price", render: (r) => money(r.sellingPrice) },
              {
                key: "grossContribution",
                label: "Gross contribution",
                render: (r) => money((r.sellingPrice - r.unitCost) * r.quantity),
              },
              { key: "type", label: "Type" },
              {
                key: "action",
                label: "",
                render: (r) => (
                  <button className="btn btn-sm btn-danger" onClick={() => deleteTransaction(r.id)}>
                    Delete
                  </button>
                ),
              },
            ]}
            rows={filtered}
          />
        </div>
      )}
    </>
  );
}
