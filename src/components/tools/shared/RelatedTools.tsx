"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { toolsData } from "@/data/toolsData";
import { trackRelatedToolClicked } from "@/lib/analytics";

interface RelatedToolsProps {
  currentToolId: string;
  category?: string;
  limit?: number;
}

export default function RelatedTools({
  currentToolId,
  category,
  limit = 2,
}: RelatedToolsProps) {
  const filtered = toolsData
    .filter((tool) => tool.id !== currentToolId)
    .filter((tool) => (!category ? true : tool.category === category || tool.category.includes(category)))
    .slice(0, limit);

  if (filtered.length === 0) return null;

  return (
    <div className="pt-6 border-t border-[#E7E7E3] space-y-3">
      <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#737373]">
        Related Tools & Calculators
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {filtered.map((tool) => (
          <Link
            key={tool.id}
            href={tool.path}
            onClick={() => trackRelatedToolClicked("related_tools_section", tool.id)}
            className="group p-4 rounded-lg bg-white border border-[#E7E7E3] hover:border-[#176B50] transition-colors flex items-center justify-between"
          >
            <div>
              <span className="text-xs font-semibold text-[#202124] group-hover:text-[#176B50] block mb-1">
                {tool.name}
              </span>
              <p className="text-xs text-[#737373] line-clamp-1 leading-relaxed">
                {tool.shortDescription}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#737373] group-hover:text-[#176B50] group-hover:translate-x-0.5 transition-transform flex-shrink-0 ml-3" />
          </Link>
        ))}
      </div>
    </div>
  );
}