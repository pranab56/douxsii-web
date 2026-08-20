import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", hasError = false, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`w-full bg-[#140205]/95 border ${
          hasError ? "border-[#EF5246]" : "border-[#3E1119] focus:border-[#FF7A75]/50"
        } rounded-xl px-4 py-3.5 text-sm text-white placeholder-[#6b5055] outline-none transition-all duration-200 focus:ring-1 focus:ring-[#FF7A75]/35 resize-none ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
