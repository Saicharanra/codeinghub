import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import TutorialDetailView from "@/components/tutorials/TutorialDetailView";
import { tutorialsData } from "@/data/tutorialsData";
import { constructMetadata } from "@/lib/seo";

const tutorial = tutorialsData.find((t) => t.slug === "data-analytics");

export const metadata: Metadata = constructMetadata({
  title: tutorial ? tutorial.title : "Data Analytics Foundations Guide",
  description: tutorial ? tutorial.summary : "Comprehensive guide to exploratory data analysis and statistics.",
  canonicalUrl: "/tutorials/data-analytics",
  type: "article",
});

export default function DataAnalyticsTutorialPage() {
  if (!tutorial) notFound();
  return <TutorialDetailView tutorial={tutorial} />;
}
