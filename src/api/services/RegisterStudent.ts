import axios from "axios";
import api from "../api";
import { type RegisterFormSchema } from "@/auth/_components/RegisterForm";

interface RegisterResponse {
  message: string;
}

export const RegisterStudent = async (
  data: RegisterFormSchema,
): Promise<RegisterResponse | string[]> => {
  try {
    const response = await api.post("/register", {
      reg_number: data.regNum,
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (response.status === 201) {
      return response.data;
    }

    return ["Unexpected error occurred."];
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const errors = err.response?.data?.errors;

      if (errors && typeof errors === "object") {
        const messages = Object.values(errors).flat() as string[];
        return messages;
      }

      return [
        err.response?.data?.message || "Registration failed. Please try again.",
      ];
    } else {
      return ["Something went wrong. Try again later."];
    }
  }
};
