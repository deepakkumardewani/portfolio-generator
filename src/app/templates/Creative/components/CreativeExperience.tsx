"use client";
import React from "react";
import { useAppSelector } from "@/store";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";

export default function CreativeExperience() {
  const { workExperience } = useAppSelector((state) => state.portfolio);

  return (
    <section
      id="experience"
      className="py-20 bg-white dark:bg-black"
      aria-labelledby="experience-heading"
      itemScope
      itemType="https://schema.org/WorkExperience"
    >
      <div className="container mx-auto px-6">
        <motion.h2
          id="experience-heading"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
          itemProp="name"
        >
          Experience
        </motion.h2>
        <motion.div
          id="creative-experience-container"
          className="space-y-8"
          itemProp="workExperienceItems"
        >
          {workExperience.map((exp, index) => (
            <motion.article
              id={`creative-experience-card-${index}`}
              key={index}
              initial={{ opacity: 0, x: -48 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-black/30 p-6 rounded-lg backdrop-blur-lg"
              itemScope
              itemType="https://schema.org/OrganizationRole"
            >
              <h3
                className="text-xl font-semibold text-black dark:text-white mb-2"
                itemProp="roleName"
              >
                {exp.jobTitle}
              </h3>
              <p className="text-purple-400 mb-2" itemProp="memberOf">
                {exp.company}
              </p>
              <p
                className="text-black dark:text-white text-sm mb-4"
                itemProp="dateRange"
              >
                <time dateTime={exp.fromDate}>{formatDate(exp.fromDate)}</time>{" "}
                - <time dateTime={exp.toDate}>{formatDate(exp.toDate)}</time>
              </p>
              <p className="text-black dark:text-white" itemProp="description">
                {exp.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {exp.skills &&
                  exp.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-3 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full"
                      itemProp="skills"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
