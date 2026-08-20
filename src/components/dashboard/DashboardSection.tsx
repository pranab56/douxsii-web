import React from "react";
import Image from "next/image";
import { BarChart3, Package, Megaphone, Truck, DollarSign, Bell } from "lucide-react";
import { Pill } from "../ui/Pill";
import { SectionTitle } from "../ui/SectionTitle";
import { SectionSubtitle } from "../ui/SectionSubtitle";
import { DashboardItem, DashboardTheme } from "../ui/DashboardItem";

// Menu configuration data array
const DASHBOARD_MENU = [
  {
    icon: <BarChart3 size={16} />,
    label: "Sales Analytics",
    colorTheme: "purple" as DashboardTheme,
  },
  {
    icon: <Package size={16} />,
    label: "Order Management",
    colorTheme: "indigo" as DashboardTheme,
  },
  {
    icon: <Megaphone size={16} />,
    label: "Ads Management",
    colorTheme: "amber" as DashboardTheme,
  },
  {
    icon: <Truck size={16} />,
    label: "Delivery Tracking",
    colorTheme: "magenta" as DashboardTheme,
  },
  {
    icon: <DollarSign size={16} />,
    label: "Revenue Charts",
    colorTheme: "orange" as DashboardTheme,
  },
  {
    icon: <Bell size={16} />,
    label: "Smart Notifications",
    colorTheme: "violet" as DashboardTheme,
  },
];

export const DashboardSection: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center py-16 px-6 sm:px-12 z-10 relative">
      {/* Left Column Content */}
      <div className="lg:col-span-6 flex flex-col items-start text-left">
        <Pill>Vendor Dashboard</Pill>
        <SectionTitle text="Your Business at a" highlightText="Glance" className="mb-6" />
        <SectionSubtitle className="mb-8 !mx-0 text-left">
          Our intuitive vendor dashboard gives you complete control. Track sales,
          manage inventory, run ad campaigns, and handle deliveries — all in one
          beautiful interface.
        </SectionSubtitle>

        {/* 2-column menu item list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {DASHBOARD_MENU.map((item, idx) => (
            <DashboardItem
              key={idx}
              icon={item.icon}
              label={item.label}
              colorTheme={item.colorTheme}
            />
          ))}
        </div>
      </div>

      {/* Right Column Graphic Mockup */}
      <div className="lg:col-span-6 flex justify-center lg:justify-end relative ps-4">
        {/* Soft light red glow behind the phone graphics */}
        <div className="absolute top-[20%] left-[10%] w-[80%] h-[80%] rounded-full bg-[#ff3b5c]/12 blur-[120px] pointer-events-none -z-10" />

        <div className="relative w-full max-w-[580px] flex items-center justify-center">
          <Image
            src="/glance.png"
            alt="Vendor dashboard mobile mockup"
            width={580}
            height={500}
            priority
            className="w-full h-auto object-contain select-none hover:scale-[1.02] transition-transform duration-1000"
          />
        </div>
      </div>
    </section>
  );
};
export default DashboardSection;
