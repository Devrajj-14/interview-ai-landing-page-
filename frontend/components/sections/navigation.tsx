"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#", label: "For Companies" },
  { href: "#", label: "For Candidates" },
  { href: "#", label: "About us" },
  { href: "#", label: "Contact us" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header
        id="mainNav"
        className={`sticky top-0 z-[999] w-full bg-[#F5F4EE] px-8 md:px-24 transition-shadow duration-300 ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="mx-auto flex h-[84.5px] max-w-[1280px] items-center justify-between">
          <Link href="/" aria-label="Go to the Home page">
            <div className="text-3xl font-bold text-primary">Cops Interview</div>
          </Link>

          <nav className="hidden items-center lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group relative block px-6 pt-8 pb-2 text-[20px] text-foreground font-['DM_Sans',_sans-serif]"
              >
                {link.label}
                <div className="absolute bottom-[12px] left-1/2 h-[3px] w-[calc(100%-48px)] -translate-x-1/2 scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <button
            onClick={toggleMenu}
            className="z-50 text-foreground lg:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[998] bg-[#F5F4EE] transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={toggleMenu}
              className="text-3xl font-semibold text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
