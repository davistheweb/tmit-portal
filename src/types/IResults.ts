export interface FetchResultsRequest {
  reg_number: string | null | undefined;
  session: string;
  semester: string;
}

export interface CourseResult {
  course_code: string;
  course_title: string;
  credit_unit: number;
  score: number;
  grade: string;
}

export interface FetchResultsResponse {
  student: {
    name: string;
    reg_number: string;
  };
  session: string;
  semester: string;
  gpa: number;
  results: CourseResult[];
}
