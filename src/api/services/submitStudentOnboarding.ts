import type { ProfileFormData } from "@/lib/validators/profileOnboardingSchema";
import api from "../api";
import type { AxiosResponse } from "axios";


export const submitStudentOnboarding = async (
  data: ProfileFormData,
): Promise<AxiosResponse> => {
  const formData = new FormData();

  formData.append("surname", data.firstName);
  formData.append("middle_name", data.middleName);
  formData.append("last_name", data.lastName);
  formData.append("gender", data.gender);
  formData.append("dob", data.dateOfBirth);
  formData.append("country", data.country);
  formData.append("state", data.stateOfOrigin);
  formData.append("lga", data.lga);
  formData.append("home_town", data.homeTown);
  formData.append("phone", data.phone);
  formData.append("nin", data.nin);
  formData.append("contact_address", data.address);
  formData.append("blood_group", data.bloodGroup);
  formData.append("genotype", data.genotype);
  formData.append("religion", data.religion);
  formData.append("department", data.department);
  formData.append("year", data.year.toString());

  /*   if (data.image instanceof FileList && data.image.length > 0) {
    formData.append("image", data.image[0]);
  }

  if (
    data.certifications instanceof FileList &&
    data.certifications.length > 0
  ) {
    formData.append("certifications", data.certifications[0]);
  } */

  if (data.image instanceof File) {
    formData.append("image", data.image);
  }

  if (data.certifications instanceof File) {
    formData.append("certifications", data.certifications);
  }

  return await api.post("/api/student/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
