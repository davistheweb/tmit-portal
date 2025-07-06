import { z } from "zod";

export const loginFormSchema = z.object({
  regNum: z.string().nonempty("Reg number is required"),
  password: z.string().nonempty("Password is required"),
});
export type LoginFormSchema = z.infer<typeof loginFormSchema>;
