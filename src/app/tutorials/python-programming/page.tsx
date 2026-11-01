import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import TutorialDetailView from "@/components/tutorials/TutorialDetailView";
import { tutorialsData } from "@/data/tutorialsData";
import { constructMetadata } from "@/lib/seo";

const tutorial = tutorialsData.find((t) => t.slug === "python-programming");

export const metadata: Metadata = constructMetadata({
  title: tutorial ? tutorial.title : "Python Programming Guide",
  description: tutorial ? tutorial.summary : "Comprehensive Python programming guide.",
  canonicalUrl: "/tutorials/python-programming",
  type: "article",
});

export default function PythonTutorialPage() {
  if (!tutorial) notFound();
  return <TutorialDetailView tutorial={tutorial} />;
}
