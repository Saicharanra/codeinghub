import React from "react";
import { Zap, Lock, ShieldCheck, CheckCheck } from "lucide-react";

export default function WhyChooseUs() {
  const pillars = [
    {
      title: "Client-Side Execution",
      description:
        "All calculations and formatting occur locally in your browser. Your grades, JSON objects, and text inputs never leave your computer.",
      icon: <Lock className="w-4 h-4 text-[#176B50]" />,
    },
    {
      title: "Immediate Feedback",
      description:
        "Zero server roundtrips. Tools calculate instantly on every keystroke without page reloads or loading spinners.",
      icon: <Zap className="w-4 h-4 text-[#176B50]" />,
    },
    {
      title: "Clear, Verified Formulas",
      description:
        "Our CGPA credit-weighting formulas and attendance calculations mirror official criteria from university and college handbooks.",
      icon: <CheckCheck className="w-4 h-4 text-[#176B50]" />,
    },
    {
      title: "Usability-Focused Design",
      description:
        "No intrusive full-screen popups, fake download buttons, or deceptive layouts. Tools are placed front and center.",
      icon: <ShieldCheck className="w-4 h-4 text-[#176B50]" />,
    },
  ];

  return (
    <section className="py-14 sm:py-16 border-b border-[#E7E7E3]">
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#202124] tracking-tight">
          Why Coding Hub
        </h2>
        <p className="text-xs sm:text-sm text-[#737373] mt-1">
          Designed intentionally to be fast, private, and distraction-free.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="p-5 rounded-lg border border-[#E7E7E3] bg-[#FFFFFF] space-y-2.5 shadow-subtle"
          >
            <div className="w-8 h-8 rounded bg-[#EBF5F1] flex items-center justify-center">
              {pillar.icon}
            </div>
            <h3 className="text-sm font-semibold text-[#202124]">{pillar.title}</h3>
            <p className="text-xs text-[#737373] leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
