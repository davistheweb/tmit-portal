import React, { createContext, useEffect, useState, useCallback } from "react";
import { GetStudentProfileDetails } from "@/api/services/GetStudentProfileDetails";
import { type IStudentProfileDetails } from "@/types/IStudentProfileDetails";

interface StudentProfileContextType {
  profile: IStudentProfileDetails | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const StudentProfileDetailsContext = createContext<
  StudentProfileContextType | undefined
>(undefined);

export const StudentProfileDetailsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [profile, setProfile] = useState<IStudentProfileDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudentProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await GetStudentProfileDetails();

      if (typeof result === "string") {
        setError(result);
        setProfile(null);
      } else {
        setProfile(result);
        setError(null);
      }
    } catch (err) {
      setError("Failed to fetch student profile." + err);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudentProfile();
  }, [fetchStudentProfile]);

  return (
    <StudentProfileDetailsContext.Provider
      value={{
        profile,
        isLoading,
        error,
        refetch: fetchStudentProfile,
      }}
    >
      {children}
    </StudentProfileDetailsContext.Provider>
  );
};

export { StudentProfileDetailsContext };
