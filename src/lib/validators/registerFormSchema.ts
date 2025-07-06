import { z } from "zod";

export const registerFormSchema = z
  .object({
    regNum: z.string().nonempty("Reg number is required"),
    name: z.string().nonempty("Name is required"),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z.string().min(8, "Password must be up to 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
