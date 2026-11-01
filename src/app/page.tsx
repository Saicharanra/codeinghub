import React from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturedTools from "@/components/home/FeaturedTools";
import CategoriesGrid from "@/components/home/CategoriesGrid";
import PopularTutorials from "@/components/home/PopularTutorials";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import NewsletterSection from "@/components/common/NewsletterSection";
import AdSlot from "@/components/ads/AdSlot";
import Link from "next/link";
import { Sparkles, ArrowRight, BookOpen, Terminal } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-12 pb-12">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* Tasteful AdSlot */}
      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER} label="Sponsored Ad" />

      {/* 2. Featured Tools */}
      <FeaturedTools />

      {/* 3. Categories Section */}
      <CategoriesGrid />

      {/* Content AdSlot */}
      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT} label="Sponsored Placement" />

      {/* 4. Popular Tutorials */}
      <PopularTutorials />

      {/* 5. Latest Learning Resources Section */}
      <section className="my-20">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-cyan-950/20 via-[#0c101c] to-violet-950/20 border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          {/* Subtle glow orb */}
          <div className="absolute top-0 right-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 max-w-xl text-center md:text-left relative">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HANDCRAFTED TECHNICAL GUIDES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Master the Fundamentals with Zero Fluff
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Explore step-by-step guides on SQL window functions, Python data automation, Power BI DAX formulas, and production React architecture.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 relative">
            <Link
              href="/tutorials"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-glow-multi transition-all duration-200"
            >
              <BookOpen className="w-4 h-4" />
              <span>Browse All Guides</span>
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] transition-all duration-200"
            >
              <span>Explore Calculators</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Coding Hub */}
      <WhyChooseUs />

      {/* 7. Newsletter Subscription */}
      <NewsletterSection />
    </div>
  );
}
