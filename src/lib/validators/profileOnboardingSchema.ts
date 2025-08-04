import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().nonempty("Surname is required"),
  middleName: z.string().nonempty("Middle name is required"),
  lastName: z.string().nonempty("Last name is required"),

  gender: z.enum(["male", "female"], {
    required_error: "Gender is required",
    invalid_type_error: "Invalid gender selected",
  }),

  dateOfBirth: z.string().nonempty("Date of birth is required"),
  country: z.string().nonempty("Country is required"),
  stateOfOrigin: z.string().nonempty("State of origin is required"),
  lga: z.string().nonempty("LGA is required"),
  homeTown: z.string().nonempty("Home town is required"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  nin: z.string().nonempty("NIN is required"),
  address: z.string().nonempty("Contact address is required"),

  bloodGroup: z.enum(["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"], {
    required_error: "Blood group is required",
  }),

  genotype: z.enum(["AA", "AS", "SS", "AC", "SC"], {
    required_error: "Genotype is required",
  }),

  religion: z.enum(["Christianity", "Islam", "Other"], {
    required_error: "Religion is required",
  }),

  department: z.string().nonempty("Department is required"),

  year: z.coerce.number({
    required_error: "Year is required",
    invalid_type_error: "Year must be a number",
  }),

  image: z
    .any()
    .refine(
      (files) => !files || (files instanceof FileList && files.length > 0),
      {
        message: "Passport photo is required",
      },
    )
    .optional(),

  certifications: z
    .any()
    .refine(
      (files) => !files || (files instanceof FileList && files.length > 0),
      {
        message: "Certification document is required",
      },
    )
    .optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
