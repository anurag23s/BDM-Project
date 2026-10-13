import React from "react";
import { Menu } from "lucide-react";

export default function Topbar({ onToggleSidebar }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="sidebar-toggle" onClick={onToggleSidebar} aria-label="Toggle navigation">
          <Menu size={18} />
        </button>
        <div>
          <div className="topbar-title">Armstrong Gym Analytics</div>
          <div className="topbar-meta">Muzaffarpur, Bihar &middot; Attendance window: 2 Jun 2025 &ndash; 5 Jan 2026</div>
        </div>
      </div>
      <div className="topbar-status">
        <span className="status-dot" />
        Prototype data as of dashboard reference date: 5 Jan 2026
      </div>
    </header>
  );
}
