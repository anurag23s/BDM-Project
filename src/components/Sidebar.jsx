import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BellRing,
  Users,
  CalendarDays,
  Package,
  Receipt,
  BarChart3,
  Boxes,
  Gauge,
  Info,
} from "lucide-react";

const navItems = [
  { to: "/", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/retention", label: "Retention Dashboard", icon: BellRing },
  { to: "/members", label: "Members", icon: Users },
  { to: "/attendance", label: "Attendance", icon: CalendarDays },
  { to: "/supplements/inventory", label: "Supplement Inventory", icon: Package },
  { to: "/supplements/transactions", label: "Supplement Transactions", icon: Receipt },
  { to: "/inventory-analysis", label: "Inventory Analysis", icon: BarChart3 },
  { to: "/eoq-rop", label: "EOQ & ROP", icon: Boxes },
  { to: "/sensitivity", label: "Sensitivity Analysis", icon: Gauge },
  { to: "/about", label: "About / Capstone", icon: Info },
];

export default function Sidebar({ open }) {
  return (
    <aside className={`sidebar${open ? " open" : ""}`}>
      <div className="sidebar-brand">
        <div className="sidebar-brand-name">Armstrong Gym</div>
        <div className="sidebar-brand-sub">Muzaffarpur, Bihar &middot; BDM Capstone</div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}
          >
            <item.icon size={16} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        Decision-support prototype.
        <br />
        Not a production business system.
      </div>
    </aside>
  );
}
