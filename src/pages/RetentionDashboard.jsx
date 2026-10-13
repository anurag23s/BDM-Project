import React, { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import KpiCard from "../components/KpiCard.jsx";
import FilterBar from "../components/FilterBar.jsx";
import DataTable from "../components/DataTable.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import EvidenceBadge from "../components/EvidenceBadge.jsx";
import AssumptionBanner from "../components/AssumptionBanner.jsx";
import Funnel from "../components/Funnel.jsx";
import MemberDrawer from "../components/MemberDrawer.jsx";
import { members } from "../data/members.js";
import { useAppData } from "../context/AppDataContext.jsx";

const DYNAMIC_CATS = ["High", "Medium", "Low/At-Risk", "Severe Drop-off"];

export default function RetentionDashboard() {
  const { retentionActions } = useAppData();
  const [filters, setFilters] = useState({});
  const [selected, setSelected] = useState(null);

  const occupations = useMemo(
    () => Array.from(new Set(members.map((m) => m.occupation).filter(Boolean))).sort(),
    []
  );

  const monitoringPool = members.filter((m) => m.currentGap >= 15);
  const severePool = members.filter((m) => m.currentGap >= 30);
  const catCounts = DYNAMIC_CATS.reduce((acc, c) => {
    acc[c] = members.filter((m) => m.engagementCategory === c).length;
    return acc;
  }, {});

  const filtered = members.filter((m) => {
    if (filters.category && m.engagementCategory !== filters.category) return false;
    if (filters.occupation && m.occupation !== filters.occupation) return false;
    if (filters.contact) {
      const contacted = !!retentionActions[m.id]?.contacted;
      if (filters.contact === "contacted" && !contacted) return false;
      if (filters.contact === "not-contacted" && contacted) return false;
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!m.name.toLowerCase().includes(q) && !m.id.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const contactedCount = Object.values(retentionActions).filter((a) => a.contacted).length;
  const respondedCount = Object.values(retentionActions).filter((a) => a.response === "Responded positively").length;
  const returnedCount = Object.values(retentionActions).filter((a) => a.returned).length;
  const renewedCount = Object.values(retentionActions).filter((a) => a.renewed).length;

  return (
    <>
      <PageHeader
        title="Retention Dashboard"
        purpose="Turns attendance gaps into an actionable outreach workflow. Uses each member's live (dynamic) gap since their last observed visit, as of the dashboard reference date -- 5 Jan 2026."
      />

      <div className="grid grid-4">
        <KpiCard
          value={monitoringPool.length}
          label="15+ day monitoring pool"
          evidenceType="derived"
          tooltip="Members whose current gap since last observed attendance is 15 days or more, as of 5 Jan 2026."
        />
        <KpiCard value={severePool.length} label="30+ day severe" evidenceType="derived" />
        <KpiCard value={catCounts.High} label={"High engagement (≤ 7 days)"} evidenceType="derived" />
        <KpiCard value={catCounts.Medium} label="Medium (8-14 days)" evidenceType="derived" />
      </div>

      <AssumptionBanner variant="info">
        This dashboard already exists and is running against the current dataset. Its dynamic gap counts are
        lower than the report&apos;s retrospective 75.76% headline because 23 members who had a severe gap
        earlier in the study window have since returned to active attendance -- the two metrics measure
        different things (see the note on the Members page tooltip for the distinction).
      </AssumptionBanner>

      <div className="panel">
        <div className="panel-title">Outreach funnel</div>
        <div className="panel-subtitle">Local demo state -- not persisted to a backend. Resets if browser storage is cleared.</div>
        <Funnel
          stages={[
            { label: "Flagged (15+ days)", count: monitoringPool.length },
            { label: "Contacted", count: contactedCount },
            { label: "Responded", count: respondedCount },
            { label: "Returned", count: returnedCount },
            { label: "Renewed", count: renewedCount },
          ]}
        />
      </div>

      <div className="grid grid-2">
        <div className="panel">
          <div className="panel-title">Process KPI</div>
          <p style={{ fontSize: 13 }}>100% of flagged members contacted within 3 months.</p>
          <EvidenceBadge evidenceType="planning" label="Target -- not yet measured" />
        </div>
        <div className="panel">
          <div className="panel-title">Outcome KPIs</div>
          <ul style={{ margin: "4px 0 0", paddingLeft: 16, fontSize: 12.8 }}>
            <li>Response rate &mdash; <span className="badge badge-neutral">Pending validation</span></li>
            <li>Return-to-gym rate &mdash; <span className="badge badge-neutral">Pending validation</span></li>
            <li>Renewal rate &mdash; <span className="badge badge-neutral">Pending validation</span></li>
            <li>Reduction in prolonged gaps &mdash; <span className="badge badge-neutral">Pending validation</span></li>
          </ul>
        </div>
      </div>

      <div className="panel">
        <div className="panel-title">Monitoring pool</div>
        <FilterBar
          filters={[
            { key: "search", type: "search", label: "Search name or ID" },
            {
              key: "category",
              type: "select",
              label: "Gap category",
              options: DYNAMIC_CATS.map((c) => ({ value: c, label: c })),
            },
            {
              key: "occupation",
              type: "select",
              label: "Occupation",
              options: occupations.map((o) => ({ value: o, label: o })),
            },
            {
              key: "contact",
              type: "select",
              label: "Contact status",
              options: [
                { value: "contacted", label: "Contacted" },
                { value: "not-contacted", label: "Not contacted" },
              ],
            },
          ]}
          values={filters}
          onChange={(key, value) => setFilters((f) => ({ ...f, [key]: value }))}
        />
        <DataTable
          columns={[
            { key: "id", label: "Member ID", render: (r) => <span className="mono">{r.id}</span> },
            { key: "name", label: "Name" },
            { key: "lastAttendance", label: "Last attendance", render: (r) => <span className="mono">{r.lastAttendance}</span> },
            { key: "currentGap", label: "Current gap", render: (r) => `${r.currentGap} days` },
            { key: "engagementCategory", label: "Category", render: (r) => <StatusBadge status={r.engagementCategory} /> },
            { key: "occupation", label: "Occupation", render: (r) => r.occupation || "Not recorded" },
            {
              key: "contact",
              label: "Contact status",
              render: (r) => <StatusBadge status={retentionActions[r.id]?.contacted ? "Contacted" : "Not contacted"} />,
            },
            {
              key: "response",
              label: "Response",
              render: (r) => retentionActions[r.id]?.response || "Not recorded",
            },
            {
              key: "action",
              label: "",
              render: (r) => (
                <button className="btn btn-sm" onClick={() => setSelected(r)}>
                  Open
                </button>
              ),
            },
          ]}
          rows={filtered}
          emptyTitle="No members match these filters"
          emptyDescription="Try clearing a filter."
        />
      </div>

      <MemberDrawer member={selected} onClose={() => setSelected(null)} />
    </>
  );
}
