import React, { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import FilterBar from "../components/FilterBar.jsx";
import DataTable from "../components/DataTable.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import MemberDrawer from "../components/MemberDrawer.jsx";
import EvidenceBadge from "../components/EvidenceBadge.jsx";
import { members } from "../data/members.js";

export default function Members() {
  const [filters, setFilters] = useState({});
  const [selected, setSelected] = useState(null);

  const occupations = useMemo(
    () => Array.from(new Set(members.map((m) => m.occupation).filter(Boolean))).sort(),
    []
  );

  const filtered = members.filter((m) => {
    if (filters.occupation && m.occupation !== filters.occupation) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!m.name.toLowerCase().includes(q) && !m.id.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <>
      <PageHeader
        title="Members"
        purpose="A searchable directory built from the project's attendance and demographic data. Fields the project does not contain (phone, email, payment status, renewal date) are intentionally omitted rather than invented."
      >
        <EvidenceBadge evidenceType="observed" />
      </PageHeader>

      <div className="panel">
        <FilterBar
          filters={[
            { key: "search", type: "search", label: "Search name or ID" },
            { key: "occupation", type: "select", label: "Occupation", options: occupations.map((o) => ({ value: o, label: o })) },
          ]}
          values={filters}
          onChange={(key, value) => setFilters((f) => ({ ...f, [key]: value }))}
        />
        <DataTable
          columns={[
            { key: "id", label: "Member ID", render: (r) => <span className="mono">{r.id}</span> },
            { key: "name", label: "Name" },
            { key: "occupation", label: "Occupation", render: (r) => r.occupation || "Not recorded" },
            { key: "totalAttendance", label: "Total observed attendance", render: (r) => `${r.totalAttendance ?? "Not recorded"}` },
            { key: "lastAttendance", label: "Last observed attendance", render: (r) => <span className="mono">{r.lastAttendance}</span> },
            { key: "currentGap", label: "Current gap (days)", render: (r) => r.currentGap },
            { key: "engagementCategory", label: "Gap category", render: (r) => <StatusBadge status={r.engagementCategory} /> },
            {
              key: "action",
              label: "",
              render: (r) => (
                <button className="btn btn-sm" onClick={() => setSelected(r)}>
                  View
                </button>
              ),
            },
          ]}
          rows={filtered}
          emptyTitle="No members match this search"
          emptyDescription="Try a different name, ID or occupation filter."
        />
      </div>

      <MemberDrawer member={selected} onClose={() => setSelected(null)} />
    </>
  );
}
