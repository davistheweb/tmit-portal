import React from "react";
import { StudentProfileDetailsProvider } from "@/contexts/StudentProfileDetailsContext";
import { ProfileBody } from "./ProfileBody";

export const Profile: React.FC = () => {
  return (
    <StudentProfileDetailsProvider>
      <ProfileBody />
    </StudentProfileDetailsProvider>
  );
};
