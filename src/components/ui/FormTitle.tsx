import React from "react";

interface FormTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const FormTitle: React.FC<FormTitleProps> = ({ children, className = "" }) => {
  return (
    <h3 className={`text-xl sm:text-2xl font-semibold text-white font-serif mb-2 font-medium select-none ${className}`}>
      {children}
    </h3>
  );
};
export default FormTitle;
