import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Login, Register } from "./auth/pages";
import { Dashboard } from "@/pages/dashboard/Dashboard";
import { Index } from "@/pages/dashboard/Index";
import { Profile } from "@/pages/dashboard/Profile";
import Fees from "@/pages/dashboard/Fees";
import ChangePassword from "@/pages/dashboard/ChangePassword";
import OnBoarding from "@/pages/dashboard/OnBoarding";
import IndexPage from "./IndexPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { ProtectedOnboarding } from "./routes/ProtecedOnBoarding";
import { ResultPage } from "@/pages/dashboard/ResultPage";

const App: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-x-hidden bg-white text-black">
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
          </Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Index />} />
            <Route path="profile" element={<Profile />} />
            <Route path="fees" element={<Fees />} />
            <Route path="results" element={<ResultPage />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route
              path="onboarding"
              element={
                <ProtectedOnboarding>
                  <OnBoarding />
                </ProtectedOnboarding>
              }
            />
          </Route>
          <Route path="*" element={<p>Not found!</p>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
