import { Metadata } from "next";

// Production fallback URL to ensure sitemap and canonical URLs are valid in all environments
export const PRODUCTION_URL = "https://codeinghub.me";

export function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!envUrl) return PRODUCTION_URL;

  // In production builds, avoid emitting localhost URLs
  if (process.env.NODE_ENV === "production" && envUrl.includes("localhost")) {
    return PRODUCTION_URL;
  }

  // Strip trailing slashes
  return envUrl.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "Coding Hub",
  shortName: "CodingHub",
  description:
    "Free online developer tools, student calculators, and comprehensive tech tutorials. Fast, privacy-friendly, and 100% free.",
  url: getBaseUrl(),
  ogImage: `${getBaseUrl()}/og-image.png`,
  author: "Coding Hub Technical Editorial Team",
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
    "python programming tutorials",
    "sql database tutorials",
    "power bi guide",
    "data analytics techniques",
    "web development guide",
    "java programming tutorials",
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
  const cleanTitle = title.trim();
  const fullTitle = cleanTitle.includes("Coding Hub")
    ? cleanTitle
    : `${cleanTitle} | ${siteConfig.name}`;

  const baseUrl = getBaseUrl();
  const url = canonicalUrl
    ? `${baseUrl}${canonicalUrl.startsWith("/") ? canonicalUrl : `/${canonicalUrl}`}`
    : baseUrl;

  const verificationToken = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

  return {
    title: {
      absolute: fullTitle,
    },
    description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    verification: verificationToken
      ? {
          google: verificationToken,
        }
      : undefined,
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