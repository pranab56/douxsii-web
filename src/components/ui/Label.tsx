import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ children, className = "", ...props }) => {
  return (
    <label className={`text-xs font-semibold text-[#F5E8FFB2] select-none ${className}`} {...props}>
      {children}
    </label>
  );
};
export default Label;
