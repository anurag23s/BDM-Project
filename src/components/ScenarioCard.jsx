import React from "react";

const money = (n) => `\u20b9${n.toLocaleString("en-IN")}`;

export default function ScenarioCard({ label, factor, value, isBase }) {
  return (
    <div className={`scenario-card${isBase ? " base" : ""}`}>
      <div className="scenario-card-label">
        {label} ({Math.round(factor * 100)}% demand)
      </div>
      <div className="scenario-card-value">{money(value)}</div>
    </div>
  );
}
