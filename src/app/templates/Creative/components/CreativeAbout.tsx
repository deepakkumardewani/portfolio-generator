"use client";
import React from "react";
import { useAppSelector } from "@/store";
import { motion } from "framer-motion";

export default function CreativeAbout() {
  const { bio } = useAppSelector((state: any) => state.portfolio);

  // Split the about text into paragraphs
  const paragraphs = bio.about
    ? bio.about.split("\n").filter((p: string) => p.trim())
    : [];

  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-black"
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      <div className="container mx-auto px-6">
        <motion.div
          id="creative-about-container"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            id="about-heading"
            className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            itemProp="headline"
          >
            About Me
          </motion.h2>
          <motion.div
            id="creative-about-content"
            className="prose prose-invert"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            itemProp="text"
          >
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph: string, index: number) => (
                <p
                  key={index}
                  className="mb-4 text-black dark:text-gray-300 leading-relaxed text-base"
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="mb-4 text-black dark:text-gray-300 leading-relaxed text-base">
                {bio.about ||
                  "Tell your story here. What drives you? What's your background? What are you passionate about?"}
              </p>
            )}
          </motion.div>
          <meta itemProp="author" content={bio.name || "Your Name"} />
        </motion.div>
      </div>
    </section>
  );
}
