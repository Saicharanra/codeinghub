import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import PageHeader from "@/components/common/PageHeader";
import AdSlot from "@/components/ads/AdSlot";
import ContactForm from "@/components/contact/ContactForm";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Contact Coding Hub - Engineering Support & Feedback",
  description:
    "Have a question, tool suggestion, or discrepancy report? Reach out directly to the Coding Hub technical team. Fast responses within 24-48 hours.",
  canonicalUrl: "/contact",
});

export default function ContactPage() {
  return (
    <div className="py-6 sm:py-8 space-y-8">
      <Breadcrumbs items={[{ label: "Contact Us" }]} />

      <PageHeader
        badge="Direct Contact"
        badgeColor="indigo"
        title="Contact Coding Hub"
        description="Have a question, tool suggestion, or discrepancy report? Reach out directly to our engineering team."
      />

      <ContactForm />

      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER} label="Sponsored Placement" />
    </div>
  );
}