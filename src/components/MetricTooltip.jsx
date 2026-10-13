import React, { useState } from "react";
import { Info } from "lucide-react";

export default function MetricTooltip({ text }) {
  const [show, setShow] = useState(false);
  return (
    <span
      className="metric-tooltip-wrap"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      tabIndex={0}
    >
      <Info size={13} className="metric-tooltip-icon" aria-label="More information" />
      {show && <span className="metric-tooltip-bubble">{text}</span>}
    </span>
  );
}
