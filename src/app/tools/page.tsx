import React, { Suspense } from "react";
import { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ToolsDirectoryClient from "@/components/tools/ToolsDirectoryClient";
import AdSlot from "@/components/ads/AdSlot";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Free Online Tools Directory - Student Calculators & Dev Utilities",
  description:
    "Explore 100% free online tools for university students and developers: CGPA Calculator, Attendance Calculator, Percentage Calculator, JSON Formatter, Word Counter, and Case Converter.",
  canonicalUrl: "/tools",
});

export default function ToolsPage() {
  return (
    <div className="py-6 sm:py-10 space-y-8">
      <Breadcrumbs items={[{ label: "Tools Directory" }]} />

      <PageHeader
        badge="Productivity Hub"
        badgeColor="indigo"
        title="Interactive Tools Directory"
        description="Fast, reliable, and privacy-first online tools for students, software engineers, and data learners. All computations are handled locally in your browser."
      />

      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER} label="Sponsored Ad" />

      <Suspense
        fallback={
          <div className="py-12 text-center text-slate-500 text-sm">
            Loading interactive tools directory...
          </div>
        }
      >
        <ToolsDirectoryClient />
      </Suspense>

      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER} label="Sponsored Ad" />
    </div>
  );
}
