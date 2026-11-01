import React, { Suspense } from "react";
import { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import TutorialsDirectoryClient from "@/components/tutorials/TutorialsDirectoryClient";
import AdSlot from "@/components/ads/AdSlot";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Tech Tutorials & Engineering Guides - Python, SQL, Power BI, Web Dev",
  description:
    "Comprehensive, practical programming and data analytics tutorials. Master Python, SQL query optimization, Power BI dashboards, data analytics, modern web development, and JavaScript.",
  canonicalUrl: "/tutorials",
});

export default function TutorialsPage() {
  return (
    <div className="py-6 sm:py-10 space-y-8">
      <Breadcrumbs items={[{ label: "Tutorials Directory" }]} />

      <PageHeader
        badge="Technical Knowledge Base"
        badgeColor="purple"
        title="Comprehensive Tech & Analytics Tutorials"
        description="Structured, production-tested educational guides designed to build genuine software engineering and data analytics skills. From fundamentals to advanced workflows."
      />

      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER} label="Sponsored Ad" />

      <Suspense
        fallback={
          <div className="py-12 text-center text-slate-500 text-sm">
            Loading tutorials directory...
          </div>
        }
      >
        <TutorialsDirectoryClient />
      </Suspense>

      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER} label="Sponsored Ad" />
    </div>
  );
}
