"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Code2,
  Search,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Terminal,
} from "lucide-react";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools", badge: "6 Tools" },
    { name: "Tutorials", href: "/tutorials", badge: "Guides" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.07] bg-[#06080e]/85 backdrop-blur-xl transition-all">
        {/* Subtle accent top line */}
        <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-cyan-400/60 via-violet-500/60 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-xl p-1"
            >
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-violet-500 to-fuchsia-500 p-[1.5px] shadow-[0_0_20px_rgba(139,92,246,0.35)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] group-hover:scale-105 transition-all duration-300">
                <div className="w-full h-full bg-[#080b14] rounded-[10px] flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-cyan-400 group-hover:text-violet-400 transition-colors" />
                </div>
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-slate-100">
                  Coding<span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Hub</span>
                </span>
                <span className="hidden sm:block text-[10px] font-mono tracking-wider text-slate-500 -mt-1">
                  DEV &bull; CALCULATE &bull; LEARN
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.href)
                      ? "text-white bg-white/[0.08] shadow-inner border border-white/[0.08]"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="ml-1.5 text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-violet-950/80 text-violet-300 border border-violet-700/50">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/[0.08] bg-[#0c101c]/80 hover:bg-[#151d33] text-slate-400 hover:text-slate-200 text-xs transition-all shadow-sm hover:border-violet-500/40 group"
                aria-label="Open search modal"
              >
                <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:text-violet-400 transition-colors" />
                <span>Search tools & guides...</span>
                <kbd className="ml-2 px-1.5 py-0.5 rounded bg-white/[0.06] text-[10px] font-mono text-slate-400 border border-white/[0.08]">
                  Ctrl K
                </kbd>
              </button>

              <Link
                href="/tools"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-glow-multi transition-all duration-200 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explore Tools</span>
              </Link>
            </div>

            {/* Mobile Menu & Search Buttons */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-xl border border-white/[0.08] bg-[#0c101c] text-slate-300 hover:text-white"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-cyan-400" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl border border-white/[0.08] bg-[#0c101c] text-slate-300 hover:text-white"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-white/[0.08] bg-[#06080e]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium ${
                  isActive(link.href)
                    ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                    : "text-slate-300 hover:bg-white/[0.04]"
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>
            ))}

            <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
              <Link
                href="/tools"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600"
              >
                <Sparkles className="w-4 h-4" />
                <span>Explore All Tools</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
