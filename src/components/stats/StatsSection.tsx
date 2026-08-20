import React from "react";
import { Pill } from "../ui/Pill";
import { SectionTitle } from "../ui/SectionTitle";
import { StatCard, StatColorTheme } from "../ui/StatCard";

// Platform stats data array - keeps formatting reusable and clean
const STATS_GRID_DATA = [
  {
    imageSrc: "/luxury1.png",
    value: "10,000+",
    label: "Happy Customers",
    colorTheme: "red" as StatColorTheme,
  },
  {
    imageSrc: "/luxury2.png",
    value: "500+",
    label: "Orders Daily",
    colorTheme: "purple" as StatColorTheme,
  },
  {
    imageSrc: "/luxury3.png",
    value: "100+",
    label: "Verified Vendors",
    colorTheme: "pink" as StatColorTheme,
  },
  {
    imageSrc: "/luxury4.png",
    value: "24/7",
    label: "Support Available",
    colorTheme: "amber" as StatColorTheme,
  },
];

export const StatsSection: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-10 px-6 sm:px-12 flex flex-col items-center text-center z-10 relative">
      <Pill>Platform Statistics</Pill>
      <SectionTitle text="Numbers That Speak" highlightText="Luxury" className="mb-16" />

      {/* Grid wrapper for platform metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-center">
        {STATS_GRID_DATA.map((stat, idx) => (
          <StatCard
            key={idx}
            imageSrc={stat.imageSrc}
            value={stat.value}
            label={stat.label}
            colorTheme={stat.colorTheme}
          />
        ))}
      </div>
    </section>
  );
};
export default StatsSection;
