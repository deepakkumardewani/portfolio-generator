"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import TemplateCard from "@/components/TemplateCard";
import { TemplateType } from "@/types";

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
  ];

  return (
    <main className="min-h-screen bg-stone-50 pt-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-50">
            Choose Your Template
          </h1>
          <p className="text-stone-600 dark:text-stone-300 mt-2">
            Select a template that best represents your style and professional
            identity
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <Link href="/create" className="mr-auto">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4" />
              Form
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
  );
}
