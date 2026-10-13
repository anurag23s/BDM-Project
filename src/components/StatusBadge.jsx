import React from "react";

// Maps engagement / stock / contact category strings to a semantic status pill.
// Color is never the only signal -- the label text always states the category.
const MAP = {
  High: "status-high",
  Medium: "status-medium",
  "Low/At-Risk": "status-atrisk",
  "Low / At-Risk": "status-atrisk",
  "Severe Drop-off": "status-severe",
  Pending: "status-pending",
  "Not contacted": "status-pending",
  "Not recorded": "status-pending",
};

export default function StatusBadge({ status }) {
  const cls = MAP[status] || "status-pending";
  return <span className={`status-pill ${cls}`}>{status}</span>;
}
