import * as React from "react";
import { schoolLogo } from "@/assets";
interface IAuthFormLayoutProp {
  heading: string;
  subtitle: string;
  children: React.ReactNode;
}
export const AuthFormLayout: React.FC<IAuthFormLayoutProp> = ({
  heading,
  subtitle,
  children,
}) => {
  return (
    <div className="flex flex-col justify-centeri bg-white- px-5 py-5 border border-gray-400 shadow-xl rounded-sm max-w-2xl">
      <div className="flex justify-center">
        <img
          className="w-2/12 mb-5"
          src={schoolLogo}
          alt="School logo"
          draggable="false"
          loading="lazy"
        />
      </div>
      <h1 className="font-bold text-center mb-2">{heading}</h1>
      <p className="font-semibold text-[12px] text-center mb-2">{subtitle}</p>

      <div>{children}</div>
    </div>
  );
};
