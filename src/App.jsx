import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Overview from "./pages/Overview.jsx";
import RetentionDashboard from "./pages/RetentionDashboard.jsx";
import Members from "./pages/Members.jsx";
import Attendance from "./pages/Attendance.jsx";
import SupplementInventory from "./pages/SupplementInventory.jsx";
import SupplementTransactions from "./pages/SupplementTransactions.jsx";
import InventoryAnalysis from "./pages/InventoryAnalysis.jsx";
import EOQROP from "./pages/EOQROP.jsx";
import SensitivityAnalysis from "./pages/SensitivityAnalysis.jsx";
import About from "./pages/About.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Overview />} />
        <Route path="retention" element={<RetentionDashboard />} />
        <Route path="members" element={<Members />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="supplements/inventory" element={<SupplementInventory />} />
        <Route path="supplements/transactions" element={<SupplementTransactions />} />
        <Route path="inventory-analysis" element={<InventoryAnalysis />} />
        <Route path="eoq-rop" element={<EOQROP />} />
        <Route path="sensitivity" element={<SensitivityAnalysis />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}
