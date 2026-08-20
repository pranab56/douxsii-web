"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Check } from "lucide-react";
import FormTitle from "../ui/FormTitle";

const CATEGORIES = [
  "Fresh Flowers & Bouquets",
  "Dried & Preserved Flowers",
  "Luxury Perfumes",
  "Artisan Chocolates",
  "Premium Gift Boxes",
  "Handcrafted Jewelry",
  "Skincare & Beauty",
  "Luxury Candles",
  "Wedding & Events",
  "Seasonal Gifts",
];

export const CategoriesStep: React.FC = () => {
  const { register, watch, formState: { errors } } = useFormContext();
  const selectedCategories = watch("categories") || [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <FormTitle>Product Categories</FormTitle>
        <p className="text-xs text-slate-400 font-light leading-relaxed select-none">
          Select all categories that apply to your products.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CATEGORIES.map((category) => {
          const isChecked = selectedCategories.includes(category);
          
          return (
            <label
              key={category}
              className={`flex items-center gap-3.5 px-4 py-4 rounded-xl border cursor-pointer select-none transition-all duration-300 ${
                isChecked
                  ? "bg-[#EF5246]/5 border-[#FF7A75]/55 shadow-[0_0_12px_rgba(239,82,70,0.1)]"
                  : "bg-[#140205]/95 border-[#3E1119] hover:border-[#EF5246]/35"
              }`}
            >
              <div className="relative">
                <input
                  type="checkbox"
                  value={category}
                  className="peer sr-only"
                  {...register("categories")}
                />
                {/* Custom Checkbox visual */}
                <div
                  className={`h-5 w-5 rounded-md border flex items-center justify-center transition-all duration-200 ${
                    isChecked
                      ? "bg-[#EF5246] border-[#FF7A75] text-white"
                      : "bg-[#120205] border-[#3E1119] text-transparent"
                  }`}
                >
                  <Check size={12} strokeWidth={3} />
                </div>
              </div>
              <span className={`text-xs sm:text-[13px] font-medium transition-colors duration-250 ${
                isChecked ? "text-white" : "text-slate-300"
              }`}>
                {category}
              </span>
            </label>
          );
        })}
      </div>

      {errors.categories && (
        <span className="text-xs text-[#EF5246] text-center select-none">{errors.categories.message as string}</span>
      )}
    </div>
  );
};
export default CategoriesStep;
