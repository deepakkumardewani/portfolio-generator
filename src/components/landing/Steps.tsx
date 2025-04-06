import React from "react";
import { Card, CardContent } from "../ui/card";
import { AnimatedShinyText } from "../magicui/animated-shiny-text";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "../ui/glowing-effect";
import { Icons } from "../ui/icons";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
const STEPS = [
  {
    icon: Icons.codeIcon,
    title: "Fill Your Details",
    description:
      "Quickly add your details information through our intuitive form.",
  },
  {
    icon: Icons.paletteIcon,
    title: "Select Your Template",
    description:
      "Choose from our collection of professionally designed templates.",
  },
  {
    icon: Icons.rocketIcon,
    title: "Deploy Your Portfolio",
    description:
      "Export or launch your professional portfolio site with just one click.",
  },
] as const;

const words = [
  {
    text: "Create",
  },
  {
    text: "your",
  },

  {
    text: "Portfolio",
  },
  {
    text: "in",
  },
  {
    text: "3",
  },
  {
    text: "Simple",
  },
  {
    text: "Steps",
  },
];
export default function Steps() {
  return (
    <section
      id="how-it-works"
      className="bg-neutral-50 dark:bg-neutral-950 py-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div
              className={cn(
                "group rounded-full border w-fit border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              )}
            >
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span>Simple Process</span>
                <Icons.arrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <TypewriterEffectSmooth words={words} />
          </div>
          {/* <h2 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            Create Your Portfolio in 3 Simple Steps
          </h2> */}
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Our streamlined process makes it easy to build and deploy your
            professional portfolio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {STEPS.map((step, index) => (
            <div key={step.title} className={cn("relative h-full rounded-xl")}>
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <Card className="p-8 text-center bg-white dark:bg-neutral-950 border-stone-100 dark:border-stone-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden group">
                <CardContent className="pt-6 p-0">
                  <div className="w-16 h-16 rounded-2xl bg-stone-100 dark:bg-neutral-700 text-stone-700 dark:text-stone-300 flex items-center justify-center text-xl font-semibold mx-auto mb-6 group-hover:bg-stone-800 group-hover:text-white dark:group-hover:bg-stone-600 transition-all duration-300">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-semibold mt-5 text-stone-900 dark:text-stone-100">
                    {step.title}
                  </h3>
                  <p className="text-base text-stone-600 dark:text-stone-400 mt-3 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
