import React from "react";
import { authBackground } from "@/assets";

export const AuthBackground: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="relative max-sm:flex w-full h-full overflow-y-hidden overflow-x-hidden">
      <div
        className="md:hidden w-full h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${authBackground})` }}
      />
      <div className="hidden md:flex justify-end bg-green-500">
        <img
          className="h-[700px] select-none"
          draggable={false}
          src={authBackground}
          alt="auth background"
          loading="lazy"
        />
      </div>
      {/* The form will be placed here */}
      <div className="absolute w-[600px] z-10 max-sm:top-10 md:top-20 max-sm:left-10 md:left-20">{children}</div>
    </div>
  );
};
