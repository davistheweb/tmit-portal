import React from "react";

interface Course {
  code: string;
  title: string;
  credits: number;
  grade: string;
  status: string;
}

const courses: Course[] = [
  {
    code: "CSC101",
    title: "Introduction to Programming",
    credits: 3,
    grade: "A",
    status: "Completed",
  },
  {
    code: "MAT201",
    title: "Calculus I",
    credits: 3,
    grade: "B+",
    status: "Completed",
  },
  {
    code: "PHY301",
    title: "Physics I",
    credits: 3,
    grade: "C",
    status: "In Progress",
  },
  {
    code: "ENG401",
    title: "English Literature",
    credits: 3,
    grade: "A",
    status: "Completed",
  },
  {
    code: "ENG401",
    title: "English Literature",
    credits: 3,
    grade: "A",
    status: "Completed",
  },
  {
    code: "ENG401",
    title: "English Literature",
    credits: 3,
    grade: "A",
    status: "Completed",
  },
  {
    code: "ENG401",
    title: "English Literature",
    credits: 3,
    grade: "A",
    status: "Completed",
  },
  {
    code: "ENG401",
    title: "English Literature",
    credits: 3,
    grade: "A",
    status: "Completed",
  },
  {
    code: "ENG401",
    title: "English Literature",
    credits: 3,
    grade: "A",
    status: "Completed",
  },
  {
    code: "ENG401",
    title: "English Literature",
    credits: 3,
    grade: "A",
    status: "Completed",
  },
  {
    code: "ENG401",
    title: "English Literature",
    credits: 3,
    grade: "A",
    status: "Completed",
  },
  {
    code: "ENG401",
    title: "English Literature",
    credits: 3,
    grade: "A",
    status: "Completed",
  },
];

const ResultPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Main Content Area */}
      <div className="flex-1 p-2 sm:p-4">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          {/* Top Section: Registration Number and Semester Selector */}
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <div className="text-base sm:text-lg font-semibold text-gray-800">
              Registration number: TMIT/CSC/25/2345
            </div>
            <div className="flex items-center space-x-2">
              <select
                className="border border-gray-300 rounded p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                defaultValue="summer2023"
              >
                <option value="fall2023">Fall 2023</option>
                <option value="spring2024">Spring 2024</option>
                <option value="summer2023">Summer 2023</option>
                <option value="summer2024">Summer 2024</option>
              </select>
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                Submit
              </button>
            </div>
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 sm:p-3 text-left text-gray-700 font-semibold uppercase text-xs sm:text-sm">
                    Course Code
                  </th>
                  <th className="p-2 sm:p-3 text-left text-gray-700 font-semibold uppercase text-xs sm:text-sm whitespace-normal">
                    Course Title
                  </th>
                  <th className="p-2 sm:p-3 text-center text-gray-700 font-semibold uppercase text-xs sm:text-sm hidden sm:table-cell">
                    Credits
                  </th>
                  <th className="p-2 sm:p-3 text-center text-gray-700 font-semibold uppercase text-xs sm:text-sm">
                    Grade
                  </th>
                  <th className="p-2 sm:p-3 text-center text-gray-700 font-semibold uppercase text-xs sm:text-sm hidden sm:table-cell">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-2 sm:p-3 text-gray-800 text-xs sm:text-sm">
                      {course.code}
                    </td>
                    <td className="p-2 sm:p-3 text-gray-800 text-xs sm:text-sm whitespace-normal">
                      {course.title}
                    </td>
                    <td className="p-2 sm:p-3 text-center text-gray-800 text-xs sm:text-sm hidden sm:table-cell">
                      {course.credits}
                    </td>
                    <td className="p-2 sm:p-3 text-center text-gray-800 text-xs sm:text-sm">
                      {course.grade}
                    </td>
                    <td className="p-2 sm:p-3 text-center text-gray-800 text-xs sm:text-sm hidden sm:table-cell">
                      {course.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
