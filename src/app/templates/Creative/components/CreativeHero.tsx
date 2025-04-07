"use client";
import React from "react";
import { Icons } from "@/components/ui/icons";
import { useAppSelector } from "@/store";
import { motion } from "framer-motion";

export default function CreativeHero() {
  const { bio } = useAppSelector((state) => state.portfolio);

  return (
    <section
      id="hero"
      className="py-12 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black"
      aria-labelledby="hero-heading"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      <div className="container mx-auto px-6">
        <motion.div
          id="creative-hero-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            id="creative-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
            itemProp="headline"
          >
            {bio.name || "Your Name"}
          </motion.h1>
          <motion.p
            id="creative-hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl dark:text-gray-400 text-black mb-8"
            itemProp="alternativeHeadline"
          >
            {bio.tagline || "Your tagline"}
          </motion.p>
          <meta itemProp="author" content={bio.name || "Your Name"} />
          <motion.div
            id="creative-hero-social"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center space-x-6"
          >
            <a
              href="#"
              className="dark:text-gray-400 text-black hover:text-white transition-colors"
              aria-label="GitHub Profile"
              rel="noopener"
            >
              <Icons.gitHub size={24} />
            </a>
            <a
              href="#"
              className="dark:text-gray-400 text-black hover:text-white transition-colors"
              aria-label="LinkedIn Profile"
              rel="noopener"
            >
              <Icons.linkedin size={24} />
            </a>
            <a
              href="#"
              className="dark:text-gray-400 text-black hover:text-white transition-colors"
              aria-label="Email Contact"
              rel="noopener"
            >
              <Icons.mail size={24} />
            </a>
          </motion.div>
          <motion.div
            id="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            className="mt-12"
          >
            <a
              href="#about"
              aria-label="Scroll to About section"
              className="inline-block"
            >
              <Icons.chevronDown className="w-8 h-8 text-black dark:text-gray-400 animate-bounce" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
