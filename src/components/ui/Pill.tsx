import React from "react";

interface PillProps {
  children: React.ReactNode;
  className?: string;
}

export const Pill: React.FC<PillProps> = ({ children, className = "" }) => {
  return (
    <span
      className={`inline-flex px-5 py-1.5 rounded-full border border-[#FF5A5F]/20 bg-[#2A080E]/60 text-[#FF7A75] text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest mb-6 shadow-[0_4px_20px_rgba(42,8,14,0.3)] select-none animate-fade-in ${className}`}
    >
      {children}
    </span>
  );
};
