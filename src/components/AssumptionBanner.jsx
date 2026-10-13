import React from "react";
import { AlertTriangle, Info } from "lucide-react";

// variant: "warning" (default, ochre) | "info" (teal)
export default function AssumptionBanner({ children, variant = "warning" }) {
  const Icon = variant === "info" ? Info : AlertTriangle;
  return (
    <div className={`assumption-banner${variant === "info" ? " info" : ""}`}>
      <Icon size={15} />
      <div>{children}</div>
    </div>
  );
}
