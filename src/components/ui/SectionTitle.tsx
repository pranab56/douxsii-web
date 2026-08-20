import React from "react";

interface SectionTitleProps {
  text: string;
  highlightText?: string;
  highlightColor?: string; // Custom highlight text styling
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  text,
  highlightText = "",
  highlightColor = "",
  className = "",
}) => {
  return (
    <h2
      className={`text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight font-serif ${className}`}
    >
      {text}{" "}
      {highlightText && (
        <span className={highlightColor || "bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-rose-500 to-amber-500 font-serif drop-shadow-[0_2px_10px_rgba(225,29,72,0.15)]"}>
          {highlightText}
        </span>
      )}
    </h2>
  );
};
export default SectionTitle;
