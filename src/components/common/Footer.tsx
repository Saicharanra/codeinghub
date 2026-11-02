import React from "react";
import Link from "next/link";
import CookiePreferencesButton from "@/components/common/CookiePreferencesButton";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#E7E7E3] bg-[#FAFAF8] text-[#737373] mt-24">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand & Description */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 text-[#202124]">
              <div className="w-5 h-5 rounded bg-[#176B50] flex items-center justify-center text-white text-[10px] font-semibold">
                CH
              </div>
              <span className="font-semibold text-sm tracking-tight">Coding Hub</span>
            </Link>
            <p className="text-xs text-[#737373] leading-relaxed max-w-xs">
              Simple, free, and practical tools for students, developers, and data learners. Built for usability, client-side privacy, and clean reading.
            </p>
          </div>

          {/* Tools Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#202124] mb-3">
              Tools
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/tools/cgpa-calculator" className="hover:text-[#176B50] transition-colors">
                  CGPA Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/percentage-calculator" className="hover:text-[#176B50] transition-colors">
                  Percentage Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/attendance-calculator" className="hover:text-[#176B50] transition-colors">
                  Attendance Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/json-formatter" className="hover:text-[#176B50] transition-colors">
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link href="/tools/word-counter" className="hover:text-[#176B50] transition-colors">
                  Word Counter
                </Link>
              </li>
              <li>
                <Link href="/tools/text-case-converter" className="hover:text-[#176B50] transition-colors">
                  Text Case Converter
                </Link>
              </li>
            </ul>
          </div>

          {/* Learning Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#202124] mb-3">
              Learning Resources
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/tutorials/python" className="hover:text-[#176B50] transition-colors">
                  Python Programming
                </Link>
              </li>
              <li>
                <Link href="/tutorials/sql" className="hover:text-[#176B50] transition-colors">
                  SQL & Databases
                </Link>
              </li>
              <li>
                <Link href="/tutorials/power-bi" className="hover:text-[#176B50] transition-colors">
                  Power BI & DAX
                </Link>
              </li>
              <li>
                <Link href="/tutorials/data-analytics" className="hover:text-[#176B50] transition-colors">
                  Data Analytics
                </Link>
              </li>
              <li>
                <Link href="/tutorials/web-development" className="hover:text-[#176B50] transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/tutorials/java" className="hover:text-[#176B50] transition-colors">
                  Java Programming
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#202124] mb-3">
              About & Legal
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-[#176B50] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#176B50] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#176B50] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#176B50] transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <CookiePreferencesButton className="hover:text-[#176B50] transition-colors text-left" />
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#E7E7E3] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#737373]">
          <p>&copy; {currentYear} Coding Hub. All calculations run locally in your browser.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-[#202124]">
              Privacy
            </Link>
            <span>&bull;</span>
            <Link href="/terms" className="hover:text-[#202124]">
              Terms
            </Link>
            <span>&bull;</span>
            <CookiePreferencesButton className="hover:text-[#202124] transition-colors" />
            <span>&bull;</span>
            <Link href="/contact" className="hover:text-[#202124]">
              Feedback
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
