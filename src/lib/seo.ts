import { Metadata } from "next";

export const siteConfig = {
  name: "Coding Hub",
  shortName: "CodingHub",
  description:
    "Free online developer tools, student calculators, and comprehensive tech tutorials. Fast, privacy-friendly, and 100% free.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://codinghub.dev",
  ogImage: "https://codinghub.dev/og-image.png",
  author: "Coding Hub Team",
  links: {
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  keywords: [
    "developer tools",
    "student calculators",
    "cgpa calculator",
    "percentage calculator",
    "attendance calculator",
    "json formatter",
    "word counter",
    "case converter",
    "python tutorials",
    "sql tutorials",
    "power bi guide",
    "data analytics",
    "web development",
    "javascript guide",
  ],
};

export function constructMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  canonicalUrl,
  noIndex = false,
  type = "website",
}: {
  title: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  type?: "website" | "article";
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const url = canonicalUrl ? `${siteConfig.url}${canonicalUrl}` : siteConfig.url;

  return {
    title: fullTitle,
    description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      type,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@codinghub",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
