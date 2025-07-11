export interface IStudentProfileDetails {
  student: {
    id: number;
    reg_number: string;
    name: string;
    email: string;
    department: string;
    status: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    profile: IStudentProfile;
  };
  profile: IStudentProfile;
}

export interface IStudentProfile {
  id: number;
  student_id: string;
  reg_number: string;
  email: string;
  surname: string;
  middle_name: string;
  last_name: string;
  gender: string;
  dob: string;
  country: string;
  state: string;
  lga: string;
  home_town: string;
  phone: string;
  nin: string;
  contact_address: string;
  blood_group: string;
  genotype: string;
  religion: string;
  image_path: string;
  certifications_path: string;
  department: string;
  year: string;
  created_at: string;
  updated_at: string;
}
