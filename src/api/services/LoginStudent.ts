import axios from "axios";
import api from "../api";
import { type LoginFormSchema } from "@/auth/_components/LoginForm";

export const LoginStudent = async (data: LoginFormSchema): Promise<unknown> => {
  const { email, password } = data;
  try {
    const response = await api.post("/api/login", { email, password });

    if (response.status === 200) {
      localStorage.setItem("profile_completed", response.data.profile_complete);
      console.log(response.data.profile_complete);
      return response.data;
    }
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const msg =
        err.response?.data?.message || "Login failed. Something went wrong.";
      return msg;
    } else {
      return "Something went wrong.";
    }
  }
};
