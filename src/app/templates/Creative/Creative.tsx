"use client";
import React from "react";
import CommonHeader from "../shared/CommonHeader";
import CreativeHero from "./components/CreativeHero";
import CreativeAbout from "./components/CreativeAbout";
import CreativeExperience from "./components/CreativeExperience";
import CreativeProjects from "./components/CreativeProjects";
import CreativeSkills from "./components/CreativeSkills";
import CreativeContact from "./components/CreativeContact";
import { Providers } from "@/app/providers";
import { DarkModeProvider } from "@/contexts/DarkModeContext";
import OrderedTemplateContainer from "@/components/OrderedTemplateContainer";
import CommonFooter from "../shared/CommonFooter";
export default function Creative() {
  // Define the sections with their IDs
  const templateSections = [
    {
      id: "header",
      component: <CommonHeader templateId="creative-template" />,
    },
    { id: "hero", component: <CreativeHero /> },
    { id: "about", component: <CreativeAbout /> },
    { id: "experience", component: <CreativeExperience /> },
    { id: "projects", component: <CreativeProjects /> },
    { id: "skills", component: <CreativeSkills /> },
    { id: "contact", component: <CreativeContact /> },
    {
      id: "footer",
      component: <CommonFooter />,
    },
  ];

  return (
    <Providers>
      <DarkModeProvider templateId="creative-template" defaultDark={true}>
        <div id="creative-template">
          <OrderedTemplateContainer sections={templateSections} />
        </div>
      </DarkModeProvider>
    </Providers>
  );
}
