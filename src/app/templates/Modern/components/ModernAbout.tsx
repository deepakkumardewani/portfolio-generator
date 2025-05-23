"use client";

import React from "react";
import { useAppSelector } from "@/store";
import { motion } from "framer-motion";

export default function ModernAbout() {
  const { bio } = useAppSelector((state) => state.portfolio);

  // Split the about text into paragraphs
  const paragraphs = bio.about
    ? bio.about.split("\n").filter((p) => p.trim())
    : [];

  return (
    <section
      id="about"
      className="py-24 px-4 relative bg-gray-50 dark:bg-black"
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      <div className="container mx-auto max-w-4xl relative">
        <motion.div
          id="about-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-3 inline-block"
            itemProp="headline"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              About Me
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded"></div>
        </motion.div>

        <motion.div
          id="about-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          itemProp="text"
        >
          <div className="prose prose-lg prose-zinc dark:prose-invert max-w-none">
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg text-zinc-900 dark:text-zinc-100 mb-4"
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-lg text-zinc-500 dark:text-zinc-700">
                {bio.about ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus."}
              </p>
            )}
          </div>
        </motion.div>
        <meta itemProp="author" content={bio.name || "Your Name"} />
      </div>
    </section>
  );
}
