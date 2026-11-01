import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import PageHeader from "@/components/common/PageHeader";
import AdSlot from "@/components/ads/AdSlot";
import { constructMetadata } from "@/lib/seo";
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy - Coding Hub",
  description:
    "Learn how Coding Hub protects your privacy. Transparent disclosures on local browser processing, cookies, and Google AdSense compliance.",
  canonicalUrl: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const lastUpdated = "November 1, 2026";

  return (
    <div className="py-6 sm:py-10 space-y-10">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <PageHeader
        badge="Legal & Privacy"
        badgeColor="indigo"
        title="Privacy Policy"
        description="Your privacy is paramount. Read our comprehensive disclosures on local data execution, cookies, and advertising practices."
      />

      <div className="max-w-4xl space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
          Last Updated: <strong>{lastUpdated}</strong>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white">1. Introduction</h2>
          <p>
            At <strong>Coding Hub</strong> (accessible from https://codinghub.dev), one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information that is recorded and how we utilize it.
          </p>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <code>contact@codinghub.dev</code>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-400" />
            <span>2. Local Processing of Calculator & Tool Inputs</span>
          </h2>
          <p>
            Unlike many online utilities, Coding Hub executes all calculations, formatters, and text conversions—including the <strong>CGPA Calculator, Attendance Calculator, Percentage Calculator, JSON Formatter, Word Counter, and Text Case Converter</strong>—entirely within your web browser using client-side JavaScript.
          </p>
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-600/30 text-emerald-300 text-xs sm:text-sm space-y-1">
            <strong>Key Privacy Guarantee:</strong>
            <p>
              Your academic grades, semester GPAs, raw JSON data, and typed texts are never transmitted to our backend servers, never logged into databases, and never sold or shared with any third party.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white">3. Log Files</h2>
          <p>
            Coding Hub follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white">4. Cookies and Web Beacons</h2>
          <p>
            Like any other website, Coding Hub uses &quot;cookies&quot;. These cookies are used to store information including visitors&apos; preferences and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white">5. Google DoubleClick DART Cookie & Google AdSense</h2>
          <p>
            Google is a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to codinghub.dev and other sites on the internet.
          </p>
          <p>
            Visitors may choose to decline the use of DART cookies by visiting the Google Ad and Content Network Privacy Policy at the following URL:{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline"
            >
              https://policies.google.com/technologies/ads
            </a>.
          </p>
          <p>
            Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Coding Hub, which are sent directly to users&apos; browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
          </p>
          <p className="text-xs text-slate-400">
            Note that Coding Hub has no access to or control over these cookies that are used by third-party advertisers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white">6. GDPR Data Protection Rights</h2>
          <p>
            We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-400 text-xs sm:text-sm">
            <li>The right to access – You have the right to request copies of your personal data.</li>
            <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
            <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
            <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data.</li>
            <li>The right to object to processing – You have the right to object to our processing of your personal data.</li>
            <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white">7. Children&apos;s Information (COPPA)</h2>
          <p>
            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
          </p>
          <p>
            Coding Hub does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white">8. Consent</h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </p>
        </section>
      </div>

      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER} label="Sponsored Ad" />
    </div>
  );
}
