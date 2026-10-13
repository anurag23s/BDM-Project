import React from "react";
import EvidenceBadge from "./EvidenceBadge.jsx";

export default function ChartCard({ title, subtitle, evidenceType, sourceFooter, children }) {
  return (
    <div className="panel">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div className="panel-title">{title}</div>
          {subtitle && <div className="panel-subtitle">{subtitle}</div>}
        </div>
        {evidenceType && <EvidenceBadge evidenceType={evidenceType} />}
      </div>
      <div>{children}</div>
      {sourceFooter && (
        <div style={{ marginTop: 10, fontSize: 11, color: "var(--muted)" }}>Source: {sourceFooter}</div>
      )}
    </div>
  );
}
