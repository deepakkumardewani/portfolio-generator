"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store";
import { Skill } from "@/types";
import { motion } from "framer-motion";

export default function CreativeSkills() {
  const { skills } = useAppSelector((state) => state.portfolio);
  const [groupedSkills, setGroupedSkills] = useState<Record<string, Skill[]>>(
    {}
  );
  const [isPreview, setIsPreview] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { viewMode } = useAppSelector((state) => state.portfolio);

  useEffect(() => {
    const isInPreview = document.getElementById("preview-pane") !== null;
    setIsPreview(isInPreview);
    const checkMobile = () => {
      setIsMobile(viewMode === "mobile" || window.innerWidth < 768);
    };
    checkMobile();

    // Group skills by category and remove duplicates
    const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
      const category = skill.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      if (!acc[category].some((s) => s.value === skill.value)) {
        acc[category].push(skill);
      }
      return acc;
    }, {});

    setGroupedSkills(grouped);
  }, [skills, viewMode]);

  const skillsLayoutClasses = isPreview
    ? isMobile
      ? "grid grid-cols-1 gap-8"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8";

  return (
    <section id="skills" className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-6">
        <motion.h2
          id="creative-skills-heading"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          Skills
        </motion.h2>
        <motion.div
          id="creative-skills-container"
          className={skillsLayoutClasses}
        >
          {Object.entries(groupedSkills).map(([category, items], index) => (
            <motion.div
              id={`creative-skill-card-${index}`}
              key={category}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-black/20 p-6 rounded-lg backdrop-blur-lg"
            >
              <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <ul className="space-y-2">
                {items?.map((skill) => (
                  <li
                    key={skill.value}
                    className="text-black/50 dark:text-white flex items-center space-x-2"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={skill.image}
                        alt={skill.value}
                        className="w-5 h-5 object-contain"
                      />
                      <span>{skill.value}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
