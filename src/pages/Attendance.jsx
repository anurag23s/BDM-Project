import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
import PageHeader from "../components/PageHeader.jsx";
import ChartCard from "../components/ChartCard.jsx";
import { monthlyFinancials } from "../data/financial.js";
import { retrospectiveGapCategories, retrospectiveAtRisk } from "../data/attendance.js";
import { members } from "../data/members.js";

const GAP_COLORS = { High: "#1f5e5b", Medium: "#8b9c97", "Low / At-Risk": "#b5762c", "Severe Drop-off": "#9c3d2e" };

export default function Attendance() {
  const slotCounts = {};
  members.forEach((m) => {
    const s = m.preferredSlot || "Not recorded";
    slotCounts[s] = (slotCounts[s] || 0) + 1;
  });
  const slotData = Object.entries(slotCounts).map(([slot, count]) => ({ slot, count }));

  const dynamicCatCounts = {};
  members.forEach((m) => {
    dynamicCatCounts[m.engagementCategory] = (dynamicCatCounts[m.engagementCategory] || 0) + 1;
  });
  const dynamicData = Object.entries(dynamicCatCounts).map(([category, count]) => ({ category, count }));

  return (
    <>
      <PageHeader
        title="Attendance"
        purpose="Explores attendance volume, active-member movement, and both the retrospective and live (dynamic) gap classifications."
      />

      <div className="grid grid-2">
        <ChartCard title="Active members by month" evidenceType="observed" sourceFooter="Attendance registers, Jun-Dec 2025">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyFinancials}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e9e7" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={32} />
              <Tooltip />
              <Bar dataKey="activeMembers" name="Active members" fill="#1f5e5b" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Maximum gap distribution (retrospective)"
          evidenceType="derived"
          sourceFooter="Maximum observed gap per member across full study window"
        >
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={retrospectiveGapCategories}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e9e7" vertical={false} />
              <XAxis dataKey="category" tick={{ fontSize: 10.5 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={32} />
              <Tooltip />
              <Bar dataKey="count" name="Members" radius={[3, 3, 0, 0]}>
                {retrospectiveGapCategories.map((entry) => (
                  <Cell key={entry.category} fill={GAP_COLORS[entry.category]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Gap category breakdown (live, as of 5 Jan 2026)"
          evidenceType="derived"
          sourceFooter="Dynamic gap since each member's last observed visit"
        >
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={dynamicData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e9e7" vertical={false} />
              <XAxis dataKey="category" tick={{ fontSize: 10.5 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={32} />
              <Tooltip />
              <Bar dataKey="count" name="Members" fill="#1f5e5b" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Members by preferred attendance slot" evidenceType="observed" sourceFooter="Attendance registers">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={slotData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e9e7" vertical={false} />
              <XAxis dataKey="slot" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={32} />
              <Tooltip />
              <Bar dataKey="count" name="Members" fill="#8b9c97" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-2">
        <div className="panel">
          <div className="panel-title">What this analysis can tell us</div>
          <ul style={{ margin: "6px 0 0", paddingLeft: 16, fontSize: 12.8 }}>
            <li>Identify prolonged attendance interruptions ({(retrospectiveAtRisk.share * 100).toFixed(2)}% of members reached 15+ days at some point)</li>
            <li>Prioritize which members need follow-up first</li>
            <li>Monitor whether prolonged gaps are increasing or decreasing over time</li>
          </ul>
        </div>
        <div className="panel">
          <div className="panel-title">What this analysis cannot establish</div>
          <ul style={{ margin: "6px 0 0", paddingLeft: 16, fontSize: 12.8 }}>
            <li>Confirmed churn or membership cancellation</li>
            <li>A causal retention effect of any intervention</li>
            <li>Guaranteed prediction of who will or won&apos;t return</li>
          </ul>
        </div>
      </div>
    </>
  );
}
