"use client";

// import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background";
import { TextShimmer } from "@/components/ui/text-shimmer";
// import { ShiningBorder } from "@/components/ui/shining-border";
import { GlowingEffect } from "../ui/glowing-effect";
import { Smartphone, Check, HashIcon, ChartBar } from "lucide-react";
const features = [
  {
    title: "Responsive Design",
    description:
      "All templates are fully responsive and look great on any device, from desktops to smartphones.",
    icon: <Smartphone className="h-6 w-6" />,
  },
  {
    title: "SEO Optimized",
    description:
      "Get discovered online with built-in SEO optimization that helps your portfolio rank higher in search results.",
    icon: <HashIcon className="h-6 w-6" />,
  },
  {
    title: "One-Click Deploy",
    description:
      "Publish your portfolio instantly with our one-click deployment to our free hosting.",
    icon: <Check className="h-6 w-6" />,
  },
  {
    title: "SEO Optimized",
    description:
      "Get discovered online with built-in SEO optimization that helps your portfolio rank higher in search results.",
    icon: <ChartBar className="h-6 w-6" />,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-neutral-50 dark:bg-neutral-950">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <TextShimmer>Everything You Need</TextShimmer> to Create the Perfect
            Portfolio
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our platform provides all the tools you need to create a
            professional portfolio that showcases your work effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              className="relative h-full rounded-2.5xl border p-2 md:rounded-3xl md:p-3"
              key={index}
            >
              <GlowingEffect
                blur={0}
                borderWidth={3}
                spread={80}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <div className="p-6 h-full rounded-lg">
                <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
