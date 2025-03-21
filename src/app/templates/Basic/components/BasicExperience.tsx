import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { useAppSelector } from "@/store";
import { formatDate } from "@/lib/utils";

function Experience() {
  const { darkMode } = useDarkMode();
  const { workExperience } = useAppSelector((state) => state.portfolio);
  const { viewMode } = useAppSelector((state) => state.portfolio);
  const [isMobile, setIsMobile] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    const isInPreview = document.getElementById("preview-pane") !== null;
    setIsPreview(isInPreview);
    const checkMobile = () => {
      setIsMobile(viewMode === "mobile" || window.innerWidth < 768);
    };
    checkMobile();
  }, []);

  const darkModeClasses = isPreview
    ? darkMode
      ? "bg-gray-800"
      : "bg-white"
    : "bg-white text-black dark:bg-gray-800 dark:text-white";

  return (
    <section
      id="experience"
      className={`w-full ${darkModeClasses} transition-colors duration-300`}
    >
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <h2 className="mb-8 text-center text-2xl font-bold text-stone-900 dark:text-white md:text-3xl">
          Experience
        </h2>
        <div className="space-y-8">
          {workExperience.map((experience, index) => (
            <div key={index} className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-stone-900 dark:text-white">
                    {experience.jobTitle}
                  </h3>
                  <p className="text-stone-600 dark:text-gray-300">
                    {experience.company}
                  </p>
                </div>
                <p className="text-sm text-stone-500 dark:text-gray-400">
                  {formatDate(experience.fromDate)} -{" "}
                  {experience.toDate
                    ? formatDate(experience.toDate)
                    : "Present"}
                </p>
              </div>
              <p className="text-stone-600 dark:text-gray-300">
                {experience.description}
              </p>
              {index < workExperience.length - 1 && (
                <Separator className="my-4 bg-stone-200 dark:bg-gray-700" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
