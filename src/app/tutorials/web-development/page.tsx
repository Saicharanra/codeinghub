import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import TutorialDetailView from "@/components/tutorials/TutorialDetailView";
import { tutorialsData } from "@/data/tutorialsData";
import { constructMetadata } from "@/lib/seo";

const tutorial = tutorialsData.find((t) => t.slug === "web-development");

export const metadata: Metadata = constructMetadata({
  title: tutorial ? tutorial.title : "Modern Web Development Guide",
  description: tutorial ? tutorial.summary : "Comprehensive web development guide covering semantic HTML, CSS, React, and Next.js.",
  canonicalUrl: "/tutorials/web-development",
  type: "article",
});

export default function WebDevTutorialPage() {
  if (!tutorial) notFound();
  return <TutorialDetailView tutorial={tutorial} />;
}
