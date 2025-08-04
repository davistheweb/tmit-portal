import * as React from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {
  registerFormSchema,
  type RegisterFormSchema,
} from "@/lib/validators/registerFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthFormLayout } from "@/components/layouts";
import { RegisterStudent } from "@/api/services/RegisterStudent";
import { useFaculties } from "@/hooks/useFaculties";
import { Button } from "@/components/ui/button";

export { type RegisterFormSchema };

const RegisterForm: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [passwordIsVisible, setPasswordIsVisible] =
    React.useState<boolean>(false);
  const [confirmPasswordIsVisible, setConfirmPasswordIsVisible] =
    React.useState<boolean>(false);
  const [isDetailsConfirmed, setIsDetailsConfirmed] =
    React.useState<boolean>(false);

  const { faculties, isLoading, error, refetch: fetch } = useFaculties();

  const togglePasswordVisibility = (): void =>
    setPasswordIsVisible((prev) => !prev);
  const toggleConfirmPasswordVisibility = (): void =>
    setConfirmPasswordIsVisible((prev) => !prev);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    trigger,
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      regNum: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      department: "",
    },
    mode: "onChange",
  });

  const nextStep = async () => {
    const fields = getFieldsForStep(currentStep);
    const isValid = await trigger(fields as (keyof RegisterFormSchema)[]);
    if (isValid) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    setIsDetailsConfirmed(false);
  };

  const getFieldsForStep = (step: number): (keyof RegisterFormSchema)[] => {
    const steps: Record<number, readonly (keyof RegisterFormSchema)[]> = {
      1: ["regNum", "department", "name"] as const,
      2: ["email", "password", "confirmPassword"] as const,
    };
    return step in steps ? [...steps[step]] : [];
  };

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
    <form onSubmit={handleSubmit(SubmitRegistration)} className="space-y-1">
      {currentStep === 1 && (
        <div className="space-y-4">
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
              placeholder="Reg num: EG:TMIT/CSC/25/0001"
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
                    <optgroup
                      key={faculty.id}
                      label={`${faculty.name} (${faculty.abbrev})`}
                    >
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
        </div>
      )}
      {currentStep === 2 && (
        <div className="space-y-4">
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
                type={passwordIsVisible ? "text" : "password"}
                {...register("password")}
                placeholder="Enter password"
                id="password"
              />
              <span
                className="absolute right-2 top-2.5 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordIsVisible ? <EyeOff size={17} /> : <Eye size={17} />}
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
                onClick={toggleConfirmPasswordVisibility}
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
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="confirm-details"
              checked={isDetailsConfirmed}
              onChange={(e) => setIsDetailsConfirmed(e.target.checked)}
              className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
            />
            <Label htmlFor="confirm-details" className="text-sm text-gray-700">
              I am sure I have filled my correct details
            </Label>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mt-6 gap-4">
        <div>
          {currentStep > 1 && (
            <Button
              type="button"
              onClick={prevStep}
              className="w-24 h-10 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none transition-all duration-200 ease-in-out font-medium text-sm cursor-pointer"
            >
              Back
            </Button>
          )}
        </div>
        <div>
          {currentStep < 2 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="w-24 h-10 bg-green-500 text-white rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-200 ease-in-out font-medium text-sm cursor-pointer"
              disabled={isLoading}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={!isValid || isSubmitting || !isDetailsConfirmed}
              className="w-24 h-10 bg-green-500 text-white rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-200 ease-in-out font-medium text-sm disabled:bg-green-300 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                "Register"
              )}
            </Button>
          )}
        </div>
      </div>
      <div className="flex space-x-2 items-center">
        <span className="text-xs">Already registered?</span>
        <Link
          to="/auth/login"
          className="font-boldtext-[15px] cursor-pointer underline decoration-1 decoration-green-500 text-xs"
        >
          Login
        </Link>
      </div>
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
        <Toaster richColors position="top-left" expand />
      </AuthFormLayout>
    </div>
  );
};
