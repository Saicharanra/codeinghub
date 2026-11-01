import React, { Suspense } from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import TutorialsHomeClient from "@/components/tutorials/TutorialsHomeClient";
import AdSlot from "@/components/ads/AdSlot";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Learn Something New - Programming & Analytics Tutorials | Coding Hub",
  description:
    "Explore high-quality, practical tutorials in Python, SQL and Databases, Power BI, Data Analytics, Web Development, and Java Programming. Designed for students, developers, and data learners.",
  canonicalUrl: "/tutorials",
});

export default function TutorialsPage() {
  return (
    <div className="py-6 sm:py-10 space-y-8 max-w-[1180px] mx-auto">
      <Breadcrumbs items={[{ label: "Tutorials" }]} />

      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER} label="Sponsored Ad" />

      <Suspense
        fallback={
          <div className="py-16 text-center text-[#737373] text-sm font-mono">
            Loading tutorials academy...
          </div>
        }
      >
        <TutorialsHomeClient />
      </Suspense>

      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER} label="Sponsored Ad" />
    </div>
  );
}