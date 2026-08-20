import React from "react";
import Image from "next/image";
import { ShoppingBag, TrendingUp, Users, Megaphone } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

// Overlay configuration array
const OVERLAYS = [
  {
    icon: <ShoppingBag size={16} />,
    title: "New Order",
    value: "+24 Today",
    description: "Fresh orchid bouquet",
    position: "top-[10%] left-[-12%] sm:left-[-15%] md:left-[-10%] lg:left-[-15%]",
  },
  {
    icon: <TrendingUp size={16} />,
    title: "Revenue",
    value: "AED 18,450",
    description: "this month",
    position: "top-[15%] right-[-12%] sm:right-[-15%] md:right-[-10%] lg:right-[-15%]",
  },
  {
    icon: <Users size={16} />,
    title: "Vendor Growth",
    value: "127 Active",
    description: "New sellers this week: 14",
    position: "bottom-[10%] left-[-12%] sm:left-[-15%] md:left-[-10%] lg:left-[-15%]",
  },
  {
    icon: <Megaphone size={16} />,
    title: "Sponsored Ads",
    value: "3.2x ROAS",
    description: "Active campaigns: 48",
    position: "bottom-[12%] right-[-12%] sm:right-[-15%] md:right-[-10%] lg:right-[-15%]",
  },
];

export const HeroImage: React.FC = () => {
  return (
    <div className="relative w-full flex items-center justify-center select-none z-10 py-10 lg:py-0">
      {/* Visual responsive scale container to keep overlap effect layout perfect on small devices */}
      <div className="relative w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[584px] scale-[0.72] min-[390px]:scale-[0.82] min-[480px]:scale-[0.9] sm:scale-95 md:scale-100 origin-center flex items-center justify-center">
        {/* Rose Bouquet Image container */}
        <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[480px] rounded-[30px] sm:rounded-[40px] overflow-hidden border-[0.5px] border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-[#180906]/40">
          {/* Image */}
          <Image
            src="/banner.png"
            alt="Luxury flowers"
            fill
            priority
            className="object-cover hover:scale-105 transition-transform duration-[1500ms]"
          />
        </div>

        {/* Glassmorphic Overlay Stats Cards */}
        {OVERLAYS.map((card, idx) => (
          <GlassCard
            key={idx}
            icon={card.icon}
            title={card.title}
            value={card.value}
            description={card.description}
            className={`absolute ${card.position} animate-fade-in`}
          />
        ))}
      </div>
    </div>
  );
};
