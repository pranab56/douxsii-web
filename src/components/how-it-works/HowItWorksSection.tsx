import React from "react";
import { ClipboardCheck, FileText, ShieldCheck, Upload, ShoppingCart, ArrowRight } from "lucide-react";
import { Pill } from "../ui/Pill";
import { SectionTitle } from "../ui/SectionTitle";
import { SectionSubtitle } from "../ui/SectionSubtitle";
import { StepCard, StepColorTheme } from "../ui/StepCard";
import { Button } from "../ui/Button";

// Steps configuration data array
const STEPS_DATA = [
  {
    stepNumber: "01",
    icon: <ClipboardCheck size={20} />,
    title: "Apply as Vendor",
    description: "Fill out our simple vendor application form with your business details and product category.",
    colorTheme: "purple" as StepColorTheme,
  },
  {
    stepNumber: "02",
    icon: <FileText size={20} />,
    title: "Submit Documents",
    description: "Upload your trade license, store information, and product photos for verification.",
    colorTheme: "indigo" as StepColorTheme,
  },
  {
    stepNumber: "03",
    icon: <ShieldCheck size={20} />,
    title: "Get Approved",
    description: "Our team reviews your application within 24-48 hours and sends your approval notification.",
    colorTheme: "magenta" as StepColorTheme,
  },
  {
    stepNumber: "04",
    icon: <Upload size={20} />,
    title: "Upload Products",
    description: "Add your luxury products, set prices, write descriptions, and configure delivery options.",
    colorTheme: "amber" as StepColorTheme,
  },
  {
    stepNumber: "05",
    icon: <ShoppingCart size={20} />,
    title: "Start Receiving Orders",
    description: "Go live and start earning! Manage orders, track revenue, and grow your luxury brand.",
    colorTheme: "pink" as StepColorTheme,
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="w-full max-w-7xl mx-auto py-12 px-6 sm:px-12 flex flex-col items-center z-10 relative">
      <Pill>How It Works</Pill>
      <SectionTitle text="Start Selling in" highlightText="5 Simple Steps" className="mb-4 text-center" />
      <SectionSubtitle className="mb-16 text-center">
        From registration to your first order — we've made the journey as smooth as possible.
      </SectionSubtitle>

      {/* Steps timeline grid container */}
      <div className="relative w-full z-10 mb-16">
        {/* Timeline Connector Line */}
        <div className="absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#EF5246]/20 to-transparent hidden md:block z-0" />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full">
          {STEPS_DATA.map((step, idx) => (
            <StepCard
              key={idx}
              stepNumber={step.stepNumber}
              icon={step.icon}
              title={step.title}
              description={step.description}
              colorTheme={step.colorTheme}
            />
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <a href="#register" className="inline-flex">
        <Button variant="primary" className="group">
          Start Your Application{" "}
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform duration-250"
          />
        </Button>
      </a>
    </section>
  );
};
export default HowItWorksSection;
