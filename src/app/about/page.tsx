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
  Heart,
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
    <div className="py-6 sm:py-10 space-y-12">
      <Breadcrumbs items={[{ label: "About Us" }]} />

      <PageHeader
        badge="Our Mission"
        badgeColor="indigo"
        title="About Coding Hub"
        description="Built to eliminate cluttered, bloated calculation sites and provide students and developers with fast, honest, and completely free web utilities."
      />

      {/* Origin Story Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Why We Built Coding Hub
          </h2>
          <p>
            Every university student and coder has had the same frustrating experience: you search for a simple attendance or GPA calculator, or you want to format a piece of JSON, only to land on an outdated website covered in popups, slow reload loops, and deceptive download buttons.
          </p>
          <p>
            Even worse, many existing web utilities silently upload your text and calculations to third-party tracking servers, storing your inputs without your informed consent.
          </p>
          <p>
            We created <strong>Coding Hub</strong> to set a new standard: an open, modern SaaS-grade web platform that performs calculations instantly in your browser, prioritizes user privacy, and pairs functional tools with high-quality educational guides.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="p-6 rounded-3xl bg-surface-card border border-slate-800 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 border border-indigo-700/40 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Our Engineering Principles</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Privacy First:</strong> Calculators operate 100% client-side via JavaScript.</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span><strong>No Artificial Latency:</strong> Zero round-trips to backend servers for basic calculations.</span>
              </li>
              <li className="flex items-start gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span><strong>Verified Math:</strong> Transparent formulas that mirror accredited university systems.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT} label="Sponsored Placement" />

      {/* Target Audiences */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center">
          Who Is Coding Hub For?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-surface-card border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">University & College Students</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Plan your semester GPA, calculate exam percentage thresholds, and monitor lecture attendance to prevent debarment with zero stress.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-card border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-purple-400">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Software Developers</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Format API payloads, inspect JSON syntax errors, convert variable casing, and check character limits without leaving your browser tab.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-card border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-pink-400">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Self-Taught Learners</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Access genuine, practically verified tutorials on Python, SQL query optimization, Power BI dashboards, and modern React architectures.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Have a suggestion or feedback?</h3>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          Coding Hub is continuously maintained. If there is an academic calculator or developer tool you would like us to build, let us know!
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-glow transition-all"
        >
          <span>Get in Touch With Us</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
