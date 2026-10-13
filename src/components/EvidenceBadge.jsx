import React from "react";
import { CircleDot, Sigma, FlaskConical } from "lucide-react";

const CONFIG = {
  observed: { label: "Observed data", className: "badge-observed", Icon: CircleDot },
  derived: { label: "Derived from project data", className: "badge-derived", Icon: Sigma },
  planning: { label: "Planning estimate", className: "badge-planning", Icon: FlaskConical },
};

// evidenceType: "observed" | "derived" | "planning"
export default function EvidenceBadge({ evidenceType, label }) {
  const cfg = CONFIG[evidenceType] || CONFIG.observed;
  const Icon = cfg.Icon;
  return (
    <span className={`badge ${cfg.className}`}>
      <Icon size={11} />
      {label || cfg.label}
    </span>
  );
}
