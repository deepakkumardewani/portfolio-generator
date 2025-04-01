import React from "react";
import { useAppSelector } from "@/store";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { Project } from "@/types";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

export default function MinimalistProjects() {
  const { projects } = useAppSelector((state) => state.portfolio);
  const { darkMode } = useDarkMode();
  const { viewMode } = useAppSelector((state) => state.portfolio);
  const isMobile = viewMode === "mobile" || window.innerWidth < 768;

  return (
    <section id="projects" className=" py-12  bg-white dark:bg-black">
      <div className="px-6 max-w-4xl mx-auto">
        <h2
          className={`text-2xl font-light mb-8 text-neutral-900 dark:text-neutral-50`}
        >
          Projects
        </h2>
        <div className="space-y-12 md:space-y-20">
          {projects.length > 0 ? (
            projects.map((project: Project, index: number) => (
              <div
                key={index}
                className={`${
                  isMobile ? "grid grid-cols-1" : "grid grid-cols-12"
                } gap-6 md:gap-8`}
              >
                {/* Project image - Full width on mobile, right column on desktop */}
                <div className={isMobile ? "" : "col-span-5 order-2"}>
                  {project.imageUrl ? (
                    <div
                      className={`relative aspect-video overflow-hidden border border-neutral-200 dark:border-neutral-800`}
                    >
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div
                      className={`aspect-video flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400`}
                    >
                      No Image
                    </div>
                  )}
                </div>

                {/* Project details - Full width on mobile, left column on desktop */}
                <div className={isMobile ? "" : "col-span-7 order-1"}>
                  <h3
                    className={`text-xl font-medium text-neutral-900 dark:text-neutral-50`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`mb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400`}
                  >
                    {project.description}
                  </p>

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`text-xs px-2 py-1 bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex space-x-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors`}
                      >
                        <ExternalLink size={16} className="mr-1" />
                        View Live
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors`}
                      >
                        <SiGithub size={16} className="mr-1" />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={`text-base text-neutral-600 dark:text-neutral-400`}>
              Add your projects to showcase your work.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
