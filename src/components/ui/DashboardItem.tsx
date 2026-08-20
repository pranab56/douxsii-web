import React from "react";

export type DashboardTheme =
  | "purple"
  | "indigo"
  | "amber"
  | "magenta"
  | "orange"
  | "violet";

interface DashboardItemProps {
  icon: React.ReactNode;
  label: string;
  colorTheme?: DashboardTheme;
  className?: string;
}

const THEMES = {
  purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  indigo: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
  amber: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  magenta: "bg-pink-500/10 border-pink-500/20 text-pink-400",
  orange: "bg-orange-500/10 border-orange-500/20 text-orange-400",
  violet: "bg-violet-500/10 border-violet-500/20 text-violet-400",
};

export const DashboardItem: React.FC<DashboardItemProps> = ({
  icon,
  label,
  colorTheme = "purple",
  className = "",
}) => {
  const themeClass = THEMES[colorTheme];

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-2xl bg-[#280b11] border border-[#EF52461F] hover:bg-[#280b11]/80 hover:border-[#EF52463F] transition-all duration-300 shadow-sm w-full select-none ${className}`}
    >
      {/* Icon container */}
      <div
        className={`h-9 w-9 rounded-xl flex items-center justify-center border-[0.5px] ${themeClass}`}
      >
        {icon}
      </div>

      {/* Label */}
      <span className="text-xs sm:text-sm font-medium text-slate-200 tracking-wide">
        {label}
      </span>
    </div>
  );
};
export default DashboardItem;
