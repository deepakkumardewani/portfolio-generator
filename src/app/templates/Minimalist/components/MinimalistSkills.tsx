import React from "react";
import { useAppSelector } from "@/store";
import { useDarkMode } from "@/contexts/DarkModeContext";

export default function MinimalistSkills() {
  const { skills } = useAppSelector((state) => state.portfolio);
  const { darkMode } = useDarkMode();

  return (
    <section id="skills" className="py-12 bg-neutral-50 dark:bg-black">
      <div className="px-6 max-w-4xl mx-auto">
        <h2
          className={`text-2xl font-light mb-8 text-neutral-900 dark:text-neutral-50`}
        >
          Skills
        </h2>
        <div className="flex flex-wrap gap-3">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <span
                key={index}
                className={`px-4 py-2 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400`}
              >
                {skill.value}
              </span>
            ))
          ) : (
            <div className={`text-base text-neutral-600 dark:text-neutral-400`}>
              Add your skills to showcase your expertise.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
