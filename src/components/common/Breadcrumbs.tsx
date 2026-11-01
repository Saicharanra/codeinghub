import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://codinghub.dev",
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        ...(item.href ? { item: `https://codinghub.dev${item.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#737373] mb-4">
        <Link href="/" className="hover:text-[#202124] transition-colors">
          Home
        </Link>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-[#A3A3A3] flex-shrink-0" />
              {isLast || !item.href ? (
                <span className="text-[#202124] font-medium truncate max-w-xs" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-[#202124] transition-colors truncate">
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}
