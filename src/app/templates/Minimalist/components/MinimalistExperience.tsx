import React from "react";
import { useAppSelector } from "@/store";
import { useDarkMode } from "@/contexts/DarkModeContext";

import { WorkExperience } from "@/types";
import { formatDate } from "@/lib/utils";

export default function MinimalistExperience() {
  const { workExperience } = useAppSelector((state) => state.portfolio);
  const { darkMode } = useDarkMode();
  const { viewMode } = useAppSelector((state) => state.portfolio);

  const isMobile = viewMode === "mobile" || window.innerWidth < 768;

  return (
    <section id="experience" className="py-12 bg-gray-50 dark:bg-black">
      <div className="px-6 max-w-4xl mx-auto">
        <h2
          className={`text-2xl font-light mb-8 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Experience
        </h2>
        <div className="space-y-10 md:space-y-12">
          {workExperience.length > 0 ? (
            workExperience.map((experience: WorkExperience, index: number) => (
              <div
                key={index}
                className={`${
                  isMobile ? "grid grid-cols-1" : "grid grid-cols-12"
                } gap-2 md:gap-4`}
              >
                {/* Date - Full width on mobile, left column on desktop */}
                <div className={isMobile ? "mb-2" : "col-span-3 mb-0"}>
                  <div
                    className={`text-sm font-medium ${
                      darkMode ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    {formatDate(experience.fromDate)} —{" "}
                    {experience.toDate
                      ? formatDate(experience.toDate)
                      : "Present"}
                  </div>
                </div>

                {/* Experience details - Full width on mobile, right column on desktop */}
                <div className={isMobile ? "" : "col-span-9"}>
                  <h3
                    className={`text-lg font-medium mb-1 ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {experience.jobTitle}
                  </h3>
                  <div
                    className={`text-base mb-3 ${
                      darkMode ? "text-zinc-300" : "text-zinc-700"
                    }`}
                  >
                    {experience.company}
                  </div>
                  <p
                    className={`mb-4 text-sm leading-relaxed ${
                      darkMode ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    {experience.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className={`text-xs px-2 py-1 ${
                          darkMode
                            ? "bg-zinc-800 text-zinc-300"
                            : "bg-zinc-100 text-zinc-700"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              className={`text-base ${
                darkMode ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              Add your work experience to showcase your professional journey.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
