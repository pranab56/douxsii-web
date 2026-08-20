"use client"
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  idx?: number;
}

export const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  idx = 0
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex flex-col rounded-2xl bg-[#280b11] border border-[#EF52461F] transition-all duration-300 overflow-hidden">
      {/* Header Button (Accordion Trigger) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-5 px-6 text-left select-none group focus:outline-none"
      >
        <span className="text-sm sm:text-base font-medium text-[#F5E8FFCC] group-hover:text-white transition-colors duration-200">
          {question}
        </span>
        <div
          className={`h-8 w-8 rounded-full border border-[#D946EF1A] bg-[#180906]/60 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-[#D946EF1A] transition-all duration-300 cursor-pointer ${isOpen ? "rotate-180" : ""
            }`}
        >
          <ChevronDown size={16} />
        </div>
      </button>

      {/* Answer Collapsible Box */}
      <div
        className={`transition-all duration-300 ease-in-out px-6 ${isOpen ? "max-h-[300px] pb-6 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
      >
        <p className="text-xs sm:text-sm text-[#FFE9E899] font-light leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};
export default FAQItem;

