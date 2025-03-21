"use client";
import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { useDarkMode } from "@/contexts/DarkModeContext";
export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [isPreview, setIsPreview] = useState(false);
  const { darkMode } = useDarkMode();
  useEffect(() => {
    const isInPreview = document.getElementById("preview-pane") !== null;
    setIsPreview(isInPreview);
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
  const darkModeClasses = isPreview
    ? darkMode
      ? "bg-black/10"
      : "bg-white"
    : "bg-white text-black dark:bg-black/10 dark:text-white";
  return (
    <section id="contact" className={`py-20 bg-white dark:bg-black`}>
      <div className="container mx-auto px-6">
        <div
          ref={sectionRef}
          id="contact-inner"
          className={`max-w-2xl mx-auto text-center transition-all duration-800 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-black dark:text-white text-lg mb-8">
            I am always open to new opportunities and interesting projects. Feel
            free to reach out!
          </p>
          <div className="flex justify-center space-x-8">
            <a
              href="mailto:your.email@example.com"
              className="flex items-center space-x-2 text-black dark:text-white hover:text-white transition-colors hover:scale-110 duration-300"
            >
              <Mail size={24} />
              <span>Email</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-black dark:text-white hover:text-white transition-colors hover:scale-110 duration-300"
            >
              {/* <Linkedin size={24} /> */}
              <span>LinkedIn</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-black dark:text-white hover:text-white transition-colors hover:scale-110 duration-300"
            >
              <SiGithub size={24} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
