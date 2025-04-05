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
    { id: "footer", component: <CommonFooter /> },
  ];

  // In client-side rendering, add additional metadata with Helmet
  const SEOMetadata = isServerSide ? null : (
    <Helmet>
      <html lang="en" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );

  const content = (
    <DarkModeProvider templateId="minimalist-template">
      {SEOMetadata}
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
