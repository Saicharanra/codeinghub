"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ArrowRight, Sparkles } from "lucide-react";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools" },
    { name: "Tutorials", href: "/tutorials" },
    { name: "About", href: "/about" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#E7E7E3] bg-[#FAFAF8]/95 backdrop-blur-md">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo & Wordmark */}
            <Link
              href="/"
              className="flex items-center gap-2.5 text-[#202124] hover:text-[#176B50] transition-colors focus-visible:ring-2 focus-visible:ring-[#176B50] rounded-md"
            >
              <div className="w-6 h-6 rounded bg-[#176B50] flex items-center justify-center text-white text-xs font-semibold tracking-tighter shadow-sm">
                CH
              </div>
              <span className="font-heading font-bold text-[17px] tracking-tight text-[#202124]">
                Coding Hub
              </span>
            </Link>

            {/* Center: Clean Navigation Links */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[15px] transition-colors py-1 ${
                    isActive(link.href)
                      ? "text-[#176B50] font-semibold border-b-2 border-[#176B50]"
                      : "text-[#737373] font-medium hover:text-[#202124]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right: Search & Explore Tools CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#E7E7E3] bg-[#FFFFFF] hover:border-[#D3D3CD] text-[#737373] hover:text-[#202124] text-[14px] font-medium transition-colors shadow-subtle"
                aria-label="Search tools and guides"
              >
                <Search className="w-3.5 h-3.5 text-[#737373]" />
                <span>Search</span>
                <kbd className="ml-1 px-1.5 py-0.5 rounded bg-[#FAFAF8] text-[11px] font-mono text-[#737373] border border-[#E7E7E3]">
                  ⌘K
                </kbd>
              </button>

              <Link
                href="/tools"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#176B50] hover:bg-[#12543E] text-white text-[15px] font-semibold transition-colors shadow-sm"
              >
                <span>Explore Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-md border border-[#E7E7E3] bg-[#FFFFFF] text-[#737373] hover:text-[#202124]"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md border border-[#E7E7E3] bg-[#FFFFFF] text-[#737373] hover:text-[#202124]"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-[#E7E7E3] bg-[#FFFFFF] px-4 py-3 space-y-2 animate-in fade-in slide-in-from-top-1 duration-150">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-[15px] ${
                  isActive(link.href)
                    ? "text-[#176B50] font-semibold bg-[#EBF5F1]"
                    : "text-[#737373] font-medium hover:text-[#202124] hover:bg-[#FAFAF8]"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-[#E7E7E3]">
              <Link
                href="/tools"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-md bg-[#176B50] text-white text-[15px] font-semibold hover:bg-[#12543E] transition-colors"
              >
                <span>Explore Free Tools</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}