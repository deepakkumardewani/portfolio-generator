"use client";

import React from "react";
import CommonHeader from "../shared/CommonHeader";
import ModernHero from "./components/ModernHero";
import ModernAbout from "./components/ModernAbout";
import ModernExperience from "./components/ModernExperience";
import ModernProjects from "./components/ModernProjects";
import ModernSkills from "./components/ModernSkills";
import ModernContact from "./components/ModernContact";
import ModernFooter from "./components/ModernFooter";
import { DarkModeProvider } from "@/contexts/DarkModeContext";
import { Providers } from "@/app/providers";
import OrderedTemplateContainer from "@/components/OrderedTemplateContainer";
import CommonFooter from "../shared/CommonFooter";

export default function Modern() {
  // Define the sections with their IDs
  const templateSections = [
    {
      id: "header",
      component: <CommonHeader templateId="modern-template" />,
    },
    { id: "hero", component: <ModernHero /> },
    { id: "about", component: <ModernAbout /> },
    { id: "experience", component: <ModernExperience /> },
    { id: "projects", component: <ModernProjects /> },
    { id: "skills", component: <ModernSkills /> },
    { id: "contact", component: <ModernContact /> },
    { id: "footer", component: <CommonFooter /> },
  ];

  return (
    <Providers>
      <DarkModeProvider templateId="modern-template" defaultDark={true}>
        <div id="modern-template" className="bg-zinc-950 text-zinc-200">
          <OrderedTemplateContainer sections={templateSections} />
        </div>
      </DarkModeProvider>
    </Providers>
  );
}
