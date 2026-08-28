"use client";

import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface CustomPhoneInputProps {
  value?: string;
  onChange: (value: string) => void;
  hasError?: boolean;
  placeholder?: string;
  disabled?: boolean;
  country?: string;
  className?: string;
}

export const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
  value = "",
  onChange,
  hasError = false,
  placeholder = "Enter phone number",
  disabled = false,
  country = "bd",
  className = "",
}) => {
  return (
    <div className={`custom-phone-input-wrapper w-full ${hasError ? "has-error" : ""} ${className}`}>
      <PhoneInput
        country={country}
        value={value}
        onChange={(val) => onChange(val ? (val.startsWith("+") ? val : `+${val}`) : "")}
        placeholder={placeholder}
        disabled={disabled}
        enableSearch
        searchPlaceholder="Search country..."
        countryCodeEditable={false}
        enableLongNumbers={false}
        masks={{ bd: ".....-......" }}
        inputProps={{
          required: true,
        }}
        containerClass="!w-full !font-sans"
        inputClass={`!w-full !h-[48px] !bg-[#33171d] !border ${
          hasError ? "!border-[#EF5246]" : "!border-[#EF524633] focus:!border-[#FF7A75]/50"
        } !rounded-xl !pl-[58px] !pr-4 !text-sm !text-white !placeholder-[#6b5055] !outline-none !transition-all !duration-200 focus:!ring-1 focus:!ring-[#FF7A75]/35`}
        buttonClass={`!bg-[#33171d] !border ${
          hasError ? "!border-[#EF5246]" : "!border-[#EF524633]"
        } !border-r-0 !rounded-l-xl !px-2.5 hover:!bg-[#421d25] !transition-colors`}
        dropdownClass="!bg-[#1e050a] !border !border-[#EF5246]/30 !text-white !rounded-xl !shadow-2xl !mt-1 !max-h-[240px] !overflow-y-auto custom-phone-dropdown"
        searchClass="!bg-[#1e050a] !p-2"
      />
    </div>
  );
};

export default CustomPhoneInput;
