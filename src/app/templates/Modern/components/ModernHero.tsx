"use client";

import React from "react";
import { useAppSelector } from "@/store";
import { Icons } from "@/components/ui/icons";
import { motion } from "framer-motion";

export default function ModernHero() {
  const { bio } = useAppSelector((state) => state.portfolio);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center relative px-4 py-20 overflow-hidden bg-gray-50 dark:bg-black"
      aria-labelledby="hero-heading"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      {/* Background gradient */}
      <div className="absolute h-screen w-full inset-0 bg-gradient-to-b dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>

      {/* Content */}
      <div className="container mx-auto max-w-4xl relative">
        <motion.div
          id="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1
            id="hero-heading"
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            itemProp="headline"
          >
            {bio.name || "Your Name"}
          </h1>

          <p
            className="text-lg md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-10"
            itemProp="alternativeHeadline"
          >
            {bio.tagline || "Your professional tagline here"}
          </p>
          <meta itemProp="author" content={bio.name || "Your Name"} />

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#projects"
              className="px-6 py-3 rounded-md bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
              aria-label="View my projects"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-md border border-zinc-700 hover:border-zinc-500 transition-colors"
              aria-label="Contact me"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          id="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
        >
          <a
            href="#about"
            aria-label="Scroll to About section"
            className="block"
          >
            <Icons.arrowDownIcon className="w-6 h-6 text-zinc-500" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
