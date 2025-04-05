import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store";
import { useDarkMode } from "@/contexts/DarkModeContext";

import { WorkExperience } from "@/types";
import { formatDate } from "@/lib/utils";

export default function MinimalistExperience() {
  const { workExperience } = useAppSelector((state) => state.portfolio);
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
      : "grid-cols-12"
    : "grid-cols-1 sm:grid-cols-12";
  const dateClasses = isPreview
    ? isMobile
      ? "mb-2"
      : "col-span-3 mb-0"
    : "mb-2 sm:col-span-3 sm:mb-0";

  const expDetailsClasses = isPreview
    ? isMobile
      ? ""
      : "col-span-9"
    : "sm:col-span-9";
  return (
    <section id="experience" className="py-12 bg-gray-50 dark:bg-black">
      <div className="px-6 max-w-4xl mx-auto">
        <h2
          className={`text-2xl font-light mb-8 text-neutral-900 dark:text-neutral-50`}
        >
          Experience
        </h2>
        <div className="space-y-10 md:space-y-12">
          {workExperience.map((experience: WorkExperience, index: number) => (
            <div key={index} className={`${layoutClasses} grid gap-2 md:gap-4`}>
              {/* Date - Full width on mobile, left column on desktop */}
              <div className={dateClasses}>
                <div
                  className={`text-sm font-medium text-neutral-600 dark:text-neutral-400`}
                >
                  {formatDate(experience.fromDate)} —{" "}
                  {experience.toDate
                    ? formatDate(experience.toDate)
                    : "Present"}
                </div>
              </div>

              {/* Experience details - Full width on mobile, right column on desktop */}
              <div className={expDetailsClasses}>
                <h3
                  className={`text-lg font-medium mb-1 text-neutral-900 dark:text-neutral-50`}
                >
                  {experience.jobTitle}
                </h3>
                <div
                  className={`text-base mb-3 text-neutral-600 dark:text-neutral-400`}
                >
                  {experience.company}
                </div>
                <p
                  className={`mb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400`}
                >
                  {experience.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className={`text-xs px-2 py-1 bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
