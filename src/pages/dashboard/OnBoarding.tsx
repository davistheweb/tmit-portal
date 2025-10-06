import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileSchema,
  type ProfileFormData,
} from "@/lib/validators/profileOnboardingSchema";
import { toast } from "sonner";
// import { useNavigate } from "react-router";
import { submitStudentOnboarding } from "@/api/services/submitStudentOnboarding";

export default function OnBoarding() {
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      console.log(data);

      const res = await submitStudentOnboarding(data);
      if (res.status == 200) toast.success(res.data.message);

      localStorage.setItem("profile_completed", "true");

      setTimeout(() => {
        window.location.href = "/dashboard/profile";
      }, 3000);
      // toast.success("Profile saved");
      // console.log(res.data);
    } catch (err: any) {
      if (err.response) {
        console.error("API Error:", err.response.data);
        toast.error(
          `Error: ${err.response.data.message || "Something went wrong"}`,
        );
      } else {
        console.error("Unexpected Error:", err);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const baseCls = "input w-full border rounded px-3 py-2";
  const errCls = "border-red-500";

  const renderError = (error: unknown) =>
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string" ? (
      <p className="text-red-600 text-sm">{error.message}</p>
    ) : null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-center">
        Complete Your Student Profile
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="space-y-6"
      >
        {/* Full Name */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label">Surname</label>
            <input
              type="text"
              {...register("firstName")}
              className={`${baseCls} ${errors.firstName ? errCls : ""}`}
            />
            {renderError(errors.firstName)}
          </div>
          <div>
            <label className="label">Middle Name</label>
            <input
              type="text"
              {...register("middleName")}
              className={`${baseCls} ${errors.middleName ? errCls : ""}`}
            />
            {renderError(errors.middleName)}
          </div>
          <div>
            <label className="label">Last Name</label>
            <input
              type="text"
              {...register("lastName")}
              className={`${baseCls} ${errors.lastName ? errCls : ""}`}
            />
            {renderError(errors.lastName)}
          </div>
        </div>

        {/* Gender & DOB */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Gender</label>
            <select
              {...register("gender")}
              className={`${baseCls} ${errors.gender ? errCls : ""}`}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
            {renderError(errors.gender)}
          </div>
          <div>
            <label className="label">Date of Birth</label>
            <input
              type="date"
              {...register("dateOfBirth")}
              className={`${baseCls} ${errors.dateOfBirth ? errCls : ""}`}
              defaultValue="2000-01-01"
              placeholder="dd/mm/yy"
            />
            {renderError(errors.dateOfBirth)}
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label">Country</label>
            <input
              {...register("country")}
              className={`${baseCls} ${errors.country ? errCls : ""}`}
            />
            {renderError(errors.country)}
          </div>
          <div>
            <label className="label">State of Origin</label>
            <input
              {...register("stateOfOrigin")}
              className={`${baseCls} ${errors.stateOfOrigin ? errCls : ""}`}
            />
            {renderError(errors.stateOfOrigin)}
          </div>
          <div>
            <label className="label">LGA</label>
            <input
              {...register("lga")}
              className={`${baseCls} ${errors.lga ? errCls : ""}`}
            />
            {renderError(errors.lga)}
          </div>
        </div>

        <div>
          <label className="label">Home Town</label>
          <input
            {...register("homeTown")}
            className={`${baseCls} ${errors.homeTown ? errCls : ""}`}
          />
          {renderError(errors.homeTown)}
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Phone Number</label>
            <input
              {...register("phone")}
              className={`${baseCls} ${errors.phone ? errCls : ""}`}
            />
            {renderError(errors.phone)}
          </div>
          <div>
            <label className="label">NIN</label>
            <input
              {...register("nin")}
              className={`${baseCls} ${errors.nin ? errCls : ""}`}
            />
            {renderError(errors.nin)}
          </div>
        </div>

        <div>
          <label className="label">Contact Address</label>
          <input
            {...register("address")}
            className={`${baseCls} ${errors.address ? errCls : ""}`}
          />
          {renderError(errors.address)}
        </div>

        {/* Medical Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label">Blood Group</label>
            <select
              {...register("bloodGroup")}
              className={`${baseCls} ${errors.bloodGroup ? errCls : ""}`}
            >
              <option value="" disabled>
                Select
              </option>
              {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
            {renderError(errors.bloodGroup)}
          </div>
          <div>
            <label className="label">Genotype</label>
            <select
              {...register("genotype")}
              className={`${baseCls} ${errors.genotype ? errCls : ""}`}
            >
              <option value="" disabled>
                Select
              </option>
              {["AA", "AS", "SS", "AC", "SC"].map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
            {renderError(errors.genotype)}
          </div>
          <div>
            <label className="label">Religion</label>
            <select
              {...register("religion")}
              className={`${baseCls} ${errors.religion ? errCls : ""}`}
            >
              <option value="" disabled>
                Select
              </option>
              {["Christianity", "Islam", "Other"].map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
            {renderError(errors.religion)}
          </div>
        </div>

        {/* Academic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Department</label>
            <input
              {...register("department")}
              className={`${baseCls} ${errors.department ? errCls : ""}`}
            />
            {renderError(errors.department)}
          </div>
          <div>
            <label className="label">Year</label>
            <input
              type="number"
              {...register("year", { valueAsNumber: true })}
              className={`${baseCls} ${errors.year ? errCls : ""}`}
            />
            {renderError(errors.year)}
          </div>
        </div>

        {/* Files */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Passport Photo</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className={`${baseCls} ${errors.image ? errCls : ""}`}
            />
            {renderError(errors.image)}
          </div>
          <div>
            <label className="label">Certifications</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              {...register("certifications")}
              className={`${baseCls} ${errors.certifications ? errCls : ""}`}
            />
            {renderError(errors.certifications)}
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <div className="flex">
                <span>Submitting</span>{" "}
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              </div>
            ) : (
              "Save & Continue"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
