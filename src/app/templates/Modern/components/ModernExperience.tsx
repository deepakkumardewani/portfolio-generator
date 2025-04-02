"use client";

import React from "react";
import { useAppSelector } from "@/store";
import { motion } from "framer-motion";
import { Icons } from "@/components/ui/icons";

export default function ModernExperience() {
  const { workExperience } = useAppSelector((state) => state.portfolio);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Present";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <section id="experience" className="py-24 px-4 relative">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-950 opacity-50"></div>

      <div className="container mx-auto max-w-4xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Experience
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded"></div>
        </motion.div>

        <div className="space-y-12">
          {workExperience.length > 0 ? (
            workExperience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <h3 className="text-xl font-bold text-zinc-100">
                    {job.jobTitle}
                  </h3>
                  <div className="hidden md:block h-1 w-1 rounded-full bg-zinc-700"></div>
                  <h4 className="text-lg text-zinc-300">{job.company}</h4>
                </div>

                <div className="flex items-center gap-2 text-zinc-400 mb-4">
                  <Icons.calendarIcon className="h-4 w-4" />
                  <span>
                    {formatDate(job.fromDate)} - {formatDate(job.toDate)}
                  </span>
                </div>

                <p className="text-zinc-300 mb-6">{job.description}</p>

                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-zinc-800 text-zinc-300 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center p-8 border border-dashed border-zinc-800 rounded-lg">
              <Icons.briefcaseIcon className="h-12 w-12 mx-auto mb-4 text-zinc-700" />
              <p className="text-zinc-400">No work experience added yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
