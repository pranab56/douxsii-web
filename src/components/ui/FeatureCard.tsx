import React from "react";

export type FeatureColorTheme =
  | "purple"
  | "indigo"
  | "magenta"
  | "amber"
  | "orange"
  | "pink"
  | "violet"
  | "blue";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorTheme?: FeatureColorTheme;
  className?: string;
}

// Reusable color styles mapping
const COLOR_THEMES = {
  purple: {
    iconBg: "bg-purple-500/10",
    iconBorder: "border-purple-500/25",
    iconText: "text-purple-400",
  },
  indigo: {
    iconBg: "bg-indigo-500/10",
    iconBorder: "border-indigo-500/25",
    iconText: "text-indigo-400",
  },
  magenta: {
    iconBg: "bg-pink-500/10",
    iconBorder: "border-pink-500/25",
    iconText: "text-pink-400",
  },
  amber: {
    iconBg: "bg-amber-500/10",
    iconBorder: "border-amber-500/25",
    iconText: "text-amber-400",
  },
  orange: {
    iconBg: "bg-orange-500/10",
    iconBorder: "border-orange-500/25",
    iconText: "text-orange-400",
  },
  pink: {
    iconBg: "bg-rose-500/10",
    iconBorder: "border-rose-500/25",
    iconText: "text-rose-400",
  },
  violet: {
    iconBg: "bg-violet-500/10",
    iconBorder: "border-violet-500/25",
    iconText: "text-violet-400",
  },
  blue: {
    iconBg: "bg-blue-500/10",
    iconBorder: "border-blue-500/25",
    iconText: "text-blue-400",
  },
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  colorTheme = "purple",
  className = "",
}) => {
  const theme = COLOR_THEMES[colorTheme];

  return (
    <div
      className={`p-6 rounded-3xl bg-[#280b11] border border-[#EF52461F] backdrop-blur-md  transition-all duration-300 group flex flex-col gap-4 ${className}`}
    >
      {/* Reusable color styled Icon wrapper */}
      <div
        className={`h-11 w-11 rounded-xl flex items-center justify-center border-[0.5px] ${theme.iconBg} ${theme.iconBorder} ${theme.iconText} group-hover:scale-105 transition-transform duration-300`}
      >
        {icon}
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-medium text-white tracking-wide">{title}</h3>
        <p className="text-xs text-[#FFE9E899] font-light leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
export default FeatureCard;
