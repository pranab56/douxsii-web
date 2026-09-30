import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Smartphone } from "lucide-react";
import { InstagramIcon, TwitterIcon, FacebookIcon, YoutubeIcon } from "./SocialIcons";
import { FooterTitle } from "../ui/FooterTitle";

const SOCIALS = [
  { icon: <InstagramIcon />, label: "Instagram" },
  { icon: <TwitterIcon />, label: "Twitter" },
  { icon: <FacebookIcon />, label: "Facebook" },
  { icon: <YoutubeIcon />, label: "YouTube" },
];

const LINKS = {
  quick: [
    { label: "Home", href: "/" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
    { label: "Become a Vendor", href: "#register" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "About Us", href: "#" },
  ],
};

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="w-full bg-[#130103] border-t border-[#EF524626] py-16 px-6 sm:px-12 select-none relative z-10 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
        {/* Brand block */}
        <div className="md:col-span-4 flex flex-col items-start gap-4">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Brand Logo" width={300} height={100} className="h-10 sm:h-11 md:h-12 w-auto object-contain shrink-0" />
          </Link>
          <p className="text-[#F5E8FF73] text-xs sm:text-[13px] font-normal leading-relaxed max-w-sm">
            The luxury flower & gifting marketplace of the UAE. Connecting premium vendors with thousands of discerning customers.
          </p>
          <div className="flex gap-3 mt-2">
            {SOCIALS.map((soc) => (
              <a key={soc.label} href="#" aria-label={soc.label} className="h-9 w-9 rounded-full border border-[#EF524626] bg-[#33171d]/20 flex items-center justify-center text-[#F5E8FF]/60 hover:text-white hover:border-[#FF7A75]/35 hover:bg-[#33171d]/60 transition-all duration-300">
                {soc.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <FooterTitle>Quick Links</FooterTitle>
          <nav className="flex flex-col gap-2.5 text-xs sm:text-[13px] text-[#F5E8FF73] font-normal">
            {LINKS.quick.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-white transition-colors duration-200">{link.label}</Link>
            ))}
          </nav>
        </div>

        {/* Legal */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <FooterTitle>Legal</FooterTitle>
          <nav className="flex flex-col gap-2.5 text-xs sm:text-[13px] text-[#F5E8FF73] font-normal">
            {LINKS.legal.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-white transition-colors duration-200">{link.label}</Link>
            ))}
          </nav>
        </div>

        {/* Contact & Download */}
        <div className="md:col-span-4 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <FooterTitle>Contact Us</FooterTitle>
            <div className="flex flex-col gap-3 text-xs sm:text-[13px] text-[#F5E8FF73] font-normal">
              <a href="mailto:vendors@denior.ae" className="flex items-center gap-2.5 hover:text-white transition-colors duration-200">
                <Mail size={14} className="text-[#FF7A75]" /> vendors@denior.ae
              </a>
              <a href="tel:+97140000000" className="flex items-center gap-2.5 hover:text-white transition-colors duration-200">
                <Phone size={14} className="text-[#FF7A75]" /> +971 4 000 0000
              </a>
              <span className="flex items-center gap-2.5">
                <MapPin size={14} className="text-[#FF7A75]" /> Dubai, UAE
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <FooterTitle>Download App</FooterTitle>
            <div className="flex flex-col gap-3">
              {["App Store (iOS)", "Google Play"].map((app) => (
                <a key={app} href="#" className="flex items-center gap-2.5 px-4 py-2.5 border border-[#EF524626] bg-[#33171d]/20 rounded-xl text-xs text-[#F5E8FF73] font-normal hover:text-white hover:border-[#FF7A75]/35 hover:bg-[#33171d]/40 transition-all duration-300 w-48">
                  <Smartphone size={14} className="text-[#FF7A75]" /> {app}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto border-t border-[#EF524626] mt-12 pt-6 text-center md:text-left">
        <p className="text-[11px] text-[#F5E8FFB2]">© 2026 Denior Luxury Marketplace. All rights reserved.</p>
      </div>

    </footer>
  );
};
export default Footer;
