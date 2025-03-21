"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { useAppSelector } from "@/store";

function Skills() {
  const { darkMode } = useDarkMode();
  const { skills } = useAppSelector((state) => state.portfolio);
  const { viewMode } = useAppSelector((state) => state.portfolio);
  const isMobile = viewMode === "mobile";

  return (
    <section
      id="skills"
      className={`w-full ${darkMode ? "bg-gray-900" : "bg-white"} py-16 ${
        isMobile ? "px-4" : "py-30 px-4 md:px-16 lg:px-64"
      } transition-colors duration-300`}
    >
      <div className="mx-auto max-w-7xl space-y-25">
        <div className="space-y-12">
          <div className="flex items-center gap-5">
            <div
              className={`h-px flex-1 ${
                darkMode ? "bg-gray-300" : "bg-[#1F1F1F]"
              }`}
            />
            <h2
              className={`${
                isMobile ? "text-[28px]" : "text-[36px]"
              } font-normal ${darkMode ? "text-white" : "text-[#1F1F1F]"}`}
            >
              Skills
            </h2>
            <div
              className={`h-px flex-1 ${
                darkMode ? "bg-gray-300" : "bg-[#1F1F1F]"
              }`}
            />
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className={`rounded-full ${
                  isMobile ? "px-3 py-1.5 text-sm" : "px-4 py-2 text-base"
                } ${
                  darkMode
                    ? "border-gray-500 text-gray-300"
                    : "border-[#1F1F1F] text-[#1F1F1F]"
                }`}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
