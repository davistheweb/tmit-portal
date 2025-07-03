import * as React from "react";

interface IFormLayoutProp {
  heading: string;
  subtitle: string;
}
export const FormLayout: React.FC<IFormLayoutProp> = ({
  heading,
  subtitle,
}) => {
  return (
    <div className="bg-white px-5 py-5">
      <h1>{heading}</h1>
      <p>{subtitle}</p>
    </div>
  );
};
