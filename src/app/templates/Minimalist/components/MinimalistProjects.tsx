import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store";
import { Project } from "@/types";
import { Icons } from "@/components/ui/icons";

export default function MinimalistProjects() {
  const { projects } = useAppSelector((state) => state.portfolio);
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

  const projectImageClasses = isPreview
    ? isMobile
      ? ""
      : "col-span-5 order-2"
    : "sm:col-span-5 sm:order-2";

  const projectDetailsClasses = isPreview
    ? isMobile
      ? ""
      : "col-span-7 order-1"
    : "sm:col-span-7 sm:order-1";
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
                className={`${layoutClasses} grid gap-6 md:gap-8`}
              >
                {/* Project image - Full width on mobile, right column on desktop */}
                <div className={projectImageClasses}>
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
                <div className={projectDetailsClasses}>
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
                        <Icons.externalLink size={16} className="mr-1" />
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
                        <Icons.gitHub size={16} className="mr-1" />
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
