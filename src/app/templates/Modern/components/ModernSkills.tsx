"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store";
import { motion } from "framer-motion";
import { Icons } from "@/components/ui/icons";
import { Skill } from "@/types";

// Move the grouping logic to a separate function
function groupSkillsByCategory(skills: Skill[]): Record<string, Skill[]> {
  return skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const category = skill.category || "other";
    if (!acc[category]) {
      acc[category] = [];
    }
    if (!acc[category].some((s) => s.value === skill.value)) {
      acc[category].push(skill);
    }
    return acc;
  }, {});
}

export default function ModernSkills() {
  const { skills } = useAppSelector((state) => state.portfolio);
  // Group skills directly without useState/useEffect
  const groupedSkills = groupSkillsByCategory(skills);

  const { viewMode } = useAppSelector((state) => state.portfolio);
  const [isPreview, setIsPreview] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isInPreview = document.getElementById("preview-pane") !== null;
    setIsPreview(isInPreview);

    // Check if we're in mobile view
    const checkMobile = () => {
      setIsMobile(viewMode === "mobile" || window.innerWidth < 768);
    };

    // Initial check
    checkMobile();
  }, []);

  const layoutClasses = isPreview
    ? isMobile
      ? "grid-cols-1"
      : "grid-cols-2"
    : "grid-cols-1 sm:grid-cols-2";

  // Category-specific styling
  const categoryStyles = {
    frontend: {
      icon: <Icons.codeIcon className="h-6 w-6 text-blue-400" />,
      bgColor: "bg-blue-900/20",
      borderColor: "border-blue-800/30",
      textColor: "text-blue-300",
    },
    backend: {
      icon: <Icons.brainIcon className="h-6 w-6 text-purple-400" />,
      bgColor: "bg-purple-900/20",
      borderColor: "border-purple-800/30",
      textColor: "text-purple-300",
    },
    tool: {
      icon: <Icons.wrenchIcon className="h-6 w-6 text-green-400" />,
      bgColor: "bg-green-900/20",
      borderColor: "border-green-800/30",
      textColor: "text-green-300",
    },
    other: {
      icon: <Icons.codeIcon className="h-6 w-6 text-green-400" />,
      bgColor: "bg-green-900/20",
      borderColor: "border-green-800/30",
      textColor: "text-green-300",
    },
  };

  return (
    <section id="skills" className="py-24 px-4 relative">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-950 opacity-50"></div>

      <div className="container mx-auto max-w-4xl relative">
        <motion.div
          id="skills-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Skills
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-blue-500 rounded"></div>
        </motion.div>

        <div className={`grid ${layoutClasses} gap-10`}>
          {Object.entries(groupedSkills).map(([category, skills], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="skill-item bg-zinc-900/50 border border-zinc-800 rounded-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                {categoryStyles[category as keyof typeof categoryStyles]
                  ?.icon || categoryStyles.other.icon}
                <h3 className="text-xl font-bold text-zinc-100">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.value}
                    className={`flex items-center gap-2 px-3 py-1 ${
                      categoryStyles[category as keyof typeof categoryStyles]
                        ?.bgColor || categoryStyles.other.bgColor
                    } ${
                      categoryStyles[category as keyof typeof categoryStyles]
                        ?.borderColor || categoryStyles.other.borderColor
                    } ${
                      categoryStyles[category as keyof typeof categoryStyles]
                        ?.textColor || categoryStyles.other.textColor
                    } text-sm rounded-full border`}
                  >
                    {skill.image && (
                      <img
                        src={skill.image}
                        alt={skill.value}
                        className="w-4 h-4 object-contain"
                      />
                    )}
                    {skill.value}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          {Object.keys(groupedSkills).length === 0 && (
            <div className="col-span-2 text-center p-8 border border-dashed border-zinc-800 rounded-lg">
              <Icons.codeIcon className="h-12 w-12 mx-auto mb-4 text-zinc-700" />
              <p className="text-zinc-400">No skills added yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
