import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", hasError = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full bg-[#33171d] border ${
          hasError ? "border-[#EF5246]" : "border-[#EF524633] focus:border-[#FF7A75]/50"
        } rounded-xl px-4 py-3.5 text-sm text-white placeholder-[#6b5055] outline-none transition-all duration-200 focus:ring-1 focus:ring-[#FF7A75]/35 ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export default Input;
