import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { Login, Register } from "./auth/pages";
import DashboardLayout from "./pages/dashboard/_components/layouts/DashboardLayout";
import { Index } from "./pages/dashboard/Index";
import { Profile } from "./pages/dashboard/Profile";

const App: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-x-hidden bg-white text-black">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          <Route>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
          </Route>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Index />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<p>Not found!</p>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
