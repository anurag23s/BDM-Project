import React from "react";
import { ChevronRight } from "lucide-react";

// stages: [{ label, count }]
export default function Funnel({ stages }) {
  return (
    <div className="funnel">
      {stages.map((stage, i) => (
        <React.Fragment key={stage.label}>
          <div className="funnel-stage">
            <div className="funnel-stage-count">{stage.count}</div>
            <div className="funnel-stage-label">{stage.label}</div>
          </div>
          {i < stages.length - 1 && <ChevronRight size={16} className="funnel-arrow" />}
        </React.Fragment>
      ))}
    </div>
  );
}
