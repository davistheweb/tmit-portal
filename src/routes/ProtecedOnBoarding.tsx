import React from "react";
import { Navigate } from "react-router";

export const ProtectedOnboarding = ({
  children,
}: {
  children: React.JSX.Element;
}) => {
  const student_has_completed_profile_onboarding =
    localStorage.getItem("profile_completed");
  console.log(student_has_completed_profile_onboarding);

  return student_has_completed_profile_onboarding ? (
    <Navigate to="/dashboard" replace />
  ) : (
    children
  );
};
