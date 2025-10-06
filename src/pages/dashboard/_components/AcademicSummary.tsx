import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap, BookOpen, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AcademicSummary() {
  const currentCGPA = 3.45;
  const registeredCourses = [
    { code: "CSC 201", title: "Data Structures", units: 3, status: "active" },
    {
      code: "CSC 203",
      title: "Computer Architecture",
      units: 3,
      status: "active",
    },
    { code: "MTH 201", title: "Linear Algebra", units: 3, status: "active" },
    { code: "CSC 205", title: "Database Systems", units: 3, status: "active" },
    {
      code: "CSC 101",
      title: "Introduction to Programming",
      units: 3,
      status: "carryover",
    },
  ];

  const totalUnits = registeredCourses.reduce(
    (sum, course) => sum + course.units,
    0,
  );
  const carryoverCourses = registeredCourses.filter(
    (c) => c.status === "carryover",
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-success" />
          Academic Summary
        </CardTitle>
        <CardDescription>
          Current semester performance and course registration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* CGPA Section */}
        <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg border border-success/20">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Current CGPA</p>
            <p className="text-4xl font-bold text-success">
              {currentCGPA.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">Total Units</p>
            <p className="text-2xl font-bold">{totalUnits}</p>
          </div>
        </div>

        {/* Carryover Alert */}
        {carryoverCourses.length > 0 && (
          <div className="flex items-start gap-3 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
            <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-destructive mb-1">
                {carryoverCourses.length} Carryover Course
                {carryoverCourses.length > 1 ? "s" : ""}
              </p>
              <p className="text-sm text-muted-foreground">
                You have failed courses that must be retaken this semester
              </p>
            </div>
          </div>
        )}

        {/* Registered Courses */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold text-lg">
              Registered Courses ({registeredCourses.length})
            </h3>
          </div>

          <div className="space-y-3">
            {registeredCourses.map((course) => (
              <div
                key={course.code}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  course.status === "carryover"
                    ? "bg-destructive/5 border-destructive/30"
                    : "bg-card border-border"
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold">{course.code}</p>
                    {course.status === "carryover" && (
                      <Badge variant="destructive" className="text-xs">
                        Carryover
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {course.title}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{course.units} Units</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
