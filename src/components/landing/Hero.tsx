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
import { TextReveal } from "../magicui/text-reveal";

import { TextGenerateEffect } from "../ui/text-generate-effect";
import { motion } from "framer-motion";
// import Skeleton from "./Skeleton";
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className={cn(
                  "group rounded-full border w-fit border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                )}
              >
                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <span>✨ Introducing PortfolioGen</span>
                  <Icons.arrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedShinyText>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col items-center justify-center"
            >
              <TypewriterEffectSmooth words={words} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-col items-center justify-center"
            >
              <TextGenerateEffect duration={1} words={words2} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="text-xl md:text-2xl text-stone-600 dark:text-stone-300 mt-6 text-center max-w-2xl mx-auto leading-relaxed"
            >
              Stand out from the crowd with beautifully designed, customizable
              portfolio templates that showcase your work and skills.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex flex-row gap-4 mt-10 justify-center"
            >
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
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-16 text-muted-foreground/80"
          >
            {features.map((feature, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 1.6 + index * 0.1 }}
                className="flex items-center font-bold text-sm"
              >
                <Icons.checkIcon className="h-4 w-4 mr-2" />
                {feature}
              </motion.p>
            ))}
          </motion.div>
        </div>

        {/* <div className="flex flex-col items-center justify-center">
          <Skeleton />
        </div> */}
      </HeroHighlight>

      <div className="bg-gradient-to-br from-purple-900/10 via-indigo-900/10 to-blue-900/10 p-6 rounded-lg">
        <TextReveal className=" text-stone-600 dark:text-stone-300 mt-6 text-center max-w-6xl mx-auto leading-relaxed">
          Ever wanted to have your own professional portfolio but didn't have
          enough time, or too lazy, to create one all by yourself. Well, now you
          can.
        </TextReveal>
      </div>
    </section>
  );
}
