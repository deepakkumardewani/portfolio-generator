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
import { useAppSelector } from "@/store";

export default function Creative({ isServerSide = false }) {
  // Get work experience and student status to check if section should be shown
  const { workExperience, isStudent } = useAppSelector(
    (state) => state.portfolio
  );

  // Define the sections with their IDs
  const templateSections = [
    {
      id: "header",
      component: <CommonHeader templateId="creative-template" />,
    },
    { id: "hero", component: <CreativeHero /> },
    { id: "about", component: <CreativeAbout /> },
    // Only include experience section if there's work experience and not a student
    ...(!isStudent && workExperience.length > 0
      ? [{ id: "experience", component: <CreativeExperience /> }]
      : []),
    { id: "projects", component: <CreativeProjects /> },
    { id: "skills", component: <CreativeSkills /> },
    { id: "contact", component: <CreativeContact /> },
    {
      id: "footer",
      component: <CommonFooter />,
    },
  ];

  const content = (
    <DarkModeProvider templateId="creative-template">
      <div id="creative-template">
        <OrderedTemplateContainer sections={templateSections} />
      </div>
    </DarkModeProvider>
  );

  // Only wrap in Providers if not server-side rendering
  return isServerSide ? content : <Providers>{content}</Providers>;
}
