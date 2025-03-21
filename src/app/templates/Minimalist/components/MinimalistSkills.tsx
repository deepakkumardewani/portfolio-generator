import React from "react";
import { useAppSelector } from "@/store";
import { useDarkMode } from "@/contexts/DarkModeContext";

export default function MinimalistSkills() {
  const { skills } = useAppSelector((state) => state.portfolio);
  const { darkMode } = useDarkMode();

  return (
    <section id="skills" className="py-12 bg-gray-50 dark:bg-black">
      <div className="px-6 max-w-4xl mx-auto">
        <h2
          className={`text-2xl font-light mb-8 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Skills
        </h2>
        <div className="flex flex-wrap gap-3">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <span
                key={index}
                className={`px-4 py-2 ${
                  darkMode
                    ? "border border-zinc-800 text-zinc-300"
                    : "border border-zinc-200 text-zinc-700"
                }`}
              >
                {skill.value}
              </span>
            ))
          ) : (
            <div
              className={`text-base ${
                darkMode ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              Add your skills to showcase your expertise.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
