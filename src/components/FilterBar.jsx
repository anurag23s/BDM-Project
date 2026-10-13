import React from "react";
import { Search } from "lucide-react";

// filters: [{ key, label, type: "select"|"search", options?: [{value,label}] }]
// values: { [key]: value }, onChange(key, value)
export default function FilterBar({ filters, values, onChange }) {
  return (
    <div className="filter-bar">
      {filters.map((f) => {
        if (f.type === "search") {
          return (
            <span key={f.key} style={{ position: "relative" }}>
              <Search
                size={13}
                style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }}
              />
              <input
                type="search"
                placeholder={f.label}
                value={values[f.key] || ""}
                onChange={(e) => onChange(f.key, e.target.value)}
                style={{ paddingLeft: 28 }}
              />
            </span>
          );
        }
        return (
          <select key={f.key} value={values[f.key] || ""} onChange={(e) => onChange(f.key, e.target.value)}>
            <option value="">{f.label}: All</option>
            {f.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      })}
    </div>
  );
}
