import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import TutorialDetailView from "@/components/tutorials/TutorialDetailView";
import { tutorialsData } from "@/data/tutorialsData";
import { constructMetadata } from "@/lib/seo";

const tutorial = tutorialsData.find((t) => t.slug === "sql");

export const metadata: Metadata = constructMetadata({
  title: tutorial ? tutorial.title : "SQL & Relational Databases Guide",
  description: tutorial ? tutorial.summary : "Comprehensive SQL and relational database query guide.",
  canonicalUrl: "/tutorials/sql",
  type: "article",
});

export default function SqlTutorialPage() {
  if (!tutorial) notFound();
  return <TutorialDetailView tutorial={tutorial} />;
}
