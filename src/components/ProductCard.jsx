import React from "react";
import EvidenceBadge from "./EvidenceBadge.jsx";

const money = (n) => `\u20b9${n.toLocaleString("en-IN")}`;

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-card-head">
        <div>
          <div className="product-card-name">{product.name}</div>
          <span className="badge badge-neutral">Category {product.abcCategory}</span>
        </div>
        <EvidenceBadge evidenceType="planning" />
      </div>
      <div className="product-card-row">
        <span>Cost / unit</span>
        <span className="mono">{money(product.unitCost)}</span>
      </div>
      <div className="product-card-row">
        <span>Selling price / unit</span>
        <span className="mono">{money(product.sellingPrice)}</span>
      </div>
      <div className="product-card-row">
        <span>Gross contribution / unit</span>
        <span className="mono">{money(product.grossContributionPerUnit)}</span>
      </div>
      <div className="product-card-row">
        <span>Scenario demand (6mo)</span>
        <span className="mono">
          {product.planningDemandUnits} {product.demandUnit}
        </span>
      </div>
      <div className="product-card-row">
        <span>Projected gross contribution</span>
        <span className="mono">{money(product.projectedGrossContribution)}</span>
      </div>
      <div className="product-card-row">
        <span>Contribution share</span>
        <span className="mono">{(product.contributionShare * 100).toFixed(1)}%</span>
      </div>
      <div className="product-card-row">
        <span>Current actual stock</span>
        <span className="badge badge-neutral">Not recorded</span>
      </div>
    </div>
  );
}
