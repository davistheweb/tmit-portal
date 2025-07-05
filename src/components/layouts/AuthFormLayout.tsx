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
    <div className="bg-white flex flex-col justify-center bg-white- px-5 py-5 border shadow rounded-sm w-[550px] h-[550px]">
      <div className="flex justify-center h-[120px]">
        <img
          className="w-2/12 h-[75%] mb-5 text-[13px]"
          src={schoolLogo}
          alt="Tmit logo"
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
