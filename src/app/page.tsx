import React from "react";
import { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import FeaturedTools from "@/components/home/FeaturedTools";
import CategoriesGrid from "@/components/home/CategoriesGrid";
import PopularTutorials from "@/components/home/PopularTutorials";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import NewsletterSection from "@/components/common/NewsletterSection";
import AdSlot from "@/components/ads/AdSlot";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Coding Hub — Useful Developer Tools, Academic Calculators & Tech Tutorials",
  description:
    "Free, fast, privacy-friendly online developer utilities and student calculators. CGPA Calculator, Attendance Calculator, JSON Formatter, Word Counter, Case Converter, and practical tech guides.",
  canonicalUrl: "/",
});

export default function HomePage() {
  return (
    <div className="space-y-4">
      {/* 1. Left-Aligned Editorial Hero */}
      <HeroSection />

      {/* Tasteful AdSlot (collapses cleanly when unconfigured) */}
      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER} label="Advertisement" />

      {/* 2. Structured Featured Tools (Student & Developer categories) */}
      <FeaturedTools />

      {/* 3. Categories Overview */}
      <CategoriesGrid />

      {/* Content AdSlot */}
      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT} label="Advertisement" />

      {/* 4. Editorial Article-List Tutorials */}
      <PopularTutorials />

      {/* 5. Why Choose Coding Hub */}
      <WhyChooseUs />

      {/* 6. Minimal Newsletter Subscription */}
      <NewsletterSection />
    </div>
  );
}