// src/components/Profile.tsx
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Printer } from "lucide-react";
import { schoolLogo } from "@/assets";

const student = {
  surname: "Josiah",
  middle_name: "Davis",
  last_name: "Chimzuruoke",
  gender: "male",
  dob: "2002-01-11",
  country: "Nigeria",
  state: "Cross River",
  lga: "Ogoja",
  home_town: "Ishibori",
  phone: "08012345678",
  nin: "12345678900",
  contact_address: "10 Student Lane",
  blood_group: "O",
  genotype: "AA",
  religion: "Christianity",
  department: "Computer Science",
  year: "2025",
};

const fields: [string, string][] = [
  [
    "Full Name",
    `${student.surname} ${student.middle_name} ${student.last_name}`,
  ],
  ["Gender", student.gender],
  ["Date of Birth", student.dob],
  ["Country", student.country],
  ["State of Origin", student.state],
  ["LGA of Origin", student.lga],
  ["Home Town", student.home_town],
  ["Phone", student.phone],
  ["NIN", student.nin],
  ["Contact Address", student.contact_address],
  ["Blood Group", student.blood_group],
  ["Genotype", student.genotype],
  ["Religion", student.religion],
  ["Department", student.department],
  ["Year", student.year],
];

export function Profile() {
  return (
    <>
      <style>{`
        @media print {
          html, body {
            height: 100%;
          }
          body * {
            visibility: hidden !important;
          }
          .printable-area,
          .printable-area * {
            visibility: visible !important;
          }
          .printable-area {
            position: absolute !important;
            top: 0;
            left: 0;
            width: 100%;
            min-height: 100vh;
            padding: 1in;
          }
          .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60%;
            opacity: 0.07;
            z-index: 0;
          }
          .printable-content {
            position: relative;
            z-index: 1;
          }
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
            <img src={schoolLogo} alt="School Logo" className="mx-auto h-16" />
            <h1 className="text-2xl font-bold mt-2">TMIT PORTAL</h1>
          </div>

          {/* Screen profile card */}
          <div className="bg-white rounded-2xl shadow p-4 sm:p-6 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 print:hidden">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 ring-2 ring-green-500">
                <AvatarImage src="/me.jpg" alt="Student photo" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <h2 className="text-xl sm:text-2xl font-semibold uppercase">
                {`${student.surname} ${student.middle_name} ${student.last_name}`}
              </h2>
            </div>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full sm:w-auto justify-center"
            >
              <Printer className="w-5 h-5" /> Print Details
            </button>
          </div>

          {/* Screen-only grid */}
          <div className="bg-white rounded-2xl shadow p-4 sm:p-6 mb-6 print:hidden">
            <h3 className="text-lg font-medium mb-4">Student Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

          {/* Print-only header with small student image */}
          <div className="hidden print:block text-center mb-4">
            <h1 className="text-xl font-bold">TMIT PORTAL</h1>
            <h2 className="text-lg font-medium mt-1 mb-2">
              Personal Information
            </h2>
            <img
              src="/me.jpg"
              alt="Student photo"
              className="mx-auto h-24 w-24 mb-2 print:block"
            />
          </div>

          {/* Print-only table */}
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
}
