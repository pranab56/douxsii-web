import React from "react";
import { UserPlus, Package, Truck, Wallet, Megaphone, BarChart3, Headphones, Globe } from "lucide-react";
import { Pill } from "../ui/Pill";
import { SectionTitle } from "../ui/SectionTitle";
import { SectionSubtitle } from "../ui/SectionSubtitle";
import { FeatureCard, FeatureColorTheme } from "../ui/FeatureCard";

// Features configuration array - keeps repeated code clean and highly maintainable
const FEATURES_DATA = [
  {
    icon: <UserPlus size={18} />,
    title: "Reach More Customers",
    description: "Tap into thousands of verified luxury buyers actively searching for flowers, gifts, and premium products.",
    colorTheme: "purple" as FeatureColorTheme,
  },
  {
    icon: <Package size={18} />,
    title: "Easy Order Management",
    description: "Powerful dashboard to manage all your orders, inventory, and product listings in one seamless place.",
    colorTheme: "indigo" as FeatureColorTheme,
  },
  {
    icon: <Truck size={18} />,
    title: "Built-in Delivery System",
    description: "Integrated logistics and delivery management so you can focus on crafting beautiful products.",
    colorTheme: "magenta" as FeatureColorTheme,
  },
  {
    icon: <Wallet size={18} />,
    title: "Wallet & Payments",
    description: "Receive instant payments to your vendor wallet. Withdraw anytime, zero hidden fees.",
    colorTheme: "amber" as FeatureColorTheme,
  },
  {
    icon: <Megaphone size={18} />,
    title: "Sponsored Advertisements",
    description: "Boost your products with premium ad placements — homepage banners, featured listings, and more.",
    colorTheme: "orange" as FeatureColorTheme,
  },
  {
    icon: <BarChart3 size={18} />,
    title: "Real-time Analytics",
    description: "Track sales, clicks, conversion rates, and customer insights with beautiful live dashboards.",
    colorTheme: "pink" as FeatureColorTheme,
  },
  {
    icon: <Headphones size={18} />,
    title: "Dedicated Support Team",
    description: "24/7 dedicated vendor support via chat, phone, and email. We're always here for your success.",
    colorTheme: "violet" as FeatureColorTheme,
  },
  {
    icon: <Globe size={18} />,
    title: "Multi-language Platform",
    description: "Serve customers in Arabic, English. Reach a truly diverse luxury audience.",
    colorTheme: "blue" as FeatureColorTheme,
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="w-full max-w-7xl mx-auto py-10 px-6 sm:px-12 flex flex-col items-center text-center z-10 relative">
      <Pill>Why Sell on Douxsii</Pill>
      <SectionTitle text="Everything You Need to" highlightText="Succeed" className="mb-4" />
      <SectionSubtitle className="mb-16">
        Doxie gives you the tools, audience, and infrastructure to scale your luxury brand effortlessly.
      </SectionSubtitle>

      {/* Responsive feature grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-left">
        {FEATURES_DATA.map((feat, idx) => (
          <FeatureCard
            key={idx}
            icon={feat.icon}
            title={feat.title}
            description={feat.description}
            colorTheme={feat.colorTheme}
          />
        ))}
      </div>
    </section>
  );
};
export default FeaturesSection;
