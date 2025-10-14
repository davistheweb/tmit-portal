import React, { useRef, useEffect } from "react";
import { Link } from "react-router";
import { useStudentProfileDetails } from "@/hooks/useStudentProfileDetails";

interface ProfileDropdownProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ open, setOpen }) => {
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]);

  const {
    profile,
    // isLoading,
    error,
    // refetch
  } = useStudentProfileDetails();

  if (!open) return null;

  if (error || !profile) {
    return (
      <div className="text-center py-6 text-red-600">
        {error || "Failed to load student profile."}
      </div>
    );
  }

  const studentProfile = profile.profile;
  const fullName = `${studentProfile.surname} ${studentProfile.middle_name} ${studentProfile.last_name}`;

  return (
    <div
      ref={profileRef}
      className="absolute right-0 mt-2 w-72 bg-white border rounded shadow-md z-30"
    >
      <div className="px-4 py-2 text-sm font-bold text-gray-700 border-b">
        {fullName}
      </div>
      <Link
        to="profile"
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        Profile
      </Link>
      <Link
        to="change-password"
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        Change Password
      </Link>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 border-t w-full"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileDropdown;
