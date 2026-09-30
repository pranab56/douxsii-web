"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/Button";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full max-w-7xl mx-auto flex justify-between items-center z-30 py-5 px-6 sm:px-12 relative">
      {/* Brand logo */}
      <Link href="/" className="flex items-center z-30 shrink-0 my-auto">
        <Image
          src="/logo.png"
          alt="Brand Logo"
          width={1000}
          height={1000}
          priority
          className="h-10 sm:h-11 md:h-13 w-auto object-contain shrink-0"
        />
      </Link>

      {/* Navigation middle links (desktop) */}
      <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#F5E8FFB2]">
        {NAV_LINKS.map((link) => (
          <Link key={link.label} href={link.href} className="hover:text-white transition-colors duration-200 font-sans tracking-wide">
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Action buttons (desktop) */}
      <div className="hidden md:flex items-center gap-4">
        <Link href="#register" className="inline-flex">
          <Button variant="primary" className="!h-[42px] px-5 py-2 !text-xs">Become a Seller</Button>
        </Link>
      </div>

      {/* Hamburger icon (mobile) */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white hover:text-[#FF7A75] transition-colors focus:outline-none z-30">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Drawer menu dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#25080e] border-b border-[#EF524626] shadow-2xl flex flex-col gap-5 p-6 z-20 backdrop-blur-xl md:hidden animate-fade-in">
          <nav className="flex flex-col gap-4 text-[#F5E8FFB2] font-medium text-base">
            {NAV_LINKS.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setIsOpen(false)} className="hover:text-white transition-colors py-1">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="h-[1px] bg-[#3E1119]/50 w-full" />
          <div className="flex flex-col gap-3">
            <Link href="#register" onClick={() => setIsOpen(false)} className="w-full">
              <Button variant="primary" className="w-full !h-[45px] py-2.5 text-xs">Become a Seller</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
