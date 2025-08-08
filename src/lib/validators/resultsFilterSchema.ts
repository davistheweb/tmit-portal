import z from "zod";

export const resultsFilterSchema = z.object({
  session: z.string().nonempty("Session is required"),
  semester: z.string().nonempty("Semester is required"),
});

export type ResultsFilterForm = z.infer<typeof resultsFilterSchema>;
