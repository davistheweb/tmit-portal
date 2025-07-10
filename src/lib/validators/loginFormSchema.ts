import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email({ message: "Please enter a valid email" }),
  password: z.string().nonempty("Password is required"),
});
export type LoginFormSchema = z.infer<typeof loginFormSchema>;
