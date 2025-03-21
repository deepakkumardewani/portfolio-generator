"use client";
import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { useAppSelector } from "@/store";

export default function Projects() {
  const { projects } = useAppSelector((state) => state.portfolio);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { viewMode } = useAppSelector((state) => state.portfolio);
  useEffect(() => {
    const isInPreview = document.getElementById("preview-pane") !== null;
    setIsPreview(isInPreview);
    // Check if we're in mobile view
    const checkMobile = () => {
      setIsMobile(viewMode === "mobile" || window.innerWidth < 768);
    };

    // Initial check
    checkMobile();
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

  const projectLayoutClasses = isPreview
    ? isMobile
      ? "grid grid-cols-1 gap-8"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";
  return (
    <section id="projects" className={`py-20 bg-white dark:bg-black`}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Projects
        </h2>
        <div
          ref={sectionRef}
          id="projects-inner"
          className={projectLayoutClasses}
        >
          {projects.map((project, index) => (
            <div
              id="project-card"
              key={index}
              className={`bg-white dark:bg-black/10 rounded-lg overflow-hidden backdrop-blur-lg transition-all duration-500 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-black dark:text-white mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-500/20 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href={project.githubUrl}
                    className="text-black dark:text-white hover:text-white transition-colors"
                  >
                    <SiGithub size={20} />
                  </a>
                  <a
                    href={project.link}
                    className="text-black dark:text-white hover:text-white transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
