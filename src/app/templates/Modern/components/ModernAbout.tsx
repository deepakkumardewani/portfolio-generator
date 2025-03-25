"use client";

import React from "react";
import { useAppSelector } from "@/store";
import { motion } from "framer-motion";

export default function ModernAbout() {
  const { bio } = useAppSelector((state) => state.portfolio);

  return (
    <section id="about" className="py-24 px-4 relative">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-zinc-900 opacity-50"></div>

      <div className="container mx-auto max-w-4xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              About Me
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="prose prose-lg prose-zinc dark:prose-invert max-w-none">
            <p className="text-lg text-zinc-300">
              {bio.about ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus."}
            </p>
          </div>
          {/* 
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors">
              <h3 className="text-xl font-medium mb-3 text-zinc-100">
                My Philosophy
              </h3>
              <p className="text-zinc-400">
                I believe in creating solutions that are user-centered,
                accessible and performant.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors">
              <h3 className="text-xl font-medium mb-3 text-zinc-100">
                My Approach
              </h3>
              <p className="text-zinc-400">
                I combine technical expertise with creative problem-solving to
                deliver exceptional results.
              </p>
            </div>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
