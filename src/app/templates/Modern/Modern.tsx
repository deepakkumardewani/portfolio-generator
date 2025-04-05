"use client";

import React from "react";
import CommonHeader from "../shared/CommonHeader";
import ModernHero from "./components/ModernHero";
import ModernAbout from "./components/ModernAbout";
import ModernExperience from "./components/ModernExperience";
import ModernProjects from "./components/ModernProjects";
import ModernSkills from "./components/ModernSkills";
import ModernContact from "./components/ModernContact";
import { Providers } from "@/app/providers";
import { DarkModeProvider } from "@/contexts/DarkModeContext";
import OrderedTemplateContainer from "@/components/OrderedTemplateContainer";
import CommonFooter from "../shared/CommonFooter";

export default function Modern({ isServerSide = false }) {
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
    {
      id: "footer",
      component: <CommonFooter />,
    },
  ];

  const content = (
    <DarkModeProvider templateId="modern-template" defaultDark={true}>
      <div id="modern-template">
        <OrderedTemplateContainer sections={templateSections} />
      </div>
    </DarkModeProvider>
  );

  // Only wrap in Providers if not server-side rendering
  return isServerSide ? content : <Providers>{content}</Providers>;
}
