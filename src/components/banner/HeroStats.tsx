import React from "react";
import { StatItem } from "../ui/StatItem";

const STATS_DATA = [
  { value: "10K+", label: "Happy Customers" },
  { value: "500+", label: "Daily Orders" },
  { value: "100+", label: "Verified Vendors" },
];

export const HeroStats: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-12 mt-8 sm:mt-12 animate-fade-in w-full">
      {STATS_DATA.map((stat, idx) => (
        <StatItem
          key={idx}
          value={stat.value}
          label={stat.label}
          className="border-none sm:border-r sm:last:border-r-0 border-white/10 sm:pr-8 md:pr-12 sm:last:pr-0 text-center sm:text-left"
        />
      ))}
    </div>
  );
};
