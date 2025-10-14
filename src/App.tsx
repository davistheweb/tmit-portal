import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Login, Register } from "./auth/pages";
import IndexPage from "./IndexPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { ProtectedOnboarding } from "./routes/ProtecedOnBoarding";
import {
  AcceptanceFeePage,
  BookHostel,
  ChangePassword,
  Dashboard,
  DashboardIndex,
  Fees,
  Hostel,
  OnBoarding,
  PaymentSummary,
  Profile,
  ResultPage,
  Sessions,
} from "./pages/dashboard";

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
            <Route index element={<DashboardIndex />} />
            <Route path="profile" element={<Profile />} />
            <Route path="fees" element={<Fees />} />
            <Route path="fees/sessions" element={<Sessions />} />
            <Route path="fees/pay_fees" element={<PaymentSummary />} />
            <Route path="acceptance-fee" element={<AcceptanceFeePage />} />
            <Route path="hostels" element={<Hostel />} />
            <Route path="hostels/book-hostel" element={<BookHostel />} />
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
