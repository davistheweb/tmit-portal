import { z } from "zod";

export const registerFormSchema = z
  .object({
    regNum: z
      .string()
      .nonempty("Reg number is required")
      .regex(
        /^TMIT\/[A-Z]+\/\d{1,2}\/\d{1,}$/,
        "Registration number must be in the format: TMIT/DEPT/YY/NNNN",
      ),
    name: z.string().nonempty("Name is required"),
    email: z
      .string()
      .nonempty("Email is required")
      .email({ message: "Please enter a valid email" }),
    password: z.string().min(8, "Password must be up to 8 characters"),
    confirmPassword: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
