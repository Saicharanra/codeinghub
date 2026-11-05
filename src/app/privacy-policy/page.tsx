import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import PageHeader from "@/components/common/PageHeader";
import AdSlot from "@/components/ads/AdSlot";
import CookiePreferencesButton from "@/components/common/CookiePreferencesButton";
import { constructMetadata } from "@/lib/seo";
import { Lock, ShieldCheck, Settings2 } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy - Coding Hub",
  description:
    "Learn how Coding Hub protects your privacy. Transparent disclosures on local browser processing, cookies, Google Analytics 4, and Google AdSense compliance.",
  canonicalUrl: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const lastUpdated = "November 2, 2026";

  return (
    <div className="py-6 sm:py-8 space-y-8">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <PageHeader
        badge="Data Policy"
        badgeColor="indigo"
        title="Privacy Policy"
        description="Your privacy is paramount. Read our transparent disclosures on local browser execution, cookies, Google Analytics 4, and Google AdSense compliance."
      />

      <div className="max-w-4xl space-y-8 text-[#202124] text-sm sm:text-base leading-relaxed">
        <div className="p-3 rounded bg-white border border-[#E7E7E3] text-xs font-mono text-[#737373]">
          Last Updated: <strong className="text-[#202124]">{lastUpdated}</strong>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#202124]">1. Introduction</h2>
          <p className="text-[#737373]">
            At <strong className="text-[#202124]">Coding Hub</strong> (accessible from https://codeinghub.me), we believe that educational and developer utilities should respect user privacy by default. This Privacy Policy outlines the types of information we process, the third-party services we utilize, and the granular controls you have over your data.
          </p>
          <p className="text-[#737373]">
            If you have questions or require additional clarifications regarding our privacy practices, you can contact our technical team at{" "}
            <a
              href="mailto:contact@codeinghub.me"
              className="text-[#176B50] font-mono hover:underline"
            >
              contact@codeinghub.me
            </a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#202124] flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#176B50]" />
            <span>2. Local Processing of Calculator & Tool Inputs</span>
          </h2>
          <p className="text-[#737373]">
            Unlike typical online tools that transmit user inputs to remote servers, Coding Hub executes all computations—including the{" "}
            <strong className="text-[#202124]">
              CGPA Calculator, Percentage Calculator, Attendance Calculator, JSON Formatter, Word Counter, and Text Case Converter
            </strong>
            —entirely within your client browser using sandboxed JavaScript.
          </p>
          <div className="p-4 rounded-lg bg-[#EBF5F1] border border-[#C8E3D8] text-[#176B50] text-xs sm:text-sm space-y-1.5">
            <div className="flex items-center gap-2 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Core Privacy Guarantee:</span>
            </div>
            <p>
              Your academic grades, semester GPAs, raw JSON payloads, draft documents, and converted text strings are never transmitted to our backend servers, never logged into external databases, and never sold or shared with any third party.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#202124]">3. Log Files</h2>
          <p className="text-[#737373]">
            Like standard web infrastructure, our hosting environment (Vercel) automatically records routine web server log entries when pages are served. These logs include standard diagnostic fields: Internet Protocol (IP) addresses, browser user-agent strings, referring URLs, timestamps, and HTTP response codes. These server logs are utilized strictly for platform reliability, DDoS mitigation, and uptime monitoring. They are not joined with personal identifying records.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#202124]">4. Google Analytics 4 & Consent Management</h2>
          <p className="text-[#737373]">
            When you grant analytics consent via our Cookie Banner, we utilize Google Analytics 4 to understand aggregate website performance (e.g. which tutorial topics are most read and which tools are frequently launched).
          </p>
          <div className="space-y-2 text-xs sm:text-sm text-[#737373]">
            <p>Our Google Analytics 4 configuration enforces privacy best practices:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li><strong>IP Anonymization:</strong> IP addresses are truncated to safeguard visitor identity.</li>
              <li><strong>Consent-Gated Execution:</strong> GA4 scripts only initialize after you click &quot;Accept Analytics&quot; on our consent prompt.</li>
              <li><strong>Zero Payload Tracking:</strong> We never log form values, calculation inputs, typed text, or API payloads. Only generalized interaction events (e.g. &quot;tool opened&quot;, &quot;calculation completed&quot;) are measured.</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-white border border-[#E7E7E3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3">
            <div>
              <span className="text-xs font-semibold text-[#202124] block">Manage Your Cookie Consent</span>
              <span className="text-xs text-[#737373]">You can change or revoke your analytics consent at any time.</span>
            </div>
            <CookiePreferencesButton className="px-3.5 py-1.5 rounded text-xs font-mono font-medium text-white bg-[#176B50] hover:bg-[#12543E] transition-colors inline-flex items-center gap-1.5" />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#202124]">5. Google AdSense & Third-Party Advertising</h2>
          <p className="text-[#737373]">
            To keep all tools and tutorials free for students and developers, Coding Hub supports future monetization via Google AdSense.
          </p>
          <p className="text-[#737373]">
            Google is a third-party vendor that uses cookies (including the DoubleClick DART cookie) to serve advertisements based upon a user&apos;s prior visits to this website and other sites across the internet.
          </p>
          <p className="text-[#737373]">
            You may opt out of personalized advertising by visiting Google&apos;s Ads Settings:{" "}
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#176B50] underline hover:text-[#12543E]"
            >
              https://adssettings.google.com/
            </a>.
            Alternatively, you can opt out of third-party vendors&apos; use of cookies for personalized advertising by visiting{" "}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#176B50] underline hover:text-[#12543E]"
            >
              www.aboutads.info
            </a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#202124]">6. User Choices & Browser Controls</h2>
          <p className="text-[#737373]">
            You have full control over cookie storage. In addition to our built-in consent banner, modern web browsers allow you to block third-party cookies, clear existing cookies, or browse in private/incognito mode:
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[#737373] pl-2">
            <li>Google Chrome: Settings &gt; Privacy and security &gt; Third-party cookies</li>
            <li>Mozilla Firefox: Settings &gt; Privacy &amp; Security &gt; Enhanced Tracking Protection</li>
            <li>Apple Safari: Settings &gt; Privacy &gt; Block all cookies / Prevent cross-site tracking</li>
            <li>Microsoft Edge: Settings &gt; Cookies and site permissions</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#202124]">7. GDPR & CCPA Privacy Rights</h2>
          <p className="text-[#737373]">
            Depending on your jurisdiction (such as under the European General Data Protection Regulation or California Consumer Privacy Act), you hold specific rights regarding personal data:
          </p>
          <ul className="list-disc list-inside space-y-1 text-[#737373] text-xs sm:text-sm pl-2">
            <li><strong>Right to Access:</strong> Request copies of personal data retained about you.</li>
            <li><strong>Right to Rectification:</strong> Request correction of inaccurate information.</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your personal data.</li>
            <li><strong>Right to Restrict or Object:</strong> Restrict or object to processing under certain conditions.</li>
            <li><strong>Non-Discrimination:</strong> We do not restrict access to any calculators or tools based on your privacy choices.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#202124]">8. Children&apos;s Information (COPPA)</h2>
          <p className="text-[#737373]">
            Protecting younger learners is essential. Coding Hub does not knowingly collect personally identifiable information from children under the age of 13. If you believe that a child has provided personal information through our contact channels, please notify us immediately at <code>contact@codeinghub.me</code> and we will promptly remove such records.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#202124]">9. Contact & Inquiries</h2>
          <p className="text-[#737373]">
            For questions, data access requests, or privacy compliance clarifications, please contact:
          </p>
          <div className="p-4 rounded-lg bg-white border border-[#E7E7E3] space-y-1 text-xs font-mono">
            <div><strong>Coding Hub Technical Team</strong></div>
            <div>Email: <a href="mailto:contact@codeinghub.me" className="text-[#176B50] underline">contact@codeinghub.me</a></div>
            <div>Website: <a href="https://codeinghub.me" className="text-[#176B50] underline">https://codeinghub.me</a></div>
          </div>
        </section>
      </div>

      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER} label="Sponsored Ad" />
    </div>
  );
}