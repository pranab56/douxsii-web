import React from "react";
import { Label } from "./Label";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required,
  children,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <Label>
        {label} {required && <span className="text-[#EF5246] ml-0.5">*</span>}
      </Label>
      {children}
      {error && (
        <span className="text-xs text-[#EF5246] mt-0.5 select-none transition-all duration-200">
          {error}
        </span>
      )}
    </div>
  );
};
export default FormField;
