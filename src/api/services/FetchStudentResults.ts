import axios from "axios";
import api from "../api";
import type {
  FetchResultsRequest,
  FetchResultsResponse,
} from "@/types/IResults";

export const FetchStudentResults = async (
  data: FetchResultsRequest,
): Promise<FetchResultsResponse | string> => {
  try {
    const response = await api.post<FetchResultsResponse>(
      "/api/student/results/view",
      data,
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const message = err.response?.data?.message || "Failed to fetch results.";
      return message;
    }
    return "Something went wrong.";
  }
};
