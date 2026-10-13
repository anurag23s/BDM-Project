import React, { useMemo, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
import PageHeader from "../components/PageHeader.jsx";
import ChartCard from "../components/ChartCard.jsx";
import DataTable from "../components/DataTable.jsx";
import AssumptionBanner from "../components/AssumptionBanner.jsx";
import EvidenceBadge from "../components/EvidenceBadge.jsx";
import { products as staticProducts, abcMethodologyNote, demandMethodologyNote } from "../data/supplement.js";
import { useAppData } from "../context/AppDataContext.jsx";
import { combineAndRecompute } from "../utils/productMath.js";

const money = (n) => `\u20b9${Math.round(n).toLocaleString("en-IN")}`;
const CAT_COLORS = { A: "#1f5e5b", B: "#8b9c97", C: "#b5762c" };

const emptyForm = {
  name: "",
  unitCost: "",
  sellingPrice: "",
  demandUnits: "",
  demandUnit: "units",
  consumptionAssumption: "",
};

export default function InventoryAnalysis() {
  const { customProducts, addCustomProduct, deleteCustomProduct } = useAppData();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const combined = useMemo(
    () => combineAndRecompute(staticProducts, customProducts),
    [customProducts]
  );

  const submit = (e) => {
    e.preventDefault();
    setError("");
    const unitCost = Number(form.unitCost);
    const sellingPrice = Number(form.sellingPrice);
    const demandUnits = Number(form.demandUnits);
    if (!form.name.trim()) return setError("Product name is required.");
    if (!(sellingPrice > unitCost)) return setError("Selling price must be greater than unit cost.");
    if (!(demandUnits > 0)) return setError("Estimated six-month demand must be a positive number.");
    if (!form.consumptionAssumption.trim()) return setError("State the consumption assumption behind this demand estimate.");

    addCustomProduct({
      name: form.name.trim(),
      unitCost,
      sellingPrice,
      demandUnits,
      demandUnit: form.demandUnit,
      consumptionAssumption: form.consumptionAssumption.trim(),
    });
    setForm(emptyForm);
  };

  return (
    <>
      <PageHeader
        title="Inventory Analysis"
        purpose="Contribution-based ABC classification and demand planning. Add a candidate product to see the whole ranking recalculate around it."
      />

      <AssumptionBanner>{abcMethodologyNote}</AssumptionBanner>

      <ChartCard
        title="A. Contribution-based ABC ranking"
        evidenceType="planning"
        sourceFooter="Projected six-month gross contribution per product (recalculated across all products, including any added below)"
      >
        <ResponsiveContainer width="100%" height={Math.max(220, combined.length * 42)}>
          <BarChart data={combined} layout="vertical" margin={{ left: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e7e9e7" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={110} />
            <Tooltip formatter={(v) => money(v)} />
            <Bar dataKey="projectedGrossContribution" name="Projected gross contribution" radius={[0, 3, 3, 0]}>
              {combined.map((entry) => (
                <Cell key={entry.id || entry.name} fill={CAT_COLORS[entry.abcCategory]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="panel">
        <div className="panel-title">ABC table</div>
        <div className="panel-subtitle">
          Classification rule: Category A &ge; 40% of total contribution, Category B 5&ndash;40%, Category C &lt; 5% &mdash;
          the same relative-contribution convention used in the original five-product analysis.
        </div>
        <DataTable
          columns={[
            {
              key: "name",
              label: "Product",
              render: (r) => (
                <>
                  {r.name}
                  {r.isCustom && <span className="badge badge-planning" style={{ marginLeft: 6 }}>Added</span>}
                </>
              ),
            },
            { key: "planningDemandUnits", label: "6-month demand", render: (r) => `${r.planningDemandUnits} ${r.demandUnit}` },
            { key: "projectedGrossContribution", label: "Projected contribution", render: (r) => money(r.projectedGrossContribution) },
            { key: "contributionShare", label: "Share", render: (r) => `${(r.contributionShare * 100).toFixed(1)}%` },
            { key: "abcCategory", label: "Category", render: (r) => <span className="badge badge-neutral">Category {r.abcCategory}</span> },
            {
              key: "action",
              label: "",
              render: (r) =>
                r.isCustom ? (
                  <button className="btn btn-sm btn-danger" onClick={() => deleteCustomProduct(r.id)}>
                    Remove
                  </button>
                ) : null,
            },
          ]}
          rows={combined}
          rowKey="id"
        />
      </div>

      <div className="panel">
        <div className="panel-title">Add a candidate product</div>
        <div className="panel-subtitle">
          Locally added planning entry &mdash; not part of the original survey-based five-product analysis. Adding a
          product here recalculates contribution share and ABC category for every product above, exactly the way the
          real analysis would be redone once a new candidate is under consideration.
        </div>
        {error && (
          <div style={{ color: "var(--rust)", fontSize: 12.5, marginBottom: 10 }}>{error}</div>
        )}
        <form onSubmit={submit} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          <label style={{ fontSize: 12 }}>
            Product name
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ width: "100%", marginTop: 4 }}
              placeholder="e.g. Mass Gainer"
            />
          </label>
          <label style={{ fontSize: 12 }}>
            Unit cost (&#8377;)
            <input
              type="number"
              min="0"
              value={form.unitCost}
              onChange={(e) => setForm({ ...form, unitCost: e.target.value })}
              style={{ width: "100%", marginTop: 4 }}
            />
          </label>
          <label style={{ fontSize: 12 }}>
            Selling price (&#8377;)
            <input
              type="number"
              min="0"
              value={form.sellingPrice}
              onChange={(e) => setForm({ ...form, sellingPrice: e.target.value })}
              style={{ width: "100%", marginTop: 4 }}
            />
          </label>
          <label style={{ fontSize: 12 }}>
            Estimated 6-month demand
            <input
              type="number"
              min="0"
              value={form.demandUnits}
              onChange={(e) => setForm({ ...form, demandUnits: e.target.value })}
              style={{ width: "100%", marginTop: 4 }}
            />
          </label>
          <label style={{ fontSize: 12 }}>
            Demand unit
            <select
              value={form.demandUnit}
              onChange={(e) => setForm({ ...form, demandUnit: e.target.value })}
              style={{ width: "100%", marginTop: 4 }}
            >
              <option value="units">units</option>
              <option value="tubs">tubs</option>
              <option value="boxes">boxes</option>
              <option value="trays">trays</option>
              <option value="bottles">bottles</option>
              <option value="packs">packs</option>
            </select>
          </label>
          <label style={{ fontSize: 12, gridColumn: "span 3" }}>
            Consumption assumption (required &mdash; state it explicitly, e.g. &quot;1 unit / interested respondent / month x 6 months&quot;)
            <input
              type="text"
              value={form.consumptionAssumption}
              onChange={(e) => setForm({ ...form, consumptionAssumption: e.target.value })}
              style={{ width: "100%", marginTop: 4 }}
            />
          </label>
          <div>
            <button className="btn btn-primary" type="submit">
              Add product to ranking
            </button>
          </div>
        </form>
      </div>

      <div className="panel">
        <div className="panel-title">B. Demand planning</div>
        <div className="panel-subtitle">{demandMethodologyNote}</div>
        <DataTable
          columns={[
            { key: "name", label: "Product" },
            { key: "planningDemandUnits", label: "6-month planning demand", render: (r) => `${r.planningDemandUnits} ${r.demandUnit}` },
            { key: "consumptionAssumption", label: "Planning assumption" },
            {
              key: "validation",
              label: "Validation status",
              render: () => <EvidenceBadge evidenceType="planning" label="Requires validation" />,
            },
          ]}
          rows={combined}
          rowKey="id"
        />
      </div>

      <div className="panel">
        <div className="panel-title">C. Inventory prioritization</div>
        <div className="grid grid-3">
          {["A", "B", "C"].map((cat) => (
            <div key={cat} className="product-card">
              <div className="product-card-name">Category {cat}</div>
              <ul style={{ margin: "8px 0 0", paddingLeft: 16, fontSize: 12.8 }}>
                {combined.filter((p) => p.abcCategory === cat).map((p) => (
                  <li key={p.id || p.name}>{p.name}</li>
                ))}
                {combined.filter((p) => p.abcCategory === cat).length === 0 && (
                  <li style={{ color: "var(--muted)", listStyle: "none", marginLeft: -16 }}>None currently</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
