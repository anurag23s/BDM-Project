import React, { useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import ProductCard from "../components/ProductCard.jsx";
import AssumptionBanner from "../components/AssumptionBanner.jsx";
import EvidenceBadge from "../components/EvidenceBadge.jsx";
import { products } from "../data/supplement.js";
import { useAppData } from "../context/AppDataContext.jsx";

export default function SupplementInventory() {
  const { addTransaction } = useAppData();
  const [form, setForm] = useState({
    date: "",
    product: products[0].name,
    quantity: "",
    purchaseCost: "",
    sellingPrice: "",
    type: "Purchase",
    notes: "",
  });

  const submit = (e) => {
    e.preventDefault();
    if (!form.date || !form.quantity) return;
    addTransaction({
      date: form.date,
      product: form.product,
      quantity: Number(form.quantity),
      unitCost: Number(form.purchaseCost) || 0,
      sellingPrice: Number(form.sellingPrice) || 0,
      type: form.type,
      notes: form.notes,
    });
    setForm({ ...form, date: "", quantity: "", purchaseCost: "", sellingPrice: "", notes: "" });
  };

  return (
    <>
      <PageHeader
        title="Supplement Inventory"
        purpose="Operational view of the five products under evaluation. Economics and demand shown here are planning estimates -- current actual stock is not part of the project data."
      />

      <AssumptionBanner>
        Current actual stock levels have not been recorded anywhere in the project. They are intentionally
        shown as &quot;Not recorded&quot; below rather than invented.
      </AssumptionBanner>

      <div className="grid grid-3" style={{ marginTop: 4 }}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="panel">
        <div className="panel-title">Log a transaction</div>
        <div className="panel-subtitle">
          Locally entered operational data -- not part of original project dataset. Stored only in this browser.
        </div>
        <form onSubmit={submit} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          <label style={{ fontSize: 12 }}>
            Date
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
              style={{ width: "100%", marginTop: 4 }}
            />
          </label>
          <label style={{ fontSize: 12 }}>
            Product
            <select value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} style={{ width: "100%", marginTop: 4 }}>
              {products.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <label style={{ fontSize: 12 }}>
            Quantity
            <input
              type="number"
              min="0"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              required
              style={{ width: "100%", marginTop: 4 }}
            />
          </label>
          <label style={{ fontSize: 12 }}>
            Purchase cost (&#8377;/unit)
            <input
              type="number"
              min="0"
              value={form.purchaseCost}
              onChange={(e) => setForm({ ...form, purchaseCost: e.target.value })}
              style={{ width: "100%", marginTop: 4 }}
            />
          </label>
          <label style={{ fontSize: 12 }}>
            Selling price (&#8377;/unit)
            <input
              type="number"
              min="0"
              value={form.sellingPrice}
              onChange={(e) => setForm({ ...form, sellingPrice: e.target.value })}
              style={{ width: "100%", marginTop: 4 }}
            />
          </label>
          <label style={{ fontSize: 12 }}>
            Transaction type
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} style={{ width: "100%", marginTop: 4 }}>
              <option>Purchase</option>
              <option>Sale</option>
              <option>Adjustment</option>
            </select>
          </label>
          <label style={{ fontSize: 12, gridColumn: "span 2" }}>
            Notes
            <input
              type="text"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              style={{ width: "100%", marginTop: 4 }}
            />
          </label>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button className="btn btn-primary" type="submit">
              Add transaction
            </button>
          </div>
        </form>
        <div style={{ marginTop: 12 }}>
          <EvidenceBadge evidenceType="observed" label="Once entered, becomes real observed transaction data" />
        </div>
      </div>
    </>
  );
}
