import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} />
      <div className="main-area">
        <Topbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
