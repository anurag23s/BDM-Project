import React from "react";

export default function PageHeader({ title, purpose, children }) {
  return (
    <div className="page-header">
      <h1>{title}</h1>
      {purpose && <p>{purpose}</p>}
      {children}
    </div>
  );
}
