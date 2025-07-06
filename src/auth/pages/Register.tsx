import * as React from "react";
import { RegisterBody } from "../_components/RegisterForm";
import { AuthBackground } from "@/components/layouts";

export const Register: React.FC = () => (
  <div>
    <AuthBackground>
      <RegisterBody />
    </AuthBackground>
  </div>
);
