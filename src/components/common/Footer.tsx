import React from "react";
import Link from "next/link";
import { Github, Twitter, MapPin } from "lucide-react";
import CookiePreferencesButton from "@/components/common/CookiePreferencesButton";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#E7E7E3] bg-[#FAFAF8] text-[#737373] mt-20">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand & Description (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3.5">
            <Link href="/" className="flex items-center gap-2.5 text-[#202124]">
              <div className="w-6 h-6 rounded bg-[#176B50] flex items-center justify-center text-white text-xs font-semibold tracking-tighter shadow-sm">
                CH
              </div>
              <span className="font-heading font-bold text-[17px] tracking-tight text-[#202124]">
                Coding Hub
              </span>
            </Link>
            <p className="text-[14px] text-[#737373] leading-relaxed max-w-sm">
              Free, private, and practical online tools for university students, developers, and data analytics learners. All computations execute locally in your browser with zero data telemetry.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[#737373]">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md bg-white border border-[#E7E7E3] hover:border-[#176B50] hover:text-[#176B50] flex items-center justify-center transition-colors shadow-subtle"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md bg-white border border-[#E7E7E3] hover:border-[#176B50] hover:text-[#176B50] flex items-center justify-center transition-colors shadow-subtle"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tools Navigation */}
          <div>
            <h3 className="text-[13px] font-mono font-semibold uppercase tracking-wider text-[#202124] mb-3">
              Tools &amp; Calculators
            </h3>
            <ul className="space-y-2.5 text-[14px]">
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
            <h3 className="text-[13px] font-mono font-semibold uppercase tracking-wider text-[#202124] mb-3">
              Learning Tracks
            </h3>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <Link href="/tutorials/python" className="hover:text-[#176B50] transition-colors">
                  Python Programming
                </Link>
              </li>
              <li>
                <Link href="/tutorials/sql" className="hover:text-[#176B50] transition-colors">
                  SQL &amp; Databases
                </Link>
              </li>
              <li>
                <Link href="/tutorials/java" className="hover:text-[#176B50] transition-colors">
                  Java Programming
                </Link>
              </li>
              <li>
                <Link href="/tutorials/power-bi" className="hover:text-[#176B50] transition-colors">
                  Power BI &amp; DAX
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
            </ul>
          </div>

          {/* About & Legal */}
          <div>
            <h3 className="text-[13px] font-mono font-semibold uppercase tracking-wider text-[#202124] mb-3">
              About &amp; Legal
            </h3>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <Link href="/about" className="hover:text-[#176B50] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#176B50] transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#176B50] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#176B50] transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-[#176B50] transition-colors font-mono text-[12px]">
                  XML Sitemap
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
          <p>&copy; {currentYear} Coding Hub. Free and open client-side tools.</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/privacy-policy" className="hover:text-[#202124] transition-colors">
              Privacy
            </Link>
            <span>&bull;</span>
            <Link href="/terms" className="hover:text-[#202124] transition-colors">
              Terms
            </Link>
            <span>&bull;</span>
            <Link href="/sitemap.xml" className="hover:text-[#202124] transition-colors">
              Sitemap
            </Link>
            <span>&bull;</span>
            <CookiePreferencesButton className="hover:text-[#202124] transition-colors" />
            <span>&bull;</span>
            <Link href="/contact" className="hover:text-[#202124] transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}