import React from "react";
import { Navigate } from "react-router";

export const ProtectedOnboarding = ({
  children,
}: {
  children: React.JSX.Element;
}) => {
  const profileCompleted = localStorage.getItem("profile_completed");

  // If profile_completed is "true", redirect away
  if (profileCompleted === "true") {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise, allow onboarding
  return children;
};
