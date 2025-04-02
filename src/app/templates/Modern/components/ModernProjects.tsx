"use client";

import React from "react";
import { useAppSelector } from "@/store";
import { motion } from "framer-motion";
import { Icons } from "@/components/ui/icons";
import Image from "next/image";

export default function ModernProjects() {
  const { projects } = useAppSelector((state) => state.portfolio);

  return (
    <section id="projects" className="py-24 px-4 relative">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-zinc-900 opacity-50"></div>

      <div className="container mx-auto max-w-4xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">
              Projects
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-pink-400 to-purple-500 rounded"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      width={600}
                      height={300}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                      <Icons.folderIcon className="h-16 w-16 text-zinc-600" />
                    </div>
                  )}
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-0 group-hover:opacity-60 transition-opacity"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-zinc-100 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies?.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
                        >
                          <Icons.externalLinkIcon className="h-5 w-5" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
                        >
                          <Icons.gitHub className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                    <div className="text-zinc-500 text-sm">
                      {/* You could add project date here */}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 text-center p-8 border border-dashed border-zinc-800 rounded-lg">
              <Icons.folderIcon className="h-12 w-12 mx-auto mb-4 text-zinc-700" />
              <p className="text-zinc-400">No projects added yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
