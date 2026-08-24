"use client";

import React, { useState } from "react";
import { Pill } from "../ui/Pill";
import { SectionTitle } from "../ui/SectionTitle";
import { FAQItem } from "../ui/FAQItem";
import { Button } from "../ui/Button";

import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useGetAllFaqQuery, FaqItem } from "@/features/faq/faqApi";

export const FAQSection: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const { data: faqResponse, isLoading, isError } = useGetAllFaqQuery();
  console.log("faq", faqResponse)

  const faqList = faqResponse?.data || [];
  const displayedFAQs = showAll ? faqList : faqList.slice(0, 5);

  return (
    <section id="faq" className="w-full max-w-4xl mx-auto py-12 px-6 flex flex-col items-center z-10 relative">
      <Pill>Frequently Asked Questions</Pill>
      <SectionTitle
        text="Everything You"
        highlightText="Need to Know"
        highlightColor="text-[#FF7A75]"
        className="mb-16 text-center select-none text-[32px] sm:text-[46px]"
      />

      {/* Accordion List wrapper */}
      <div className="flex flex-col gap-4 w-full">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Loader2 className="animate-spin text-[#FF7A75]" size={32} />
            <p className="text-sm text-[#F5E8FFCC]">Loading FAQs...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-8 text-[#FF7A75] text-sm">
            Failed to load FAQs. Please try again later.
          </div>
        ) : faqList.length === 0 ? (
          <div className="text-center py-8 text-[#F5E8FFCC] text-sm">
            No FAQs available.
          </div>
        ) : (
          displayedFAQs.map((item: FaqItem, idx: number) => (
            <FAQItem
              key={item._id || idx}
              question={item.question}
              answer={item.answer}
              idx={idx}
            />
          ))
        )}
      </div>

      {/* Show All / See Less Toggle Button */}
      {!isLoading && faqList.length > 5 && (
        <div className="mt-8 flex justify-center w-full animate-fade-in">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="border-[#63000e] text-[#63000e] cursor-pointer transition-all duration-300 px-6 rounded-full text-xs font-sans tracking-wide flex items-center gap-1.5"
          >
            {showAll ? (
              <>
                See Less <ChevronUp size={14} />
              </>
            ) : (
              <>
                See All Questions <ChevronDown size={14} />
              </>
            )}
          </Button>
        </div>
      )}
    </section>
  );
};
export default FAQSection;

