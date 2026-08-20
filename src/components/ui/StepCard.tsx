import React from "react";

export type StepColorTheme = "purple" | "indigo" | "magenta" | "amber" | "pink";

interface StepCardProps {
  stepNumber: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  colorTheme?: StepColorTheme;
  className?: string;
}

const STEP_THEMES = {
  purple: {
    circleBg: "bg-purple-600/20 border-purple-500/30 text-purple-100",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.35)]",
    badgeBorder: "border-purple-400",
  },
  indigo: {
    circleBg: "bg-indigo-600/20 border-indigo-500/30 text-indigo-100",
    glow: "shadow-[0_0_20px_rgba(99,102,241,0.35)]",
    badgeBorder: "border-indigo-400",
  },
  magenta: {
    circleBg: "bg-pink-600/20 border-pink-500/30 text-pink-100",
    glow: "shadow-[0_0_20px_rgba(236,72,153,0.35)]",
    badgeBorder: "border-pink-400",
  },
  amber: {
    circleBg: "bg-amber-600/20 border-amber-500/30 text-amber-100",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.35)]",
    badgeBorder: "border-amber-400",
  },
  pink: {
    circleBg: "bg-rose-600/20 border-rose-500/30 text-rose-100",
    glow: "shadow-[0_0_20px_rgba(244,63,94,0.35)]",
    badgeBorder: "border-rose-400",
  },
};

export const StepCard: React.FC<StepCardProps> = ({
  stepNumber,
  icon,
  title,
  description,
  colorTheme = "purple",
  className = "",
}) => {
  const theme = STEP_THEMES[colorTheme];

  return (
    <div className={`flex flex-col items-center gap-6 w-full ${className}`}>
      {/* Circle Icon Container with glow */}
      <div className="relative z-10 select-none">
        <div
          className={`h-14 w-14 rounded-full flex items-center justify-center border ${theme.circleBg} ${theme.glow} transition-transform duration-300 hover:scale-105`}
        >
          {icon}
        </div>

        {/* Small floating numeric badge */}
        <div
          className={`absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#1c050a] border-[1px] ${theme.badgeBorder} flex items-center justify-center`}
        >
          <span className="text-[9px] font-bold text-white leading-none">{stepNumber}</span>
        </div>
      </div>

      {/* Info card box */}
      <div className="w-full p-5 rounded-2xl bg-[#280b11] border border-[#EF52461F] flex flex-col gap-2 min-h-[140px]">
        <h4 className="text-sm font-semibold text-white tracking-wide text-center">
          {title}
        </h4>
        <p className="text-[11px] text-[#FFE9E899] font-light text-center leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
export default StepCard;
