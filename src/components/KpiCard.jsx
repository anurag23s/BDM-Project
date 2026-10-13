import React from "react";
import EvidenceBadge from "./EvidenceBadge.jsx";
import MetricTooltip from "./MetricTooltip.jsx";

export default function KpiCard({ value, label, evidenceType, tooltip }) {
  return (
    <div className="kpi-card">
      <div className="kpi-value">{value}</div>
      <div className="kpi-label">
        {label} {tooltip && <MetricTooltip text={tooltip} />}
      </div>
      {evidenceType && (
        <div className="kpi-badge-row">
          <EvidenceBadge evidenceType={evidenceType} />
        </div>
      )}
    </div>
  );
}
