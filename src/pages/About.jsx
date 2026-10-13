import React from "react";
import { AlertCircle } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";
import { useAppData } from "../context/AppDataContext.jsx";
import { gymInfo, ownerInfo, studentInfo, photoInfo } from "../data/about.js";

export default function About() {
  const { resetDemoData } = useAppData();

  return (
    <>
      <PageHeader title="About / Capstone" purpose="What this application is, who built it, and what it deliberately is not." />

      <div className="grid grid-2">
        <div className="panel">
          <div className="panel-title">Gym details</div>
          <div className="product-card-row">
            <span>Name</span>
            <span>{gymInfo.name}</span>
          </div>
          <div className="product-card-row">
            <span>Location</span>
            <span>{gymInfo.location}</span>
          </div>
          <div className="product-card-row">
            <span>Type</span>
            <span>{gymInfo.type}</span>
          </div>
          <div className="product-card-row">
            <span>Established</span>
            <span>{gymInfo.established}</span>
          </div>
        </div>

        <div className="panel">
          <PhotoFrame path={photoInfo.path} caption={photoInfo.caption} />
        </div>
      </div>

      <div className="panel">
        <div className="panel-title">Owner details</div>
        <div className="product-card-row">
          <span>Name</span>
          <span>{ownerInfo.name}</span>
        </div>
        <div className="product-card-row">
          <span>Role</span>
          <span>{ownerInfo.role}</span>
        </div>
        <div className="product-card-row">
          <span>Contact</span>
          <span>{ownerInfo.contact}</span>
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "flex-start",
            marginTop: 12,
            fontSize: 12,
            color: "var(--ochre)",
            background: "var(--ochre-soft)",
            padding: 10,
            borderRadius: 6,
          }}
        >
          <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>{ownerInfo.note}</span>
        </div>
      </div>

      <div className="panel">
        <div className="panel-title">Student / project author details</div>
        <div className="product-card-row">
          <span>Name</span>
          <span>{studentInfo.name}</span>
        </div>
        <div className="product-card-row">
          <span>Roll number</span>
          <span className="mono">{studentInfo.rollNumber}</span>
        </div>
        <div className="product-card-row">
          <span>Email</span>
          <span className="mono">{studentInfo.email}</span>
        </div>
        <div className="product-card-row">
          <span>Program</span>
          <span>{studentInfo.program}</span>
        </div>
        <div className="product-card-row">
          <span>Institution</span>
          <span>{studentInfo.institution}</span>
        </div>
        <div className="product-card-row">
          <span>Project title</span>
          <span style={{ textAlign: "right", maxWidth: 320 }}>{studentInfo.projectTitle}</span>
        </div>
        <div className="product-card-row">
          <span>Submission</span>
          <span>{studentInfo.submissionType}</span>
        </div>
      </div>

      <div className="panel">
        <div className="panel-title">What this application is</div>
        <p style={{ fontSize: 13 }}>
          An operational frontend prototype that translates the capstone analysis into a practical
          decision-support system for Armstrong Gym: turning attendance gaps into a monitoring workflow, and
          survey-based supplement interest into an auditable, assumption-transparent inventory plan.
        </p>
      </div>

      <div className="panel">
        <div className="panel-title">What this application is not</div>
        <ul style={{ margin: "6px 0 0", paddingLeft: 16, fontSize: 13 }}>
          <li>Not a production-ready commercial gym-management platform</li>
          <li>Not a system with real payment, messaging or supplier integrations</li>
          <li>Not a churn-prediction or machine-learning system</li>
          <li>Not a source of guaranteed revenue, profit or ROI figures</li>
        </ul>
      </div>

      <div className="panel">
        <div className="panel-title">The story this app tells</div>
        <p style={{ fontSize: 13, fontFamily: "var(--font-mono)", lineHeight: 1.9 }}>
          Business problem &rarr; Primary data &rarr; Attendance signal &rarr; Financial context &rarr; Member
          segmentation &rarr; Supplement opportunity &rarr; Inventory planning &rarr; Controlled pilots &rarr;
          Actual data collection &rarr; Validation &rarr; Iteration
        </p>
        <p style={{ fontSize: 13 }}>
          The goal is to move Armstrong Gym from <strong>manual + assumption-driven</strong> to{" "}
          <strong>tracked + evidence-driven</strong> decision-making.
        </p>
      </div>

      <div className="panel">
        <div className="panel-title">Reset local demo data</div>
        <p style={{ fontSize: 12.8, color: "var(--muted)" }}>
          Clears all locally-entered retention actions, supplement transactions, and added candidate products
          stored in this browser. The original project dataset is never affected.
        </p>
        <button
          className="btn btn-danger"
          onClick={() => {
            if (window.confirm("Clear all locally entered demo data in this browser?")) resetDemoData();
          }}
        >
          Reset local demo data
        </button>
      </div>
    </>
  );
}
