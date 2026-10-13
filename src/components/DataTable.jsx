import React from "react";
import EmptyState from "./EmptyState.jsx";

// columns: [{ key, label, render?(row) }]
export default function DataTable({ columns, rows, emptyTitle, emptyDescription, rowKey = "id" }) {
  if (!rows || rows.length === 0) {
    return <EmptyState title={emptyTitle || "No records"} description={emptyDescription || "There is nothing to show yet."} />;
  }
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[rowKey]}>
              {columns.map((col) => (
                <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
