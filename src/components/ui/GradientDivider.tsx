import React from "react";

interface GradientDividerProps {
  className?: string;
}

export const GradientDivider: React.FC<GradientDividerProps> = ({ className = "" }) => {
  return (
    <div
      className={`w-full max-w-3xl mx-auto h-[2px] bg-gradient-to-r from-transparent via-[#b83d36] to-transparent opacity-90 ${className}`}
    />
  );
};
export default GradientDivider;
