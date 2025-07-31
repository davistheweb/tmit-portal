import api from "../api";
import { type IStudentProfileDetails } from "@/types/IStudentProfileDetails";
import axios from "axios";

export const GetStudentProfileDetails = async (): Promise<
  IStudentProfileDetails | string
> => {
  try {
    const response = await api.get<IStudentProfileDetails>(
      "/api/student/profile",
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const msg =
        err.response?.data?.message ||
        "Failed to fetch student profile details.";
      return msg;
    } else {
      return "Something went wrong.";
    }
  }
};
