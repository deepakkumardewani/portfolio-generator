import React from "react";
import CommonHeader from "../shared/CommonHeader";
import MinimalistHero from "./components/MinimalistHero";
import MinimalistAbout from "./components/MinimalistAbout";
import MinimalistExperience from "./components/MinimalistExperience";
import MinimalistProjects from "./components/MinimalistProjects";
import MinimalistSkills from "./components/MinimalistSkills";
import MinimalistContact from "./components/MinimalistContact";
import CommonFooter from "../shared/CommonFooter";
import { DarkModeProvider } from "@/contexts/DarkModeContext";
import { Providers } from "@/app/providers";
import OrderedTemplateContainer from "@/components/OrderedTemplateContainer";
import { useAppSelector } from "@/store";
import { Helmet } from "react-helmet";

/**
 * Minimalist template component with proper semantic HTML structure for better SEO
 */
function Minimalist({ isServerSide = false }) {
  // Get work experience and student status to check if section should be shown
  const { workExperience, isStudent } = useAppSelector(
    (state) => state.portfolio
  );

  // Define the sections with their IDs
  const templateSections = [
    {
      id: "header",
      component: <CommonHeader templateId="minimalist-template" />,
    },
    { id: "hero", component: <MinimalistHero /> },
    { id: "about", component: <MinimalistAbout /> },
    // Only include experience section if there's work experience and not a student
    ...(!isStudent && workExperience.length > 0
      ? [{ id: "experience", component: <MinimalistExperience /> }]
      : []),
    { id: "projects", component: <MinimalistProjects /> },
    { id: "skills", component: <MinimalistSkills /> },
    { id: "contact", component: <MinimalistContact /> },
    { id: "footer", component: <CommonFooter /> },
  ];

  const content = (
    <DarkModeProvider templateId="minimalist-template">
      <div
        id="minimalist-template"
        className="minimalist-portfolio"
        itemScope
        itemType="https://schema.org/ProfilePage"
      >
        <OrderedTemplateContainer sections={templateSections} />
      </div>
    </DarkModeProvider>
  );

  // Only wrap in Providers if not server-side rendering
  return isServerSide ? content : <Providers>{content}</Providers>;
}

export default Minimalist;
