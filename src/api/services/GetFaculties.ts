import axios from "axios";
import api from "../api";
import type { IFaculty } from "@/types/IFaculty";
import { cache } from "react";
import { storeData } from "@/lib/storeData";

export const GetFaculties = cache(async (): Promise<IFaculty[] | string> => {
  try {
    const facultiesResponse = localStorage.getItem("facultiesResponse");
    if (facultiesResponse) {
      const facultiesData = JSON.parse(facultiesResponse);
      // console.log(facultiesData);

      return JSON.parse(facultiesData);
    }
    const response = await api.get<IFaculty[]>("/api/faculties");
    console.log("GetFaculties raw response:", response.data);
    storeData("facultiesResponse", JSON.stringify(response.data));
    return response.data || [];
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.message || "Failed to fetch faculties.";
      console.error("GetFaculties error:", message, err.response?.data);
      return message;
    }
    console.error("GetFaculties unexpected error:", err);
    return "Something went wrong.";
  }
});
