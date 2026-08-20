import React from "react";

interface StepProgressProps {
  currentStep: number;
}

const STEPS = [
  { num: 1, label: "Business Info" },
  { num: 2, label: "Store Details" },
  { num: 3, label: "Documents" },
  { num: 4, label: "Contact" },
  { num: 5, label: "Categories" },
];

export const StepProgress: React.FC<StepProgressProps> = ({ currentStep }) => {
  return (
    <div className="w-full flex items-center justify-between max-w-2xl mx-auto px-2 sm:px-4 py-6 sm:py-8 relative">
      {/* Horizontal Connector Line */}
      <div className="absolute top-[44px] sm:top-[52px] left-[8%] right-[8%] h-[1px] bg-[#EF524626] -z-10" />

      {/* Active progress track indicator */}
      <div
        className="absolute top-[44px] sm:top-[52px] left-[8%] h-[1px] bg-gradient-to-r from-[#FF7A75] to-[#EF5246] transition-all duration-500 ease-in-out -z-10"
        style={{ width: `${Math.max(0, ((currentStep - 1) / (STEPS.length - 1)) * 84)}%` }}
      />

      {STEPS.map((step) => {
        const isActive = step.num === currentStep;
        const isCompleted = step.num < currentStep;

        return (
          <div key={step.num} className="flex flex-col items-center flex-1 relative min-w-0">
            {/* Step Circle */}
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm transition-all duration-500 border ${isActive
                ? "bg-[#4e000c] border-[#EF5246] text-white shadow-[0_0_15px_rgba(239,82,70,0.65)] scale-105 sm:scale-110"
                : isCompleted
                  ? "bg-[#1E050A] border-[#EF5246]/60 text-[#FF7A75]"
                  : "bg-[#2c1016] border-[#EF524626] text-[#EF5246]"
                }`}
            >
              {step.num}
            </div>

            {/* Step Label */}
            <span
              className={`mt-2 sm:mt-3 text-[9px] sm:text-xs font-medium tracking-wide transition-all duration-300 text-center truncate max-w-[55px] sm:max-w-none ${isActive
                ? "text-[#FF7A75] font-semibold"
                : isCompleted
                  ? "text-[#FF7A75]/70"
                  : "text-[#F5E8FF4D]"
                }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
export default StepProgress;
