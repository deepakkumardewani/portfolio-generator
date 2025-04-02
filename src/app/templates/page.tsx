"use client";

import TemplateCard from "@/components/TemplateCard";
import LoadingScreen from "@/components/LoadingScreen";
import { TemplateType } from "@/types";
import { Suspense } from "react";
import TemplateHeader from "./components/TemplateHeader";

interface TemplateInfo {
  name: TemplateType;
  imageSrc: string;
  description: string;
  supportsDarkMode: boolean;
}

export default function TemplatesPage() {
  const templates: TemplateInfo[] = [
    {
      name: "Minimalist",
      imageSrc: "/templates/minimalist.svg",
      description:
        "Elegant and modern, with a focus on typography and whitespace. Ideal for developers and writers.",
      supportsDarkMode: true,
    },
    {
      name: "Creative",
      imageSrc: "/templates/creative.svg",
      description:
        "Vibrant and expressive design for artists, designers, and creative professionals to showcase their work.",
      supportsDarkMode: true,
    },
    {
      name: "Modern",
      imageSrc: "/templates/modern.svg",
      description:
        "A sleek, dark-themed design with vibrant gradients and smooth animations. Perfect for tech professionals and developers.",
      supportsDarkMode: true,
    },
  ];

  return (
    <Suspense fallback={<LoadingScreen />}>
      <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-12">
        <div className="container mx-auto px-4">
          <TemplateHeader />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
            {templates.map((template) => (
              <TemplateCard
                key={template.name}
                name={template.name}
                imageSrc={template.imageSrc}
                description={template.description}
                supportsDarkMode={template.supportsDarkMode}
              />
            ))}
          </div>
        </div>
      </main>
    </Suspense>
  );
}
