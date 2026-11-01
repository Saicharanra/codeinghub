import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import TutorialDetailView from "@/components/tutorials/TutorialDetailView";
import { tutorialsData } from "@/data/tutorialsData";
import { constructMetadata } from "@/lib/seo";

const tutorial = tutorialsData.find((t) => t.slug === "power-bi");

export const metadata: Metadata = constructMetadata({
  title: tutorial ? tutorial.title : "Power BI & DAX Guide",
  description: tutorial ? tutorial.summary : "Comprehensive Power BI business intelligence and DAX modeling guide.",
  canonicalUrl: "/tutorials/power-bi",
  type: "article",
});

export default function PowerBiTutorialPage() {
  if (!tutorial) notFound();
  return <TutorialDetailView tutorial={tutorial} />;
}
