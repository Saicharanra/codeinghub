import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import TutorialDetailView from "@/components/tutorials/TutorialDetailView";
import { tutorialsData } from "@/data/tutorialsData";
import { constructMetadata } from "@/lib/seo";

const tutorial = tutorialsData.find((t) => t.slug === "javascript");

export const metadata: Metadata = constructMetadata({
  title: tutorial ? tutorial.title : "JavaScript Runtime & Closures Guide",
  description: tutorial ? tutorial.summary : "Comprehensive JavaScript runtime, event loop, and asynchronous guide.",
  canonicalUrl: "/tutorials/javascript",
  type: "article",
});

export default function JavascriptTutorialPage() {
  if (!tutorial) notFound();
  return <TutorialDetailView tutorial={tutorial} />;
}
