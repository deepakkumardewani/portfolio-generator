"use client";

import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
    },
  },
};

export default function Templates() {
  return (
    <section
      id="templates"
      className="py-20 bg-gradient-to-b from-background to-background/50"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center mb-16"
        >
          <div className="text-3xl px-4 md:text-4xl font-bold mb-4">
            <div className="mb-2">Choose from</div>
            <TextShimmer>3 Handcrafted Beautiful Templates</TextShimmer>
          </div>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {templates.map((template, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <TemplateCard template={template} />
            </motion.div>
          ))}
        </motion.div>
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
    // <ShiningBorder>
    <div className="bg-card/50 backdrop-blur-sm rounded-lg overflow-hidden mx-8 border h-full border-black/5 dark:border-white/5">
      <div className="relative aspect-video w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
        <div className="relative h-full w-full">
          <div className="transform scale-[0.25] origin-top-left h-[400%] w-[400%]">
            {renderHeroComponent()}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-2 text-2xl font-bold">{template.name}</div>

        <p className="text-muted-foreground mb-4">{template.description}</p>
      </div>
    </div>
    // </ShiningBorder>
  );
}
