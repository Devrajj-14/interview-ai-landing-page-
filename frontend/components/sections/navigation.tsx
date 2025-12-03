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
        <div className="mx-auto flex h-[70px] max-w-[1280px] items-center justify-between">
          <Link href="/" aria-label="Go to the Home page">
            <div className="text-3xl font-bold text-primary">Cops Interview</div>
          </Link>

          <div className="hidden items-center lg:flex">
            <nav className="flex items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group relative block px-5 py-2 text-[17px] text-foreground font-['DM_Sans',_sans-serif]"
                >
                  {link.label}
                  <div className="absolute bottom-0 left-1/2 h-[3px] w-[calc(100%-48px)] -translate-x-1/2 scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              ))}
            </nav>
            <Link
              href="/hire"
              className="ml-4 rounded-full bg-primary px-6 py-2.5 text-[16px] font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg"
            >
              Let's Talk
            </Link>
          </div>

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
          <Link
            href="/hire"
            onClick={toggleMenu}
            className="rounded-full bg-primary px-8 py-4 text-2xl font-semibold text-white transition-all hover:bg-primary/90"
          >
            Let's Talk
          </Link>
        </nav>
      </div>
    </>
  );
}
