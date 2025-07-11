import { useContext } from "react";
import { StudentProfileDetailsContext } from "@/contexts/StudentProfileDetailsContext";

export const useStudentProfileDetails = () => {
  const context = useContext(StudentProfileDetailsContext);
  if (!context) {
    throw new Error(
      "useStudentProfileDetails must be used within a StudentProfileDetailsProvider",
    );
  }
  return context;
};
