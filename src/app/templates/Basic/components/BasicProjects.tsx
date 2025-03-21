"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Share2 } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { useAppSelector } from "@/store";

function Projects() {
  const { darkMode } = useDarkMode();
  const { projects } = useAppSelector((state) => state.portfolio);
  const { viewMode } = useAppSelector((state) => state.portfolio);
  const isMobile = viewMode === "mobile";
  return (
    <section
      id="projects"
      className={`w-full ${
        darkMode ? "bg-gray-900" : "bg-[#F2F2F2]"
      } py-12 px-4 transition-colors duration-300`}
    >
      <div className="mx-auto max-w-7xl space-y-25">
        <div className="space-y-12">
          <div className="flex items-center gap-5">
            <div
              className={`h-px flex-1 ${
                darkMode ? "bg-gray-300" : "bg-[#1F1F1F]"
              }`}
            />
            <h2
              className={`text-[36px] font-normal ${
                darkMode ? "text-white" : "text-[#1F1F1F]"
              }`}
            >
              Projects
            </h2>
            <div
              className={`h-px flex-1 ${
                darkMode ? "bg-gray-300" : "bg-[#1F1F1F]"
              }`}
            />
          </div>

          <div className="grid gap-16">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="flex items-center gap-5 border-none bg-transparent p-0 shadow-none"
              >
                {isMobile ? (
                  // Mobile layout - always column regardless of index
                  <div className="flex w-full flex-col gap-5">
                    {project.imageUrl && (
                      <div className="w-full">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className={`h-[250px] w-full rounded-md ${
                            darkMode ? "bg-gray-700" : "bg-[#C4C4C4]"
                          } object-cover`}
                        />
                      </div>
                    )}
                    <div className="flex w-full flex-col justify-center gap-3">
                      <div className="space-y-2">
                        <h3
                          className={`text-[30px] font-normal ${
                            darkMode ? "text-white" : "text-[#1F1F1F]"
                          }`}
                        >
                          {project.title}
                        </h3>
                        <p
                          className={`text-base leading-[1.7] ${
                            darkMode ? "text-gray-300" : "text-[#1F1F1F]"
                          }`}
                        >
                          {project.description}
                        </p>
                      </div>
                      <div
                        className={`h-px w-full ${
                          darkMode ? "bg-gray-600" : "bg-[#1F1F1F]"
                        }`}
                      />
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2.5">
                          {project.technologies?.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="outline"
                              className={`rounded ${
                                darkMode
                                  ? "border-gray-500 text-gray-300"
                                  : "border-[#1F1F1F] text-[#1F1F1F]"
                              } text-sm font-normal`}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex justify-end gap-2.5">
                          {project.githubUrl && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`h-6 w-6 p-0 ${
                                darkMode
                                  ? "hover:bg-gray-800"
                                  : "hover:bg-transparent"
                              }`}
                              asChild
                            >
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <SiGithub
                                  className={`h-5 w-5 stroke-[1.5px] ${
                                    darkMode
                                      ? "text-gray-300"
                                      : "text-[#1F1F1F]"
                                  }`}
                                />
                              </a>
                            </Button>
                          )}
                          {project.link && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`h-6 w-6 p-0 ${
                                darkMode
                                  ? "hover:bg-gray-800"
                                  : "hover:bg-transparent"
                              }`}
                              asChild
                            >
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Share2
                                  className={`h-5 w-5 stroke-[1.5px] ${
                                    darkMode
                                      ? "text-gray-300"
                                      : "text-[#1F1F1F]"
                                  }`}
                                />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : index % 2 === 0 ? (
                  // Desktop layout - even index
                  <div className="flex w-full items-center gap-5">
                    {project.imageUrl && (
                      <div className="w-1/2">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className={`h-[400px] w-full rounded-md ${
                            darkMode ? "bg-gray-700" : "bg-[#C4C4C4]"
                          } object-cover`}
                        />
                      </div>
                    )}
                    <div className="flex w-1/2 flex-col justify-center gap-3">
                      <div className="space-y-2">
                        <h3
                          className={`text-[30px] font-normal ${
                            darkMode ? "text-white" : "text-[#1F1F1F]"
                          }`}
                        >
                          {project.title}
                        </h3>
                        <p
                          className={`text-base leading-[1.7] ${
                            darkMode ? "text-gray-300" : "text-[#1F1F1F]"
                          }`}
                        >
                          {project.description}
                        </p>
                      </div>
                      <div
                        className={`h-px w-full ${
                          darkMode ? "bg-gray-600" : "bg-[#1F1F1F]"
                        }`}
                      />
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2.5">
                          {project.technologies?.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="outline"
                              className={`rounded ${
                                darkMode
                                  ? "border-gray-500 text-gray-300"
                                  : "border-[#1F1F1F] text-[#1F1F1F]"
                              } text-sm font-normal`}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex justify-end gap-2.5">
                          {project.githubUrl && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`h-6 w-6 p-0 ${
                                darkMode
                                  ? "hover:bg-gray-800"
                                  : "hover:bg-transparent"
                              }`}
                              asChild
                            >
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <SiGithub
                                  className={`h-5 w-5 stroke-[1.5px] ${
                                    darkMode
                                      ? "text-gray-300"
                                      : "text-[#1F1F1F]"
                                  }`}
                                />
                              </a>
                            </Button>
                          )}
                          {project.link && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`h-6 w-6 p-0 ${
                                darkMode
                                  ? "hover:bg-gray-800"
                                  : "hover:bg-transparent"
                              }`}
                              asChild
                            >
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Share2
                                  className={`h-5 w-5 stroke-[1.5px] ${
                                    darkMode
                                      ? "text-gray-300"
                                      : "text-[#1F1F1F]"
                                  }`}
                                />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Desktop layout - odd index
                  <div className="flex w-full items-center gap-5">
                    <div className="flex w-1/2 flex-col items-end justify-center gap-3">
                      <div className="space-y-2 text-right">
                        <h3
                          className={`text-[30px] font-normal ${
                            darkMode ? "text-white" : "text-[#1F1F1F]"
                          }`}
                        >
                          {project.title}
                        </h3>
                        <p
                          className={`text-base leading-[1.7] ${
                            darkMode ? "text-gray-300" : "text-[#1F1F1F]"
                          }`}
                        >
                          {project.description}
                        </p>
                      </div>
                      <div
                        className={`h-px w-full ${
                          darkMode ? "bg-gray-600" : "bg-[#1F1F1F]"
                        }`}
                      />
                      <div className="space-y-2">
                        <div className="flex flex-wrap justify-end gap-2.5">
                          {project.technologies?.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="outline"
                              className={`rounded ${
                                darkMode
                                  ? "border-gray-500 text-gray-300"
                                  : "border-[#1F1F1F] text-[#1F1F1F]"
                              } text-sm font-normal`}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex justify-end gap-2.5">
                          {project.githubUrl && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`h-6 w-6 p-0 ${
                                darkMode
                                  ? "hover:bg-gray-800"
                                  : "hover:bg-transparent"
                              }`}
                              asChild
                            >
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <SiGithub
                                  className={`h-5 w-5 stroke-[1.5px] ${
                                    darkMode
                                      ? "text-gray-300"
                                      : "text-[#1F1F1F]"
                                  }`}
                                />
                              </a>
                            </Button>
                          )}
                          {project.link && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`h-6 w-6 p-0 ${
                                darkMode
                                  ? "hover:bg-gray-800"
                                  : "hover:bg-transparent"
                              }`}
                              asChild
                            >
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Share2
                                  className={`h-5 w-5 stroke-[1.5px] ${
                                    darkMode
                                      ? "text-gray-300"
                                      : "text-[#1F1F1F]"
                                  }`}
                                />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    {project.imageUrl && (
                      <div className="w-1/2">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className={`h-[400px] w-full rounded-md ${
                            darkMode ? "bg-gray-700" : "bg-[#C4C4C4]"
                          } object-cover`}
                        />
                      </div>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
