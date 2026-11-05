import React from "react";
import { Zap, Lock, CheckCheck, ShieldCheck, Cpu, Code2 } from "lucide-react";

export default function WhyChooseUs() {
  const pillars = [
    {
      title: "100% Client-Side Privacy",
      description:
        "All GPA calculations, attendance projections, JSON formatting, and text conversions occur locally in your browser. No grades, files, or typed inputs are ever transmitted to any remote server.",
      icon: <Lock className="w-5 h-5 text-[#176B50]" />,
    },
    {
      title: "Zero Sign-Up or Paywalls",
      description:
        "Access all 6 calculators and 12 technical guides completely free. No mandatory registrations, credit cards, or trial expirations. Open the tool and start working immediately.",
      icon: <Zap className="w-5 h-5 text-[#176B50]" />,
    },
    {
      title: "Verified Calculation Formulas",
      description:
        "Our CGPA conversions and attendance formulas are modelled after university academic regulations and international percentage conversion standards.",
      icon: <CheckCheck className="w-5 h-5 text-[#176B50]" />,
    },
    {
      title: "Clean, Distraction-Free Reading",
      description:
        "Engineered with clean typography, restrained light aesthetics, and zero invasive popups or deceptive click zones. Focused entirely on utility and readability.",
      icon: <ShieldCheck className="w-5 h-5 text-[#176B50]" />,
    },
  ];

  return (
    <section className="py-12 sm:py-16 border-b border-[#E7E7E3]" id="why-choose-us">
      <div className="mb-8">
        <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#176B50] mb-1">
          Guiding Philosophy
        </div>
        <h2 className="text-section-title font-bold text-[#202124] tracking-tight leading-[1.25]">
          Why Choose Coding Hub?
        </h2>
        <p className="text-[15px] sm:text-base text-[#737373] mt-1.5 leading-relaxed">
          Designed intentionally to be fast, honest, and completely free for everyday academic and engineering tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-6 rounded-xl border border-[#E7E7E3] bg-white space-y-3 shadow-subtle hover:border-[#176B50] transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-[#EBF5F1] border border-[#C8E3D8] flex items-center justify-center">
              {pillar.icon}
            </div>
            <h3 className="text-[18px] font-semibold text-[#202124] leading-snug">{pillar.title}</h3>
            <p className="text-[14px] text-[#737373] leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}