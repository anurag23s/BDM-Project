import React from "react";
import { X } from "lucide-react";
import StatusBadge from "./StatusBadge.jsx";
import EvidenceBadge from "./EvidenceBadge.jsx";
import { useAppData } from "../context/AppDataContext.jsx";

export default function MemberDrawer({ member, onClose }) {
  const { retentionActions, updateRetentionAction } = useAppData();
  if (!member) return null;

  const action = retentionActions[member.id] || {};

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <button className="drawer-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <h2 style={{ fontSize: 19, marginBottom: 2 }}>{member.name}</h2>
        <div className="mono" style={{ color: "var(--muted)", fontSize: 12.5 }}>
          {member.id}
        </div>

        <div className="section-label">Current monitoring status</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <StatusBadge status={member.engagementCategory} />
          <EvidenceBadge evidenceType="derived" label="Operational dynamic gap" />
        </div>
        <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 8 }}>
          {member.currentGap} day(s) since last observed attendance on {member.lastAttendance}. This is the
          live gap, distinct from the retrospective maximum-gap figure used in the capstone report&apos;s
          headline statistics.
        </p>

        <div className="section-label">Member details</div>
        <div className="product-card-row">
          <span>Occupation</span>
          <span>{member.occupation || "Not recorded"}</span>
        </div>
        <div className="product-card-row">
          <span>Age</span>
          <span>{member.age ?? "Not recorded"}</span>
        </div>
        <div className="product-card-row">
          <span>Preferred slot</span>
          <span>{member.preferredSlot || "Not recorded"}</span>
        </div>
        <div className="product-card-row">
          <span>Subscription fee (assumed)</span>
          <span>{member.subscriptionFee ? `\u20b9${member.subscriptionFee}/mo` : "Not recorded"}</span>
        </div>
        <div className="product-card-row">
          <span>Total observed attendance</span>
          <span>{member.totalAttendance ?? "Not recorded"} visits</span>
        </div>
        <div className="product-card-row">
          <span>Phone / contact number</span>
          <span className="badge badge-neutral">Not recorded</span>
        </div>

        <div className="section-label">Outreach workflow</div>
        <p className="local-data-tag">Local demo state -- not persisted to a backend.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
          <label style={{ fontSize: 12.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Contacted
            <button
              className={`btn btn-sm${action.contacted ? " btn-primary" : ""}`}
              onClick={() => updateRetentionAction(member.id, { contacted: !action.contacted })}
            >
              {action.contacted ? "Marked contacted" : "Mark contacted"}
            </button>
          </label>

          <label style={{ fontSize: 12.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Member response
            <select
              value={action.response || ""}
              onChange={(e) => updateRetentionAction(member.id, { response: e.target.value })}
              disabled={!action.contacted}
            >
              <option value="">Pending validation</option>
              <option value="Responded positively">Responded positively</option>
              <option value="No response">No response</option>
              <option value="Declined">Declined</option>
            </select>
          </label>

          <label style={{ fontSize: 12.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Return to gym
            <button
              className={`btn btn-sm${action.returned ? " btn-primary" : ""}`}
              onClick={() => updateRetentionAction(member.id, { returned: !action.returned })}
              disabled={!action.contacted}
            >
              {action.returned ? "Returned" : "Record return"}
            </button>
          </label>

          <label style={{ fontSize: 12.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Renewal
            <button
              className={`btn btn-sm${action.renewed ? " btn-primary" : ""}`}
              onClick={() => updateRetentionAction(member.id, { renewed: !action.renewed })}
              disabled={!action.returned}
            >
              {action.renewed ? "Renewed" : "Record renewal"}
            </button>
          </label>
        </div>
      </div>
    </div>
  );
}
