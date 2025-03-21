"use client";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/store";

export default function Skills() {
  const { skills } = useAppSelector((state) => state.portfolio);
  const [groupedSkills, setGroupedSkills] = useState<Record<string, string[]>>(
    {}
  );
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
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
    const grouped = skills.reduce<Record<string, string[]>>((acc, skill) => {
      const category = skill.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      if (!acc[category].includes(skill.value)) {
        acc[category].push(skill.value);
      }
      return acc;
    }, {});

    setGroupedSkills(grouped);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [skills, viewMode]);
  const skillsLayoutClasses = isPreview
    ? isMobile
      ? "grid grid-cols-1 gap-8"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8";
  return (
    <section id="skills" className={`py-20 bg-white dark:bg-black`}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Skills
        </h2>
        <div ref={sectionRef} id="skills-inner" className={skillsLayoutClasses}>
          {Object.entries(groupedSkills).map(([category, items], index) => (
            <div
              id="skill-card"
              key={category}
              className={`bg-white dark:bg-black/20 p-6 rounded-lg backdrop-blur-lg transition-all duration-500 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <ul className="space-y-2">
                {items?.map((skill) => (
                  <li
                    key={skill}
                    className="text-black/50 dark:text-white flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
