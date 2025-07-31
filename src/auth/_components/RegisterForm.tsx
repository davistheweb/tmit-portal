import * as React from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {
  registerFormSchema,
  type RegisterFormSchema,
} from "@/lib/validators/registerFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
// import axios from "axios";

import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthFormLayout } from "@/components/layouts";
import { RegisterStudent } from "@/api/services/RegisterStudent";
// import { faculties } from "@/data";
import { useFaculties } from "@/hooks/useFaculties";

export { type RegisterFormSchema };

const RegisterForm: React.FC = () => {
  const [passwordIsVisibe, setPasswordIsVisible] =
    React.useState<boolean>(false);

  const [confirmPasswordIsVisible, setConfirmPasswordIsVisible] =
    React.useState<boolean>(false);

  const { faculties, isLoading, error, refetch: fetch } = useFaculties();

  const tooglePasswordVisibility = (): void =>
    setPasswordIsVisible((prev) => !prev);

  const toogleConfirmPasswordVisibility = (): void =>
    setConfirmPasswordIsVisible((prev) => !prev);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      regNum: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      department: "", // Added
    },
  });

  const SubmitRegistration = async (data: RegisterFormSchema) => {
    const result = await RegisterStudent(data);

    if (Array.isArray(result)) {
      console.log(result);

      result.forEach((msg) => toast.error(msg));
    } else {
      toast.success(result.message || "Registration successful!");
      setTimeout(() => navigate("/auth/login"), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit(SubmitRegistration)}>
      <div className="flex flex-col gap-2">
        <div>
          <Label htmlFor="regNum" className="mb-1">
            Registration Number
          </Label>
          <Input
            className={`border ${
              errors.regNum ? "border-red-300" : "border-gray-300"
            } focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none`}
            type="text"
            {...register("regNum")}
            placeholder="Reg num: EG:TMIT/CSC/01/0001"
            id="regNum"
          />
          {errors.regNum && (
            <span className="text-red-600 text-xs select-none">
              {errors.regNum.message}
            </span>
          )}
        </div>
        <div>
          <Label htmlFor="department" className="mb-1">
            Department
          </Label>

          {isLoading ? (
            <div className="relative w-full">
              <div className="animate-pulse h-10 w-full bg-gray-200 rounded-sm border border-gray-300" />
              <div className="absolute right-3 top-2.5 text-gray-400">
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          ) : error ? (
            <div className="text-sm text-red-600">
              Couldn’t fetch departments.{" "}
              <button
                onClick={fetch}
                type="button"
                className="text-green-600 underline cursor-pointer"
              >
                Retry
              </button>
            </div>
          ) : faculties.length === 0 ? (
            <p className="text-sm text-red-500">
              No faculties found. Registration not available yet.
            </p>
          ) : (
            <div className="relative w-full">
              <select
                id="department"
                {...register("department")}
                className={`w-full rounded-sm px-3 py-2 bg-white border text-sm ${
                  errors.department ? "border-red-300" : "border-gray-300"
                } focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none appearance-none`}
              >
                <option value="">Select department</option>
                {faculties.map((faculty) => (
                  <optgroup key={faculty.id} label={faculty.name}>
                    {faculty.departments.map((dept) => (
                      <option key={dept.code} value={dept.code}>
                        {dept.name} ({dept.code})
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          )}

          {errors.department && (
            <span className="text-red-600 text-xs select-none">
              {errors.department.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="name" className="mb-1">
            Name
          </Label>
          <Input
            className={`border ${
              errors.name ? "border-red-300" : "border-gray-300"
            } focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none`}
            type="text"
            {...register("name")}
            placeholder="Enter fullname"
            id="name"
          />
          {errors.name && (
            <span className="text-red-600 text-xs select-none">
              {errors.name.message}
            </span>
          )}
        </div>
        <div>
          <Label htmlFor="email" className="mb-1">
            Email
          </Label>
          <Input
            className={`border ${
              errors.email ? "border-red-300" : "border-gray-300"
            } focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none`}
            type="email"
            {...register("email")}
            placeholder="Enter email"
            id="email"
          />
          {errors.email && (
            <span className="text-red-600 text-xs select-none">
              {errors.email.message}
            </span>
          )}
        </div>
        <div>
          <Label htmlFor="password" className="mb-1">
            Password
          </Label>
          <div className="relative flex">
            <Input
              className={`border ${
                errors.password ? "border-red-300" : "border-gray-300"
              } focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none`}
              type={passwordIsVisibe ? "text" : "password"}
              {...register("password")}
              placeholder="Enter password"
              id="password"
            />
            <span
              className="absolute right-2 top-2.5 cursor-pointer"
              onClick={tooglePasswordVisibility}
            >
              {passwordIsVisibe ? <EyeOff size={17} /> : <Eye size={17} />}
            </span>
          </div>
          {errors.password && (
            <span className="text-red-600 text-xs select-none">
              {errors.password.message}
            </span>
          )}
        </div>
        <div>
          <Label htmlFor="confirm password" className="mb-1">
            Confirm Password
          </Label>
          <div className="relative flex">
            <Input
              className={`border ${
                errors.confirmPassword ? "border-red-300" : "border-gray-300"
              } focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none`}
              type={confirmPasswordIsVisible ? "text" : "password"}
              {...register("confirmPassword")}
              placeholder="Confirm password"
              id="confirm password"
            />
            <span
              className="absolute right-2 top-2.5 cursor-pointer"
              onClick={toogleConfirmPasswordVisibility}
            >
              {confirmPasswordIsVisible ? (
                <EyeOff size={17} />
              ) : (
                <Eye size={17} />
              )}
            </span>
          </div>
          {errors.confirmPassword && (
            <span className="text-red-600 text-xs select-none">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
      </div>

      <button
        className="rounded-sm text-white text-[15px] font-semibold mt-4 cursor-pointer w-24 h-10 bg-green-500 flex items-center justify-center"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
        ) : (
          "Register"
        )}
      </button>
    </form>
  );
};

export const RegisterBody: React.FC = () => {
  return (
    <div className="flex items-center max-h-[600px]">
      <AuthFormLayout
        heading="Welcome to TMIT"
        subtitle="Register with your details"
      >
        <RegisterForm />
        <Toaster richColors position="top-left" />
      </AuthFormLayout>
    </div>
  );
};
