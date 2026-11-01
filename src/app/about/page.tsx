import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import PageHeader from "@/components/common/PageHeader";
import AdSlot from "@/components/ads/AdSlot";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import {
  ShieldCheck,
  Zap,
  Code2,
  GraduationCap,
  Terminal,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "About Us - Coding Hub Mission, Philosophy & Team",
  description:
    "Learn about Coding Hub: a fast, privacy-focused online portal providing free productivity calculators and technical tutorials for students and developers.",
  canonicalUrl: "/about",
});

export default function AboutPage() {
  return (
    <div className="py-6 sm:py-8 space-y-10">
      <Breadcrumbs items={[{ label: "About Us" }]} />

      <PageHeader
        badge="About Coding Hub"
        badgeColor="indigo"
        title="About Coding Hub"
        description="Built to eliminate cluttered, bloated calculation sites and provide students and developers with fast, honest, and completely free web utilities."
      />

      {/* Origin Story Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-4 text-[#202124] text-sm sm:text-base leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-bold text-[#202124]">
            Why We Built Coding Hub
          </h2>
          <p className="text-[#737373]">
            Every university student and programmer has had the same frustrating experience: searching for an attendance or GPA calculator, or trying to format a chunk of JSON, only to land on an outdated website covered in intrusive ads, slow page reloads, and misleading buttons.
          </p>
          <p className="text-[#737373]">
            Even worse, many web utilities silently transmit your input data to third-party servers, storing your texts or credentials without clear consent.
          </p>
          <p className="text-[#737373]">
            We created <strong className="text-[#202124]">Coding Hub</strong> to offer a better alternative: an open, modern web tool suite that performs calculations instantly in your browser, prioritizes user privacy, and pairs practical utilities with high-quality educational guides.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="p-6 rounded-lg bg-white border border-[#E7E7E3] space-y-4">
            <h3 className="text-base font-semibold text-[#202124]">Our Guiding Principles</h3>
            <ul className="space-y-3 text-xs sm:text-sm text-[#737373]">
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#176B50] flex-shrink-0 mt-0.5" />
                <span><strong className="text-[#202124]">Privacy First:</strong> Calculators operate 100% client-side via JavaScript.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-[#176B50] flex-shrink-0 mt-0.5" />
                <span><strong className="text-[#202124]">No Artificial Latency:</strong> Zero round-trips to backend servers for calculations.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <GraduationCap className="w-4 h-4 text-[#176B50] flex-shrink-0 mt-0.5" />
                <span><strong className="text-[#202124]">Verified Math:</strong> Transparent formulas that mirror standard university grading models.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT} label="Sponsored Placement" />

      {/* Target Audiences */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#202124]">
          Who Is Coding Hub For?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-lg bg-white border border-[#E7E7E3] space-y-2">
            <div className="w-8 h-8 rounded bg-[#EBF5F1] flex items-center justify-center text-[#176B50] mb-2">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-[#202124]">College Students</h3>
            <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
              Calculate semester GPAs, evaluate exam percentage thresholds, and monitor class attendance requirements to stay ahead.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-white border border-[#E7E7E3] space-y-2">
            <div className="w-8 h-8 rounded bg-[#EBF5F1] flex items-center justify-center text-[#176B50] mb-2">
              <Terminal className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-[#202124]">Software Developers</h3>
            <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
              Format API payloads, inspect JSON syntax errors, convert variable casing, and check character limits without leaving your browser tab.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-white border border-[#E7E7E3] space-y-2">
            <div className="w-8 h-8 rounded bg-[#EBF5F1] flex items-center justify-center text-[#176B50] mb-2">
              <Code2 className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-[#202124]">Data Learners</h3>
            <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
              Read practical, verified tutorials on Python, SQL query optimization, Power BI dashboards, and modern web architectures.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="p-6 sm:p-8 rounded-lg bg-white border border-[#E7E7E3] text-center space-y-3">
        <h3 className="text-lg sm:text-xl font-bold text-[#202124]">Have a suggestion or feedback?</h3>
        <p className="text-xs sm:text-sm text-[#737373] max-w-lg mx-auto">
          Coding Hub is continuously maintained. If there is an academic calculator or developer tool you would like us to build, let us know!
        </p>
        <div className="pt-1">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-mono font-medium text-white bg-[#176B50] hover:bg-[#12543E] transition-colors"
          >
            <span>Get in touch with us</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
