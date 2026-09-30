import { Navbar } from "../components/navbar/Navbar";
import { Banner } from "../components/banner/Banner";
import { FeaturesSection } from "../components/features/FeaturesSection";
import { StatsSection } from "../components/stats/StatsSection";
import { HowItWorksSection } from "../components/how-it-works/HowItWorksSection";
import { DashboardSection } from "../components/dashboard/DashboardSection";
import { FAQSection } from "../components/faq/FAQSection";
import { RegistrationForm } from "../components/vendor-registration/RegistrationForm";
import { Footer } from "../components/footer/Footer";
import { Pill } from "../components/ui/Pill";
import { SectionTitle } from "../components/ui/SectionTitle";
import { SectionSubtitle } from "../components/ui/SectionSubtitle";
import { GradientDivider } from "../components/ui/GradientDivider";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between font-sans relative scroll-smooth bg-[#210309] text-white">
      {/* Header and navigation */}
      <Navbar />

      {/* Content layout: components separated by matching responsive gap */}
      <main className="flex-1 w-full flex flex-col items-center justify-center z-10 gap-[60px] sm:gap-[80px] md:gap-[100px]">
        <Banner />
        <FeaturesSection />
        <GradientDivider />
        <StatsSection />
        <GradientDivider />
        <HowItWorksSection />
        <GradientDivider />
        <DashboardSection />
        <GradientDivider />
        <FAQSection />
        <GradientDivider />
        
        {/* Vendor Registration section integrated directly into Home page */}
        <section id="register" className="w-full flex flex-col items-center justify-center pt-8">
          <div className="flex flex-col items-center text-center mb-10 select-none px-6">
            <Pill>Vendor Registration</Pill>
            <SectionTitle
              text="Start Your"
              highlightText="Denior Journey"
              highlightColor="text-[#FF7A75]"
              className="mb-4"
            />
            <SectionSubtitle className="max-w-md">
              Join 100+ vendors already growing their luxury brands on Denior.
            </SectionSubtitle>
          </div>
          <RegistrationForm />
        </section>
        <GradientDivider />
      </main>

      {/* Global Footer component */}
      <Footer />
    </div>
  );
}
