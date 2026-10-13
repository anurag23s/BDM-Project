import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import PageHeader from "../components/PageHeader.jsx";
import KpiCard from "../components/KpiCard.jsx";
import ChartCard from "../components/ChartCard.jsx";
import AssumptionBanner from "../components/AssumptionBanner.jsx";
import { attendanceWindow, retrospectiveAtRisk, retrospectiveGapCategories } from "../data/attendance.js";
import { monthlyFinancials, octNovMovement } from "../data/financial.js";
import { demandTotals } from "../data/supplement.js";

const money = (n) => `\u20b9${n.toLocaleString("en-IN")}`;
const GAP_COLORS = { High: "#1f5e5b", Medium: "#8b9c97", "Low / At-Risk": "#b5762c", "Severe Drop-off": "#9c3d2e" };

export default function Overview() {
  return (
    <>
      <PageHeader
        title="Overview"
        purpose="A single-screen summary of Armstrong Gym's attendance signal, financial exposure, and the two current action priorities."
      />

      <div className="grid grid-4">
        <KpiCard
          value={attendanceWindow.trackedMembers}
          label="Tracked members"
          evidenceType="observed"
          tooltip="132 members tracked across the 2 Jun 2025 - 5 Jan 2026 attendance window."
        />
        <KpiCard
          value={attendanceWindow.totalRecords.toLocaleString("en-IN")}
          label="Attendance records"
          evidenceType="observed"
          tooltip="8,404 handwritten register entries, OCR-digitized and manually cross-checked."
        />
        <KpiCard
          value={`${(retrospectiveAtRisk.share * 100).toFixed(2)}%`}
          label="15+ day maximum gap signal"
          evidenceType="derived"
          tooltip="100 of 132 tracked members had a maximum observed attendance gap of at least 15 days. This is an early-warning disengagement signal, not confirmed churn."
        />
        <KpiCard
          value="₹5.77L"
          label="Projected 6-month gross contribution (planning estimate)"
          evidenceType="planning"
          tooltip="Scenario-based six-month projected gross contribution derived from survey interest and consumption assumptions. It is not actual revenue or net profit."
        />
      </div>

      <div className="grid grid-2" style={{ marginTop: 16 }}>
        <ChartCard title="Active members by month" evidenceType="observed" sourceFooter="Armstrong Gym attendance registers, Jun-Dec 2025">
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

        <ChartCard title="Estimated subscription revenue by month" evidenceType="derived" sourceFooter="Active members x applicable subscription fee">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyFinancials}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e9e7" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={44} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={(v) => money(v)} />
              <Bar dataKey="estRevenue" name="Est. revenue" fill="#8b9c97" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Estimated net profit by month" evidenceType="derived" sourceFooter="Estimated revenue minus available operating expenses">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyFinancials}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e9e7" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={44} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={(v) => money(v)} />
              <Line type="monotone" dataKey="estNetProfit" name="Est. net profit" stroke="#1f5e5b" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Maximum attendance gap distribution" evidenceType="derived" sourceFooter="Retrospective maximum-gap classification, n=132">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={retrospectiveGapCategories} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e9e7" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="category" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={100} />
              <Tooltip />
              <Bar dataKey="count" name="Members" radius={[0, 3, 3, 0]}>
                {retrospectiveGapCategories.map((entry) => (
                  <Cell key={entry.category} fill={GAP_COLORS[entry.category]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="panel" style={{ marginTop: 16 }}>
        <div className="panel-title">October &rarr; November deterioration</div>
        <div className="grid grid-3" style={{ marginTop: 10 }}>
          <div>
            <div className="kpi-label">Active members</div>
            <div className="kpi-value" style={{ fontSize: 20 }}>
              {octNovMovement.activeMembers.from} &rarr; {octNovMovement.activeMembers.to}
            </div>
            <div className="local-data-tag">{octNovMovement.activeMembers.changePct}%</div>
          </div>
          <div>
            <div className="kpi-label">Estimated subscription revenue</div>
            <div className="kpi-value" style={{ fontSize: 20 }}>
              {money(octNovMovement.estRevenue.from)} &rarr; {money(octNovMovement.estRevenue.to)}
            </div>
            <div className="local-data-tag">{octNovMovement.estRevenue.changePct}%</div>
          </div>
          <div>
            <div className="kpi-label">Estimated net profit</div>
            <div className="kpi-value" style={{ fontSize: 20 }}>
              {money(octNovMovement.estNetProfit.from)} &rarr; {money(octNovMovement.estNetProfit.to)}
            </div>
            <div className="local-data-tag">{octNovMovement.estNetProfit.changePct}%</div>
          </div>
        </div>
        <div style={{ marginTop: 14 }}>
          <AssumptionBanner>{octNovMovement.causalityNote}</AssumptionBanner>
        </div>
      </div>

      <div className="panel">
        <div className="panel-title">Current action priorities</div>
        <ul style={{ margin: "6px 0 0", paddingLeft: 18, fontSize: 13 }}>
          <li>Early-Warning Retention Dashboard &mdash; see Retention Dashboard</li>
          <li>
            Controlled Whey Protein pilot &mdash; planning basis: {demandTotals.totalUnits.toLocaleString("en-IN")} unit
            six-month scenario
          </li>
        </ul>
      </div>
    </>
  );
}
