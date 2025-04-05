"use client";

import TemplateCard from "@/components/TemplateCard";
import LoadingScreen from "@/components/LoadingScreen";
import { TemplateType } from "@/types";
import { Suspense } from "react";
import TemplateHeader from "./components/TemplateHeader";

interface TemplateInfo {
  name: TemplateType;
  description: string;
  supportsDarkMode: boolean;
}

export default function TemplatesPage() {
  const templates: TemplateInfo[] = [
    {
      name: "Minimalist",
      description:
        "Elegant and modern, with a focus on typography and whitespace.",
      supportsDarkMode: true,
    },
    {
      name: "Creative",
      description:
        "A vibrant and expressive design with a focus on color and typography.",
      supportsDarkMode: true,
    },
    {
      name: "Modern",
      description:
        "A sleek, dark-themed design with vibrant gradients and smooth animations.",
      supportsDarkMode: true,
    },
  ];

  return (
    <Suspense fallback={<LoadingScreen />}>
      <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-12">
        <div className="container mx-auto px-4">
          <TemplateHeader />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto my-8 sm:mt-32">
            {templates.map((template) => (
              <TemplateCard
                key={template.name}
                name={template.name}
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
