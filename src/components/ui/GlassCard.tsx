import React from "react";

interface GlassCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  icon,
  title,
  value,
  description,
  className = "",
}) => {
  return (
    <div
      className={`px-4 py-[12px] w-[170px] min-w-[170px] min-h-[104px] rounded-[16px] bg-[#180906]/85 border-t border-[#EF5246]/20 backdrop-blur-xl flex flex-col gap-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.40)] transition-all duration-300 hover:border-t-[#EF5246]/45 ${className}`}
    >
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-lg bg-[#EF5246]/10 border-[0.5px] border-[#EF5246]/25 flex items-center justify-center text-[#EF5246]">
          {icon}
        </div>
        <span className="text-[10px] font-semibold tracking-wide text-slate-400 uppercase">
          {title}
        </span>
      </div>
      <div className="flex flex-col">
        <h4 className="text-[14px] font-bold text-white tracking-tight leading-tight">{value}</h4>
        <p className="text-[10px] text-slate-400 font-light mt-0.5 leading-tight">{description}</p>
      </div>
    </div>
  );
};
