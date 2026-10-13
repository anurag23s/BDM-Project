import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import PageHeader from "../components/PageHeader.jsx";
import ChartCard from "../components/ChartCard.jsx";
import ScenarioCard from "../components/ScenarioCard.jsx";
import DataTable from "../components/DataTable.jsx";
import AssumptionBanner from "../components/AssumptionBanner.jsx";
import { sensitivityScenarios, productSensitivity, sensitivityNote } from "../data/sensitivity.js";

const money = (n) => `\u20b9${n.toLocaleString("en-IN")}`;

export default function SensitivityAnalysis() {
  return (
    <>
      <PageHeader
        title="Sensitivity Analysis"
        purpose="A +/-20% managerial stress test on the supplement demand scenario -- not a statistical confidence interval."
      />

      <div className="grid grid-3">
        {sensitivityScenarios.map((s) => (
          <ScenarioCard
            key={s.scenario}
            label={s.scenario}
            factor={s.demandFactor}
            value={s.totalProjectedGrossContribution}
            isBase={s.scenario === "Base"}
          />
        ))}
      </div>

      <ChartCard
        title="Projected six-month gross contribution across scenarios"
        evidenceType="planning"
        sourceFooter="+/-20% demand stress test applied to baseline planning demand"
      >
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={sensitivityScenarios}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e7e9e7" vertical={false} />
            <XAxis dataKey="scenario" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={50} tickFormatter={(v) => `${v / 1000}k`} />
            <Tooltip formatter={(v) => money(v)} />
            <Bar dataKey="totalProjectedGrossContribution" name="Projected gross contribution" fill="#1f5e5b" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="panel">
        <div className="panel-title">Product-level scenarios</div>
        <DataTable
          columns={[
            { key: "product", label: "Product" },
            { key: "pessimisticProfit", label: "Pessimistic (80%)", render: (r) => money(r.pessimisticProfit) },
            { key: "baselineProfit", label: "Base (100%)", render: (r) => money(r.baselineProfit) },
            { key: "optimisticProfit", label: "Optimistic (120%)", render: (r) => money(r.optimisticProfit) },
          ]}
          rows={productSensitivity}
          rowKey="product"
        />
      </div>

      <AssumptionBanner>{sensitivityNote}</AssumptionBanner>
      <AssumptionBanner variant="info">Whey Protein remains the Category A product across all three scenarios.</AssumptionBanner>
    </>
  );
}
