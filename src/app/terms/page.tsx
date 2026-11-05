import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import PageHeader from "@/components/common/PageHeader";
import AdSlot from "@/components/ads/AdSlot";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Terms and Conditions - Coding Hub",
  description:
    "Review the terms of service and conditions for using Coding Hub's free developer tools, academic calculators, and educational tutorials.",
  canonicalUrl: "/terms",
});

export default function TermsPage() {
  const lastUpdated = "November 1, 2026";

  return (
    <div className="py-6 sm:py-8 space-y-8">
      <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />

      <PageHeader
        badge="Terms of Service"
        badgeColor="indigo"
        title="Terms and Conditions"
        description="Please review our terms of use governing access to Coding Hub's online tools, educational content, and services."
      />

      <div className="max-w-4xl space-y-6 text-[#202124] text-sm sm:text-base leading-relaxed">
        <div className="p-3 rounded bg-white border border-[#E7E7E3] text-xs font-mono text-[#737373]">
          Last Updated: <strong className="text-[#202124]">{lastUpdated}</strong>
        </div>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#202124]">1. Acceptance of Terms</h2>
          <p className="text-[#737373]">
            By accessing and utilizing Coding Hub (https://codeinghub.me), you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#202124]">2. Educational Use License</h2>
          <p className="text-[#737373]">
            Permission is granted to freely access, run, and utilize the software tools, calculators, formatters, and educational tutorials hosted on Coding Hub for personal, academic, or professional developer workflows.
          </p>
          <p className="text-[#737373]">
            You agree not to attempt to reverse engineer, disrupt network availability, conduct denial-of-service attempts, or inject malicious payloads into the service.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#202124]">3. Academic & Computational Disclaimer</h2>
          <div className="p-3.5 rounded bg-[#FAFAF8] border border-[#E7E7E3] text-[#737373] text-xs sm:text-sm space-y-1">
            <strong className="text-[#202124]">Important Academic Notice:</strong>
            <p>
              Calculators provided on this platform—including the CGPA Calculator, Percentage Calculator, and Attendance Calculator—are designed as educational planning aids. Individual academic institutions, collegiate boards, and examination controllers may apply unique rounding algorithms, credit weightings, or attendance criteria. Students are advised to verify official standings with their university administration.
            </p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#202124]">4. Disclaimer of Warranties</h2>
          <p className="text-[#737373]">
            Coding Hub is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied. While we strive for rigorous precision in all tools and code tutorials, we do not guarantee that the site will be error-free or uninterrupted.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#202124]">5. Limitation of Liability</h2>
          <p className="text-[#737373]">
            In no event shall Coding Hub, its creators, or contributors be held liable for any direct, indirect, incidental, special, exemplary, or consequential damages resulting from your use or inability to use the tools or tutorials on this website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#202124]">6. Advertisements and External Links</h2>
          <p className="text-[#737373]">
            Coding Hub displays third-party advertisements via Google AdSense to sustain free hosting and development. We do not endorse the products or services advertised by third-party ad networks. Clicking on external links or advertisements directs you to external web properties outside our editorial control.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#202124]">7. Modifications to Terms</h2>
          <p className="text-[#737373]">
            We reserve the right to revise or update these Terms and Conditions at any time without prior notice. Continued use of Coding Hub constitutes acceptance of the current terms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#202124]">8. Contact Information</h2>
          <p className="text-[#737373]">
            For any legal inquiries or questions regarding these terms, please contact us at: <code>contact@codeinghub.me</code>.
          </p>
        </section>
      </div>

      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER} label="Sponsored Ad" />
    </div>
  );
}
