import React from "react";
import Link from "next/link";
import { Terminal, ShieldCheck } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#06080e]/95 text-slate-400 mt-20 relative">
      {/* Top accent light */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400/40 via-violet-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 via-violet-500 to-fuchsia-500 p-[1.5px] shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <div className="w-full h-full bg-[#080b14] rounded-[10px] flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Coding<span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Free, fast, and privacy-focused online tools for college students, software engineers, and analytics learners. No bloated frameworks, zero intrusive popups.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% In-Browser Execution • Zero Server Logs</span>
            </div>
          </div>

          {/* Student Tools */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-200 mb-4">
              Student Calculators
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tools/cgpa-calculator" className="hover:text-cyan-400 transition-colors">
                  CGPA Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/percentage-calculator" className="hover:text-cyan-400 transition-colors">
                  Percentage Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/attendance-calculator" className="hover:text-cyan-400 transition-colors">
                  Attendance Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-xs text-cyan-400 hover:text-cyan-300 font-mono font-medium pt-1 inline-block">
                  View All Tools &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Tools */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-200 mb-4">
              Developer Utilities
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tools/json-formatter" className="hover:text-violet-400 transition-colors">
                  JSON Formatter & Validator
                </Link>
              </li>
              <li>
                <Link href="/tools/word-counter" className="hover:text-violet-400 transition-colors">
                  Word & Character Counter
                </Link>
              </li>
              <li>
                <Link href="/tools/text-case-converter" className="hover:text-violet-400 transition-colors">
                  Text Case Converter
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-xs text-violet-400 hover:text-violet-300 font-mono font-medium pt-1 inline-block">
                  Explore Tech Guides &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Legal */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-200 mb-4">
              Platform & Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-slate-200 transition-colors">
                  About Coding Hub
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-slate-200 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-slate-200 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-slate-200 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>
            &copy; {currentYear} Coding Hub. Free and open for students and engineers worldwide.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-slate-300">
              Cookie Policy
            </Link>
            <span>&bull;</span>
            <Link href="/terms" className="hover:text-slate-300">
              Terms of Use
            </Link>
            <span>&bull;</span>
            <span className="text-slate-400">
              Crafted with care
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
