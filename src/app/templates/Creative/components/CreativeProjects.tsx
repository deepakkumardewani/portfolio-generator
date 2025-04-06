"use client";
import React, { useEffect, useState } from "react";
import { Icons } from "@/components/ui/icons";
import { useAppSelector } from "@/store";
import { motion } from "framer-motion";

export default function CreativeProjects() {
  const { projects } = useAppSelector((state) => state.portfolio);
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

    return () => {
      // Cleanup if needed
    };
  }, [viewMode]);

  const projectLayoutClasses = isPreview
    ? isMobile
      ? "grid grid-cols-1 gap-8"
      : "grid grid-cols-1 md:grid-cols-2 gap-8"
    : "grid grid-cols-1 md:grid-cols-2 gap-8";

  return (
    <section
      id="projects"
      className="py-20 bg-white dark:bg-black"
      aria-labelledby="projects-heading"
      itemScope
      itemType="https://schema.org/CollectionPage"
    >
      <div className="container mx-auto px-6">
        <motion.h2
          id="projects-heading"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
          itemProp="name"
        >
          Projects
        </motion.h2>
        <motion.div
          id="creative-projects-container"
          className={projectLayoutClasses}
          itemScope
          itemType="https://schema.org/ItemList"
        >
          {projects.map((project, index) => (
            <motion.article
              id={`creative-project-card-${index}`}
              key={index}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-black/10 w-full rounded-lg overflow-hidden backdrop-blur-lg"
              itemScope
              itemType="https://schema.org/CreativeWork"
              itemProp="itemListElement"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover"
                itemProp="image"
              />
              <div className="p-6">
                <h3
                  className="text-xl font-semibold text-black dark:text-white mb-2"
                  itemProp="name"
                >
                  {project.title}
                </h3>
                <p
                  className="text-black dark:text-white mb-4"
                  itemProp="description"
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies?.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-500/20 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                      itemProp="keywords"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href={project.githubUrl}
                    className="text-black dark:text-white hover:text-white transition-colors"
                    aria-label={`GitHub repository for ${project.title}`}
                    itemProp="codeRepository"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icons.gitHub size={20} />
                  </a>
                  <a
                    href={project.link}
                    className="text-black dark:text-white hover:text-white transition-colors"
                    aria-label={`Live demo for ${project.title}`}
                    itemProp="url"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icons.externalLink size={20} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
