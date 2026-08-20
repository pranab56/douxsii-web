import React from "react";
import Image from "next/image";

export type StatColorTheme = "red" | "purple" | "pink" | "amber";

interface StatCardProps {
  imageSrc: string;
  value: string;
  label: string;
  colorTheme?: StatColorTheme;
  className?: string;
}

const STAT_THEMES = {
  red: {
    textColor: "text-[#EF5246]",
    glowColor: "via-[#EF5246]",
    shadow: "hover:shadow-[0_10px_30px_-5px_rgba(239,82,80,0.15)]",
  },
  purple: {
    textColor: "text-[#A855F7]",
    glowColor: "via-[#A855F7]",
    shadow: "hover:shadow-[0_10px_30px_-5px_rgba(168,85,247,0.15)]",
  },
  pink: {
    textColor: "text-[#EC4899]",
    glowColor: "via-[#EC4899]",
    shadow: "hover:shadow-[0_10px_30px_-5px_rgba(236,72,153,0.15)]",
  },
  amber: {
    textColor: "text-[#EAB308]",
    glowColor: "via-[#EAB308]",
    shadow: "hover:shadow-[0_10px_30px_-5px_rgba(234,179,8,0.15)]",
  },
};

export const StatCard: React.FC<StatCardProps> = ({
  imageSrc,
  value,
  label,
  colorTheme = "red",
  className = "",
}) => {
  const theme = STAT_THEMES[colorTheme];

  return (
    <div
      className={`relative flex flex-col items-center text-center p-8 rounded-3xl bg-[#280b11] border border-[#EF52461F] backdrop-blur-md transition-all duration-300 ${theme.shadow} hover:bg-[#280b11]/90 w-full overflow-hidden ${className}`}
    >
      {/* Figma styled 3px top border glow */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-full max-w-[238px] bg-gradient-to-r from-transparent ${theme.glowColor} to-transparent`}
      />

      {/* 3D Emoji Asset Image */}
      <div className="relative h-12 w-12 mb-4 flex items-center justify-center select-none">
        <Image
          src={imageSrc}
          alt={label}
          width={48}
          height={48}
          className="object-contain"
        />
      </div>

      {/* Metric Value - matching border glow color */}
      <h3 className={`text-3xl font-semibold tracking-tight ${theme.textColor}`}>
        {value}
      </h3>

      {/* Label Descriptor */}
      <p className="text-xs text-[#FFE9E899] font-light mt-2 font-sans tracking-wide">
        {label}
      </p>
    </div>
  );
};
export default StatCard;
