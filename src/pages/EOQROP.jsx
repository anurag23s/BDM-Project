import React, { useMemo, useState } from "react";
import { ArrowDown } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import DataTable from "../components/DataTable.jsx";
import AssumptionBanner from "../components/AssumptionBanner.jsx";
import EvidenceBadge from "../components/EvidenceBadge.jsx";
import { eoqInputs, eoqFormulaNote, ropInputs, ropFormulaNote, inventoryAssumptionsNote } from "../data/inventory.js";

const num = (v) => (v === "" || isNaN(Number(v)) ? null : Number(v));

function EoqCalculator() {
  const [d, setD] = useState("420");
  const [s, setS] = useState("100");
  const [h, setH] = useState("560");

  const result = useMemo(() => {
    const D = num(d), S = num(s), H = num(h);
    if (D === null || S === null || H === null || D <= 0 || S <= 0 || H <= 0) return null;
    return Math.sqrt((2 * D * S) / H);
  }, [d, s, h]);

  return (
    <div className="panel">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div className="panel-title">EOQ Calculator</div>
        <span className="badge badge-neutral">User-entered calculation &mdash; not project data</span>
      </div>
      <div className="panel-subtitle">Enter your own demand and cost figures for any product to compute an economic order quantity.</div>
      <div className="grid grid-3">
        <label style={{ fontSize: 12 }}>
          Demand over period (D)
          <input type="number" min="0" value={d} onChange={(e) => setD(e.target.value)} style={{ width: "100%", marginTop: 4 }} />
        </label>
        <label style={{ fontSize: 12 }}>
          Ordering cost per order (S, &#8377;)
          <input type="number" min="0" value={s} onChange={(e) => setS(e.target.value)} style={{ width: "100%", marginTop: 4 }} />
        </label>
        <label style={{ fontSize: 12 }}>
          Holding cost per unit (H, &#8377;)
          <input type="number" min="0" value={h} onChange={(e) => setH(e.target.value)} style={{ width: "100%", marginTop: 4 }} />
        </label>
      </div>
      <div style={{ marginTop: 14, padding: 14, background: "#f7f8f7", borderRadius: 6, textAlign: "center" }}>
        <div className="kpi-label">EOQ = &radic;(2DS / H)</div>
        <div className="kpi-value" style={{ fontSize: 26, marginTop: 4 }}>
          {result === null ? "Enter valid values" : `${result.toFixed(2)} units/order`}
        </div>
      </div>
    </div>
  );
}

function RopCalculator() {
  const [dailyDemand, setDailyDemand] = useState("2.33");
  const [leadTime, setLeadTime] = useState("5");
  const [safetyStock, setSafetyStock] = useState("4");

  const result = useMemo(() => {
    const d = num(dailyDemand), L = num(leadTime), SS = num(safetyStock);
    if (d === null || L === null || SS === null || d < 0 || L < 0 || SS < 0) return null;
    return d * L + SS;
  }, [dailyDemand, leadTime, safetyStock]);

  return (
    <div className="panel">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div className="panel-title">ROP Calculator</div>
        <span className="badge badge-neutral">User-entered calculation &mdash; not project data</span>
      </div>
      <div className="panel-subtitle">Enter your own daily demand, lead time and safety stock to compute a reorder point.</div>
      <div className="grid grid-3">
        <label style={{ fontSize: 12 }}>
          Average daily demand (d)
          <input type="number" min="0" step="0.01" value={dailyDemand} onChange={(e) => setDailyDemand(e.target.value)} style={{ width: "100%", marginTop: 4 }} />
        </label>
        <label style={{ fontSize: 12 }}>
          Lead time in days (L)
          <input type="number" min="0" value={leadTime} onChange={(e) => setLeadTime(e.target.value)} style={{ width: "100%", marginTop: 4 }} />
        </label>
        <label style={{ fontSize: 12 }}>
          Safety stock (SS)
          <input type="number" min="0" value={safetyStock} onChange={(e) => setSafetyStock(e.target.value)} style={{ width: "100%", marginTop: 4 }} />
        </label>
      </div>
      <div style={{ marginTop: 14, padding: 14, background: "#f7f8f7", borderRadius: 6, textAlign: "center" }}>
        <div className="kpi-label">ROP = (d &times; L) + SS</div>
        <div className="kpi-value" style={{ fontSize: 26, marginTop: 4 }}>
          {result === null ? "Enter valid values" : `${result.toFixed(2)} units`}
        </div>
      </div>
    </div>
  );
}

export default function EOQROP() {
  const [showCalc, setShowCalc] = useState(false);
  const whey = eoqInputs.whey;

  return (
    <>
      <PageHeader
        title="EOQ & ROP"
        purpose="Preliminary planning benchmarks from the project data, plus a free-entry calculator for testing your own figures."
      />

      <div className="panel">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div className="panel-title">Project figure &middot; Economic Order Quantity (Whey Protein)</div>
          <EvidenceBadge evidenceType="planning" />
        </div>
        <div className="grid grid-4">
          <div>
            <div className="kpi-label">Demand (6mo)</div>
            <div className="kpi-value" style={{ fontSize: 20 }}>{whey.demandUnits6mo}</div>
          </div>
          <div>
            <div className="kpi-label">Ordering cost / order</div>
            <div className="kpi-value" style={{ fontSize: 20 }}>&#8377;{whey.orderingCostPerOrder}</div>
          </div>
          <div>
            <div className="kpi-label">Holding cost / unit</div>
            <div className="kpi-value" style={{ fontSize: 20 }}>&#8377;{whey.holdingCostPerUnit}</div>
          </div>
          <div>
            <div className="kpi-label">EOQ (Whey Protein)</div>
            <div className="kpi-value" style={{ fontSize: 20 }}>&asymp; {whey.eoqRounded} tubs/order</div>
          </div>
        </div>

        <button className="btn btn-sm" style={{ marginTop: 12 }} onClick={() => setShowCalc((v) => !v)}>
          {showCalc ? "Hide" : "Show"} how this was calculated
        </button>
        {showCalc && (
          <div style={{ marginTop: 10, fontSize: 12.8, background: "#f7f8f7", padding: 12, borderRadius: 6 }}>
            <p style={{ margin: 0 }}>{eoqFormulaNote}</p>
            <p className="mono" style={{ marginTop: 8 }}>
              EOQ = sqrt(2 &times; 420 &times; 100 / 560) = {whey.eoqRaw} &asymp; {whey.eoqRounded} tubs
            </p>
          </div>
        )}

        <div className="panel-subtitle" style={{ marginTop: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <span>Six-month demand ({whey.demandUnits6mo} tubs)</span>
          <ArrowDown size={14} />
          <span>Repeated replenishment</span>
          <ArrowDown size={14} />
          <span style={{ fontWeight: 600, color: "var(--accent)" }}>&asymp; {whey.eoqRounded} tubs/order (preliminary EOQ benchmark)</span>
        </div>
      </div>

      <div className="panel">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div className="panel-title">Project figure &middot; Reorder Point</div>
          <EvidenceBadge evidenceType="planning" />
        </div>
        <div className="panel-subtitle">{ropFormulaNote}</div>
        <DataTable
          columns={[
            { key: "product", label: "Product" },
            { key: "avgDailyDemand", label: "Daily demand", render: (r) => (r.avgDailyDemand ? `${r.avgDailyDemand}/day` : "\u2014") },
            { key: "leadTimeDays", label: "Lead time", render: (r) => (r.leadTimeDays ? `${r.leadTimeDays} days` : "\u2014") },
            { key: "safetyStock", label: "Safety stock", render: (r) => r.safetyStock ?? "\u2014" },
            {
              key: "ropFinal",
              label: "ROP",
              render: (r) => (r.ropFinal ? `${r.ropFinal} ${r.unit}` : r.approach),
            },
          ]}
          rows={ropInputs}
          rowKey="product"
        />
      </div>

      <AssumptionBanner>{inventoryAssumptionsNote}</AssumptionBanner>

      <div className="panel" style={{ marginTop: 22, borderTop: "3px solid var(--accent)" }}>
        <div className="panel-title">Your own calculation</div>
        <div className="panel-subtitle">
          Use these calculators to test EOQ or ROP for any product and any assumptions you choose &mdash; independent of
          the project&apos;s Whey Protein figures above. Results are computed live in your browser and are not saved
          anywhere.
        </div>
      </div>
      <div className="grid grid-2">
        <EoqCalculator />
        <RopCalculator />
      </div>
    </>
  );
}
