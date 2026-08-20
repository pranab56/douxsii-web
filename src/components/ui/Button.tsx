import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "default", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold text-sm transition-all duration-300 active:scale-[0.98] select-none outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 disabled:opacity-50 disabled:pointer-events-none";

    // Figma style mappings
    const variants = {
      // Figma specifications: 52px height (represented by h-[52px]), rounded 50px (rounded-[50px]), 0.5px border (border-[0.5px]), padding 14px y and 28px x (py-[14px] px-[28px])
      primary: "h-[52px] px-[28px] py-[14px] rounded-[50px] gap-[8px] bg-gradient-to-r from-[#46000B] via-[#54000D] to-[#63000E] hover:from-[#51000C] hover:to-[#6c000f] text-white border-[0.5px] border-[#63000E]/80 shadow-[0_2px_12px_rgba(255,252,251,0.35)] hover:shadow-[0_4px_18px_rgba(255,252,251,0.5)]",
      secondary: "h-[52px] px-[28px] py-[14px] rounded-[50px] gap-[8px] bg-slate-900 border-[0.5px] border-slate-800 hover:border-slate-700 text-slate-100 hover:bg-slate-800/80 shadow-md",
      outline: "h-[52px] px-[28px] py-[14px] rounded-[50px] gap-[8px] bg-transparent border-[1.5px] border-[#EF5246]/60 text-[#EF5246]/80",
      ghost: "h-auto p-2 bg-transparent text-slate-400 hover:text-white"
    };

    const sizes = {
      default: "text-sm",
      sm: "h-[40px] px-5 py-2 text-xs",
      lg: "h-[56px] px-8 py-4 text-base"
    };

    const finalClassName = `${baseStyles} ${variants[variant]} ${size !== "default" ? sizes[size] : ""} ${className}`;

    return (
      <button ref={ref} className={finalClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
