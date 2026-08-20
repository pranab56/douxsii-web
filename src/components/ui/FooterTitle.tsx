import React from "react";

interface FooterTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const FooterTitle: React.FC<FooterTitleProps> = ({ children, className = "" }) => {
  return (
    <h4 className={`text-sm font-semibold text-[#F5E8FFB2] uppercase tracking-wider font-serif select-none ${className}`}>
      {children}
    </h4>
  );
};
export default FooterTitle;
