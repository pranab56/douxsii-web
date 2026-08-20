import React from "react";

interface StatItemProps {
  value: string;
  label: string;
  className?: string;
}

export const StatItem: React.FC<StatItemProps> = ({ value, label, className = "" }) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <h3 className="text-xl sm:text-3xl font-semibold text-white bg-clip-text tracking-tight">
        {value}
      </h3>
      <p className="text-[10px] sm:text-[12px] uppercase tracking-wider text-[#FFE9E880] font-semibold">
        {label}
      </p>
    </div> 
  );
};
