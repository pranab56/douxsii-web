import React from "react";

interface SectionSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionSubtitle: React.FC<SectionSubtitleProps> = ({
  children,
  className = "",
}) => {
  return (
    <p
      className={`text-[#FFE9E880] text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto ${className}`}
    >
      {children}
    </p>
  );
};
