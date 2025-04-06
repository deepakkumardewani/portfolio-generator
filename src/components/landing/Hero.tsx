"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { BackgroundBeams } from "../ui/background-beams";
import { AnimatedShinyText } from "../magicui/animated-shiny-text";
import { cn } from "@/lib/utils";
import { TextShimmer } from "../ui/text-shimmer";
import { useTheme } from "next-themes";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { useAuth } from "@/contexts/AuthContext";
import { Icons } from "../ui/icons";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "../ui/text-generate-effect";
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

  return (
    <section className="bg-neutral-50 dark:bg-neutral-950">
      <div className="h-[40rem] w-full rounded-md relative flex flex-col items-center justify-center antialiased">
        <div className="flex flex-col relative z-10 items-center justify-center h-[40rem] w-full min-h-[70vh] px-6 py-16 max-w-7xl mx-auto">
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
              <Link href={user ? "/create" : "/auth/signup"}>
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
        </div>
        <BackgroundBeams />
      </div>

      <div className="relative w-full max-w-6xl mx-auto mt-8">
        <div className="aspect-video rounded-lg overflow-hidden border border-border/50 shadow-2xl ">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg" />
          <div className="flex items-center justify-center h-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-8 w-full max-w-5xl">
              <div className="col-span-1">
                <div className="space-y-4">
                  <div className="h-8 w-24 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
                  <div className="h-24 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
                  <div className="h-8 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
                  <div className="h-8 bg-black/5 dark:bg-white/5" />
                </div>
              </div>
              <div className="col-span-2">
                <div className="h-full bg-black/5 dark:bg-white/5 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg h-48 w-48 blur-[100px] opacity-30" />
        <div className="absolute -top-4 -left-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg h-48 w-48 blur-[100px] opacity-30" />
      </div>

      <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-16 text-muted-foreground/80">
        <p className="flex items-center text-sm">
          <svg
            className="h-4 w-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 13L9 17L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          No coding required
        </p>
        <p className="flex items-center text-sm">
          <svg
            className="h-4 w-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 13L9 17L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Fully responsive design
        </p>
        {/* <p className="flex items-center text-sm">
            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            100+ templates
          </p> */}
        <p className="flex items-center text-sm">
          <svg
            className="h-4 w-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 13L9 17L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          SEO optimized
        </p>
      </div>
    </section>
  );
}
