import React from "react";
import MinimalistHeader from "./components/MinimalistHeader";
import CommonHeader from "../shared/CommonHeader";
import MinimalistHero from "./components/MinimalistHero";
import MinimalistAbout from "./components/MinimalistAbout";
import MinimalistExperience from "./components/MinimalistExperience";
import MinimalistProjects from "./components/MinimalistProjects";
import MinimalistSkills from "./components/MinimalistSkills";
import MinimalistContact from "./components/MinimalistContact";
import MinimalistFooter from "./components/MinimalistFooter";
import { DarkModeProvider } from "@/contexts/DarkModeContext";
import { Providers } from "@/app/providers";
import OrderedTemplateContainer from "@/components/OrderedTemplateContainer";

function Minimalist() {
  // Define the sections with their IDs
  const templateSections = [
    {
      id: "header",
      component: <CommonHeader templateId="minimalist-template" />,
    },
    { id: "hero", component: <MinimalistHero /> },
    { id: "about", component: <MinimalistAbout /> },
    { id: "experience", component: <MinimalistExperience /> },
    { id: "projects", component: <MinimalistProjects /> },
    { id: "skills", component: <MinimalistSkills /> },
    { id: "contact", component: <MinimalistContact /> },
    { id: "footer", component: <MinimalistFooter /> },
  ];

  return (
    <Providers>
      <DarkModeProvider templateId="minimalist-template">
        <div id="minimalist-template">
          <OrderedTemplateContainer sections={templateSections} />
        </div>
      </DarkModeProvider>
    </Providers>
  );
}

export default Minimalist;
