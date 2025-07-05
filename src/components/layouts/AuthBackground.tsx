import React from "react";
import { authBackground } from "@/assets";

export const AuthBackground: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="relative w-full h-full overflow-y-hidden overflow-x-hidden">
      <div className="flex justify-end bg-green-500">
        <img
          className="h-[700px] select-none"
          draggable={false}
          src={authBackground}
          alt="auth background"
          loading="lazy"
        />
      </div>
      {/* The form will be placed here */}
      <div className="absolute w-[600px] z-10 top-20 left-20">{children}</div>
    </div>
  );
};
