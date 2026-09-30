import React from "react";
import { Check } from "lucide-react";

export const SuccessStep: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center py-10 px-4">
      {/* Glowing Checkmark Circle */}
      <div className="h-16 w-16 rounded-full bg-[#EF5246]/15 border border-[#FF7A75]/30 flex items-center justify-center text-[#FF7A75] shadow-[0_0_30px_rgba(239,82,70,0.5)] mb-8 animate-pulse">
        <Check size={28} strokeWidth={2.5} />
      </div>

      {/* Success Heading */}
      <h3 className="text-2xl sm:text-3xl font-semibold text-white font-serif mb-4">
        Application Submitted!
      </h3>

      {/* Success Description */}
      <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-md">
        Thank you for applying to become a Denior vendor. Our team will review your
        application and get back to you within 24-48 hours. Welcome to the luxury
        marketplace!
      </p>
    </div>
  );
};
export default SuccessStep;
