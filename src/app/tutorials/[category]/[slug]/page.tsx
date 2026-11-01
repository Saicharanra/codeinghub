import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import TutorialArticleView from "@/components/tutorials/TutorialArticleView";
import { tutorialsData, getTutorialBySlug } from "@/data/tutorialsData";
import { constructMetadata } from "@/lib/seo";

interface PageProps {
  params: {
    category: string;
    slug: string;
  };
}

export function generateStaticParams() {
  return tutorialsData.map((tut) => ({
    category: tut.categorySlug,
    slug: tut.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const tutorial = getTutorialBySlug(params.category, params.slug);

  if (!tutorial) {
    return constructMetadata({
      title: "Tutorial Not Found - Coding Hub",
      description: "The requested educational tutorial could not be found.",
    });
  }

  return constructMetadata({
    title: `${tutorial.title} - Coding Hub Guide`,
    description: tutorial.summary,
    canonicalUrl: `/tutorials/${tutorial.categorySlug}/${tutorial.slug}`,
    type: "article",
  });
}

export default function TutorialSlugPage({ params }: PageProps) {
  const tutorial = getTutorialBySlug(params.category, params.slug);

  if (!tutorial) {
    notFound();
  }

  return <TutorialArticleView tutorial={tutorial} />;
}