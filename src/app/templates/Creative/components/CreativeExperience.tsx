"use client";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/store";
import { formatDate } from "@/lib/utils";

export default function Experience() {
  const { workExperience } = useAppSelector((state) => state.portfolio);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  useEffect(() => {
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
  }, []);
  return (
    <section id="experience" className={`py-20 bg-white dark:bg-black`}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Experience
        </h2>
        <div ref={sectionRef} id="experience-inner" className="space-y-8">
          {workExperience.map((exp, index) => (
            <div
              id="experience-card"
              key={index}
              className={`bg-white dark:bg-black/30 p-6 rounded-lg backdrop-blur-lg transition-all duration-500 transform ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-12"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                {exp.jobTitle}
              </h3>
              <p className="text-purple-400 mb-2">{exp.company}</p>
              <p className="text-black dark:text-white text-sm mb-4">
                {formatDate(exp.fromDate)} - {formatDate(exp.toDate)}
              </p>
              <p className="text-black dark:text-white">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
