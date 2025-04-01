"use client";

import { TextShimmer } from "@/components/ui/text-shimmer";
import { ShiningBorder } from "@/components/ui/shining-border";
import ModernHero from "@/app/templates/Modern/components/ModernHero";
import CreativeHero from "@/app/templates/Creative/components/CreativeHero";
import MinimalistHero from "@/app/templates/Minimalist/components/MinimalistHero";
interface Template {
  name: string;
  description: string;
  image: string;
  category: "free" | "premium";
  price?: string;
}

const templates: Template[] = [
  {
    name: "Minimalist",
    description:
      "Elegant and modern, with a focus on typography and whitespace.",
    image: "https://same-assets.com/portfolio-template-minimalist.jpg",
    category: "free",
  },
  {
    name: "Creative",
    description:
      "A vibrant and expressive design with a focus on color and typography.",
    image: "https://same-assets.com/portfolio-template-developer.jpg",
    category: "free",
  },
  {
    name: "Modern",
    description:
      "A sleek, dark-themed design with vibrant gradients and smooth animations.",
    image: "https://same-assets.com/portfolio-template-photographer.jpg",
    category: "free",
  },
];

export default function Templates() {
  return (
    <section
      id="templates"
      className="py-20 bg-gradient-to-b from-background to-background/50"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose from <TextShimmer>3 Beautiful Templates</TextShimmer>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Handcrafted beautiful templates to get you started
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <TemplateCard key={index} template={template} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TemplateCard({ template }: { template: Template }) {
  const renderHeroComponent = () => {
    switch (template.name) {
      case "Minimalist":
        return <MinimalistHero />;
      case "Creative":
        return <CreativeHero />;
      case "Modern":
        return <ModernHero />;
      default:
        return null;
    }
  };
  return (
    <ShiningBorder>
      <div className="bg-card/50 backdrop-blur-sm rounded-lg overflow-hidden ">
        <div className="relative aspect-video w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
          <div className="relative h-full w-full">
            <div className="transform scale-[0.25] origin-top-left h-[400%] w-[400%]">
              {renderHeroComponent()}
            </div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-muted-foreground mb-4">{template.description}</p>
        </div>
      </div>
    </ShiningBorder>
  );
}
