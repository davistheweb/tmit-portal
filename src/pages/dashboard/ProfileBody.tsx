import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Printer } from "lucide-react";
import { schoolLogo } from "@/assets";
import { useStudentProfileDetails } from "@/hooks/useStudentProfileDetails";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const ProfileBody: React.FC = () => {
  const {
    profile,
    isLoading,
    error,
    // refetch
  } = useStudentProfileDetails();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12 w-full h-full">
        <div className="h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="text-center py-6 text-red-600">
        {error || "Failed to load student profile."}
      </div>
    );
  }

  const studentProfile = profile.profile;
  const fullName = `${studentProfile.surname} ${studentProfile.middle_name} ${studentProfile.last_name}`;
  console.log(studentProfile.image_path);

  const fields: [string, string][] = [
    ["Full Name", fullName],
    ["Department", JSON.parse(studentProfile.department).name],
    ["Date of Birth", studentProfile.dob],
    ["Country", studentProfile.country],
    ["State of Origin", studentProfile.state],
    ["LGA of Origin", studentProfile.lga],
    ["Home Town", studentProfile.home_town],
    ["Phone", studentProfile.phone],
    ["NIN", studentProfile.nin],
    ["Contact Address", studentProfile.contact_address],
    ["Blood Group", studentProfile.blood_group],
    ["Genotype", studentProfile.genotype],
    ["Religion", studentProfile.religion],
    ["Year", studentProfile.year],
  ];

  return (
    <>
      <style>{`
        @media print {
          html, body { height: 100%; }
          body * { visibility: hidden !important; }
          .printable-area, .printable-area * { visibility: visible !important; }
          .printable-area { position: absolute !important; top: 0; left: 0; width: 100%; min-height: 100vh; padding: 1in; }
          .watermark { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 60%; opacity: 0.07; z-index: 0; }
          .printable-content { position: relative; z-index: 1; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 printable-area">
        {/* Watermark (print only) */}
        <img
          src={schoolLogo}
          alt="Watermark"
          className="watermark hidden print:block"
        />

        <div className="printable-content">
          {/* Screen header */}
          <div className="text-center mb-6 print:hidden">
            <img
              src={schoolLogo}
              alt="School Logo"
              className="mx-auto h-16"
              draggable={false}
            />
            <h1 className="text-2xl font-bold mt-2">TMIT PORTAL</h1>
          </div>

          {/* Screen profile card */}
          <div className="bg-white rounded-2xl shadow p-4 sm:p-6 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 print:hidden">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-fit ring-2 ring-green-500">
                <AvatarImage
                  src={`${API_BASE_URL}/storage/${studentProfile.image_path}`}
                  alt="Student photo"
                  className="text-center flex w-full"
                />
                <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl sm:text-2xl font-semibold uppercase">
                {fullName}
              </h2>
            </div>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full sm:w-auto justify-center cursor-pointer"
            >
              <Printer className="w-5 h-5" /> Print Details
            </button>
          </div>

          {/* Screen-only grid */}
          <div className="bg-white rounded-2xl shadow p-4 sm:p-6 mb-6 print:hidden">
            <h3 className="text-lg font-medium mb-4 text-center">
              Student Information
            </h3>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {fields.map(([label, value]) => (
                  <div key={label}>
                    <p className="text-sm text-gray-500 mb-1">{label}</p>
                    <p className="font-medium text-gray-900 break-words">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* this is for (Print-only header with small student image) */}
          <div className="hidden print:block text-center mb-4">
            <h1 className="text-xl font-bold">TMIT PORTAL</h1>
            <h2 className="text-lg font-medium mt-1 mb-2">
              Personal Information
            </h2>
            <img
              src={`${API_BASE_URL}/storage/${studentProfile.image_path}`}
              alt="Student photo"
              className="mx-auto h-24 w-24 mb-2 print:block"
            />
          </div>

          {/* this Print-only table */}
          <table className="hidden print:table w-full table-auto border-collapse mb-6 text-sm sm:text-base">
            <tbody>
              {fields.map(([label, value]) => (
                <tr key={label} className="border-b">
                  <td className="py-2 pr-4 font-semibold align-top w-1/3">
                    {label}
                  </td>
                  <td className="py-2 break-words">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
