"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { useAppSelector } from "@/store";

export default function About() {
  const { bio } = useAppSelector((state) => state.portfolio);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  // const [isPreview, setIsPreview] = useState(false);
  // const { darkMode } = useDarkMode();
  // Split the about text into paragraphs
  const paragraphs = bio.about
    ? bio.about.split("\n").filter((p) => p.trim())
    : [];
  useEffect(() => {
    // const isInPreview = document.getElementById("preview-pane") !== null;
    // setIsPreview(isInPreview);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
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
    <section id="about" className={`py-20 bg-white dark:bg-black`}>
      <div className="container mx-auto px-6">
        <div
          ref={sectionRef}
          id="about-inner"
          className={`transition-all duration-800 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="prose prose-invert">
            {/* <p className="text-black dark:text-gray-300 text-lg leading-relaxed mb-6">
              {bio.about}
            </p>
            <p className="text-black dark:text-gray-300 text-lg leading-relaxed">
              I believe in writing clean, maintainable code and staying
              up-to-date with the latest web technologies and best practices.
              When I'm not coding, you can find me contributing to open-source
              projects and mentoring junior developers.
            </p> */}
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-4 text-black dark:text-gray-300 leading-relaxed text-base"
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="mb-4 text-black dark:text-gray-300 leading-relaxed text-base">
                {bio.about}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
