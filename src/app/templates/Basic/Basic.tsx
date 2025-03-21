"use client";

import React from "react";
import Header from "./components/BasicHeader";
import Hero from "./components/BasicHero";
import About from "./components/BasicAbout";
import Experience from "./components/BasicExperience";
import Projects from "./components/BasicProjects";
import Skills from "./components/BasicSkills";
import ContactSection from "./components/BasicContact";
import Footer from "./components/BasicFooter";
import { Providers } from "@/app/providers";
import { DarkModeProvider } from "@/contexts/DarkModeContext";
import OrderedTemplateContainer from "@/components/OrderedTemplateContainer";

function Basic() {
  // Define the sections with their IDs
  const templateSections = [
    { id: "header", component: <Header /> },
    { id: "hero", component: <Hero /> },
    { id: "about", component: <About /> },
    { id: "experience", component: <Experience /> },
    { id: "projects", component: <Projects /> },
    { id: "skills", component: <Skills /> },
    { id: "contact", component: <ContactSection /> },
    { id: "footer", component: <Footer /> },
  ];

  return (
    <Providers>
      <DarkModeProvider templateId="basic-template">
        <div
          id="basic-template"
          className="min-h-screen flex flex-col bg-stone-50 text-stone-900 dark:bg-gray-900 dark:text-white transition-colors duration-300"
        >
          <OrderedTemplateContainer sections={templateSections} />
        </div>
      </DarkModeProvider>
    </Providers>
  );
}

export default Basic;
