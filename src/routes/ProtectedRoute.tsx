import React from "react";
import { Navigate, useLocation } from "react-router";

export const ProtectedRoute = ({
  children,
}: {
  children: React.JSX.Element;
}) => {
  const token = localStorage.getItem("token");
  const profileCompleted = localStorage.getItem("profile_completed");

  const location = useLocation();

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  const isAccessingOnboarding = location.pathname.includes(
    "/dashboard/onboarding"
  );

  if (profileCompleted !== "true" && !isAccessingOnboarding) {
    return <Navigate to="/dashboard/onboarding" replace />;
  }

  return children;
};
