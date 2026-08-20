import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { HeroStats } from "./HeroStats";
import { HeroImage } from "./HeroImage";

export const Banner: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto min-h-[calc(100vh-200px)] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-8 sm:pt-16 px-6 sm:px-12 z-10 relative">
      {/* Soft warm light red glowing backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[70%] rounded-full bg-gradient-to-br from-[#EF5246]/18 via-[#ff3b5c]/6 to-transparent blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-[15%] left-[5%] w-[350px] h-[350px] rounded-full bg-[#EF5246]/20 blur-[100px] pointer-events-none -z-10 mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[65%] rounded-full bg-gradient-to-tl from-[#EF5246]/12 via-[#ff4a68]/4 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Left Content Column */}
      <div className="lg:col-span-7 flex flex-col items-start text-left">
        {/* Luxury pill badge */}
        <span className="inline-flex px-4 py-1.5 rounded-full border border-[#63000E]/40 bg-[#46000B]/25 text-red-400 text-xs font-bold uppercase tracking-wider mb-6">
          Luxury Marketplace
        </span>

        {/* Serif premium typography header */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-white leading-[1.15] font-serif">
          Grow Your Business <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-rose-500 to-amber-500">
            with Douxsii
          </span>
        </h1>

        {/* Body content */}
        <p className="text-[#FFE9E880] text-sm sm:text-base font-light leading-relaxed max-w-lg mb-8">
          Join the luxury flower & gifting marketplace and reach thousands of customers.
          Sell flowers, perfumes, chocolates, and premium gifts to an audience that loves luxury.
        </p>

        {/* Figma styled button */}
        <Link href="#register" className="inline-flex">
          <Button variant="primary" className="group">
            Become a Vendor{" "}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-250"
            />
          </Button>
        </Link>

        {/* Separated stats config module */}
        <HeroStats />
      </div>

      {/* Right Graphics Column */}
      <div className="lg:col-span-5 flex justify-center lg:justify-end">
        <HeroImage />
      </div>
    </section>
  );
};
export default Banner;
