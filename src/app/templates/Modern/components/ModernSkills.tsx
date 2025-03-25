"use client";

import React from "react";
import { useAppSelector } from "@/store";
import { motion } from "framer-motion";
import { CodeIcon, PencilRulerIcon, BrainIcon } from "lucide-react";

export default function ModernSkills() {
  const portfolioState = useAppSelector((state) => state.portfolio);
  const skillsArray = portfolioState.skills.map((skill) => skill.value);

  // Group skills into categories
  const categorizedSkills = {
    frontend: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Vue",
      "Angular",
      "Tailwind",
      "Bootstrap",
    ],
    backend: [
      "Node.js",
      "Express",
      "Python",
      "Django",
      "Flask",
      "Ruby",
      "Rails",
      "PHP",
      "Laravel",
      "Java",
      "Spring",
      "C#",
      ".NET",
      "GraphQL",
      "REST",
    ],
    design: [
      "Figma",
      "Sketch",
      "Adobe XD",
      "Photoshop",
      "Illustrator",
      "UI/UX",
      "Wireframing",
      "Prototyping",
    ],
    other: [
      "Git",
      "GitHub",
      "GitLab",
      "Docker",
      "Kubernetes",
      "AWS",
      "Azure",
      "GCP",
      "Firebase",
      "MongoDB",
      "MySQL",
      "PostgreSQL",
      "SQL",
      "NoSQL",
      "Redux",
      "MobX",
      "Zustand",
      "Jest",
      "Testing",
      "CI/CD",
      "Agile",
      "Scrum",
    ],
  };

  // Filter user skills by categories
  const frontendSkills = skillsArray.filter((skill) =>
    categorizedSkills.frontend.includes(skill)
  );

  const backendSkills = skillsArray.filter((skill) =>
    categorizedSkills.backend.includes(skill)
  );

  const designSkills = skillsArray.filter((skill) =>
    categorizedSkills.design.includes(skill)
  );

  // Any skill not in the above categories
  const otherSkills = skillsArray.filter(
    (skill) =>
      !categorizedSkills.frontend.includes(skill) &&
      !categorizedSkills.backend.includes(skill) &&
      !categorizedSkills.design.includes(skill)
  );

  return (
    <section id="skills" className="py-24 px-4 relative">
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Skills
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-blue-500 rounded"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Frontend Skills */}
          {frontendSkills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <CodeIcon className="h-6 w-6 text-blue-400" />
                <h3 className="text-xl font-bold text-zinc-100">Frontend</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {frontendSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-900/20 border border-blue-800/30 text-blue-300 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Backend Skills */}
          {backendSkills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <BrainIcon className="h-6 w-6 text-purple-400" />
                <h3 className="text-xl font-bold text-zinc-100">Backend</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {backendSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-900/20 border border-purple-800/30 text-purple-300 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Design Skills */}
          {designSkills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <PencilRulerIcon className="h-6 w-6 text-pink-400" />
                <h3 className="text-xl font-bold text-zinc-100">Design</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {designSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-pink-900/20 border border-pink-800/30 text-pink-300 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Other Skills */}
          {otherSkills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <CodeIcon className="h-6 w-6 text-green-400" />
                <h3 className="text-xl font-bold text-zinc-100">Other</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {otherSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-900/20 border border-green-800/30 text-green-300 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {skillsArray.length === 0 && (
            <div className="col-span-2 text-center p-8 border border-dashed border-zinc-800 rounded-lg">
              <CodeIcon className="h-12 w-12 mx-auto mb-4 text-zinc-700" />
              <p className="text-zinc-400">No skills added yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
