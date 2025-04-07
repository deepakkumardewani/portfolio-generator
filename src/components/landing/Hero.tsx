"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
// import { BackgroundBeams } from "../ui/background-beams";
import { AnimatedShinyText } from "../magicui/animated-shiny-text";
import { cn } from "@/lib/utils";
import { HeroHighlight } from "../ui/hero-highlight";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { useAuth } from "@/contexts/AuthContext";
import { Icons } from "../ui/icons";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";

import { TextGenerateEffect } from "../ui/text-generate-effect";
import Skeleton from "./Skeleton";
export default function Hero() {
  // const { theme } = useTheme();
  const { user } = useAuth();

  const words = [
    {
      text: "Build",
    },
    {
      text: "your",
    },
    {
      text: "Perfect",
    },
    {
      text: "Portfolio",
    },
  ];
  const words2 = "in Minutes.";

  const features = [
    "No coding required",
    "Fully responsive design",
    "SEO optimized",
  ];
  return (
    <section>
      <HeroHighlight>
        <div className="flex flex-col relative items-center justify-center h-[40rem] w-full min-h-[70vh] px-6 py-16 max-w-7xl mx-auto">
          <div className="animate-fade-in-up">
            <div className="flex justify-center mb-6">
              <div
                className={cn(
                  "group rounded-full border w-fit border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                )}
              >
                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <span>✨ Introducing PortfolioGen</span>
                  <Icons.arrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedShinyText>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <TypewriterEffectSmooth words={words} />
              {/* <div>Build Your Perfect Portfolio </div> */}
              <TextGenerateEffect duration={1} words={words2} />
            </div>
            <p className="text-xl md:text-2xl text-stone-600 dark:text-stone-300 mt-6 text-center max-w-2xl mx-auto leading-relaxed">
              Stand out from the crowd with beautifully designed, customizable
              portfolio templates that showcase your work and skills.
            </p>
            <div className="flex flex-row gap-4 mt-10 justify-center">
              <Link href={user ? "/create" : "/signup"}>
                <InteractiveHoverButton>
                  <span>Create Your Portfolio</span>
                </InteractiveHoverButton>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-16 text-muted-foreground/80">
            {features.map((feature, index) => (
              <p key={index} className="flex items-center font-bold text-sm">
                <Icons.checkIcon className="h-4 w-4 mr-2" />
                {feature}
              </p>
            ))}
          </div>
        </div>

        {/* <div className="flex flex-col items-center justify-center">
          <Skeleton />
        </div> */}
      </HeroHighlight>
    </section>
  );
}
