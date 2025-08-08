import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { AlertCircle, CheckCircle, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FetchStudentResults } from "@/api/services/FetchStudentResults";
import { useSessionOptions } from "@/hooks/useSessionOptions";
import {
  resultsFilterSchema,
  type ResultsFilterForm,
} from "@/lib/validators/resultsFilterSchema";
import type { CourseResult, FetchResultsRequest } from "@/types/IResults";

export const ResultPage: React.FC = () => {
  const [results, setResults] = useState<CourseResult[]>([]);
  const [gpa, setGpa] = useState<number>(0);
  const [selectedSessionLabel, setSelectedSessionLabel] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ResultsFilterForm>({
    resolver: zodResolver(resultsFilterSchema),
    defaultValues: { session: "", semester: "" },
  });

  const { sessionOptions, handleSessionChange } = useSessionOptions(setValue);

  const onSubmit = async (data: ResultsFilterForm) => {
    setIsLoading(true);
    setError(null);

    const requestData: FetchResultsRequest = {
      reg_number: user?.reg_number,
      session: data.session,
      semester: data.semester,
    };

    const result = await FetchStudentResults(requestData);
    setIsLoading(false);

    if (typeof result === "string") {
      setError(result);
      setResults([]);
      setGpa(0);
      setSelectedSessionLabel("");
      setSelectedSemester("");
      toast.error(result, { icon: <AlertCircle className="h-4 w-4" /> });
    } else {
      setResults(result.results);
      setGpa(result.gpa);
      const sessionOption = sessionOptions.find(
        (option) => option.value === data.session,
      );
      setSelectedSessionLabel(
        sessionOption ? sessionOption.label : data.session,
      );
      setSelectedSemester(data.semester);
      toast.success("Results loaded successfully", {
        icon: <CheckCircle className="h-4 w-4" />,
      });
    }
  };

  const Spinner = () => (
    <div className="flex flex-col items-center justify-center py-8 gap-2">
      <div className="h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-gray-600">Loading results...</p>
    </div>
  );

  return (
    <div className=" bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <Card className="w-full max-w-5xl bg-white border-2 border-green-200 shadow-md rounded-lg">
        <CardHeader className="bg-green-50 border-b-2 border-green-200 px-6 py-4">
          <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-green-600" />
            Check Results
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {user ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Registration Number */}
              <div className="text-sm sm:text-base font-semibold text-gray-800 uppercase">
                Registration Number:{" "}
                <span className="text-green-600 font-bold">
                  {user.reg_number}
                </span>
              </div>
              {/* Session and Semester Fields */}
              <div className="flex flex-col gap-4">
                <div>
                  <Label
                    htmlFor="session"
                    className="block mb-1 text-sm font-semibold text-gray-800 uppercase"
                  >
                    Academic Session
                  </Label>
                  <select
                    {...register("session")}
                    onChange={handleSessionChange}
                    className="w-full px-3  py-2 bg-white border-2 border-green-600 rounded-sm text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 appearance-auto cursor-pointer"
                  >
                    <option value="" disabled>
                      Select Academic Session
                    </option>
                    {sessionOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.session && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.session.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="semester"
                    className="block mb-1 text-sm font-semibold text-gray-800 uppercase"
                  >
                    Select Semester
                  </Label>
                  <select
                    {...register("semester")}
                    className="w-full px-3 py-2 bg-white border-2 border-green-600 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 appearance-auto cursor-pointer"
                  >
                    <option value="" disabled>
                      Select Semester
                    </option>
                    <option value="First">First</option>
                    <option value="Second">Second</option>
                  </select>
                  {errors.semester && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.semester.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md uppercase cursor-pointer"
                >
                  {isSubmitting || isLoading ? "Loading..." : "Check"}
                </Button>
              </div>
              {/* Results Section */}
              {isLoading ? (
                <Spinner />
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-8 gap-3">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                  <p className="text-sm text-gray-700">{error}</p>
                  <Button
                    onClick={() => handleSubmit(onSubmit)()}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md uppercase"
                  >
                    Try Again
                  </Button>
                </div>
              ) : selectedSessionLabel && selectedSemester ? (
                <div className="space-y-6">
                  <div className="bg-green-50 p-3 rounded-md">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Your Results for {selectedSessionLabel} Session,{" "}
                      {selectedSemester} Semester
                    </h2>
                    <div className="mt-2 bg-green-600 text-white font-semibold px-3 py-1 rounded-md inline-block">
                      GPA: {gpa.toFixed(2)}
                    </div>
                  </div>
                  {results.length > 0 ? (
                    <>
                      {/* Mobile: Cards */}
                      <div className="block lg:hidden space-y-4">
                        {results.map((course, index) => (
                          <div
                            key={index}
                            className="bg-white border border-green-200 p-4 rounded-md shadow-sm"
                          >
                            <p className="text-sm font-semibold text-gray-800">
                              {course.course_title}
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-2">
                              <p>Code: {course.course_code}</p>
                              <p>Credits: {course.credit_unit}</p>
                              <p>Score: {course.score}</p>
                              <p>Grade: {course.grade}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Desktop: Table */}
                      <div className="hidden lg:block">
                        <table className="w-full bg-white border border-green-200 rounded-md">
                          <thead className="bg-green-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                                Course Code
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                                Course Title
                              </th>
                              <th className="px-4 py-2 text-center text-xs font-semibold text-gray-700 uppercase">
                                Credits
                              </th>
                              <th className="px-4 py-2 text-center text-xs font-semibold text-gray-700 uppercase">
                                Score
                              </th>
                              <th className="px-4 py-2 text-center text-xs font-semibold text-gray-700 uppercase">
                                Grade
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-green-100">
                            {results.map((course, index) => (
                              <tr key={index}>
                                <td className="px-4 py-2 text-sm text-gray-800">
                                  {course.course_code}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-800">
                                  {course.course_title}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-800 text-center">
                                  {course.credit_unit}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-800 text-center">
                                  {course.score}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-800 text-center">
                                  {course.grade}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 gap-3">
                      <BookOpen className="h-8 w-8 text-gray-500" />
                      <p className="text-sm text-gray-700">
                        No results found for the selected session and semester.
                      </p>
                    </div>
                  )}
                </div>
              ) : null}
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <div className="h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-700">Loading user data...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
