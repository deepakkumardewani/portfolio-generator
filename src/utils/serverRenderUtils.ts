import React from "react";
import { renderToString } from "react-dom/server";
import { PortfolioData } from "@/types";
import Minimalist from "@/app/templates/Minimalist/Minimalist";
import Creative from "@/app/templates/Creative/Creative";
/**
 * Renders a React component to an HTML string
 * @param Component The React component to render
 * @param props The props to pass to the component
 * @returns The rendered HTML string
 */
export function renderComponentToString(
  Component: React.ComponentType<any>,
  props: any
): string {
  return renderToString(React.createElement(Component, props));
}

/**
 * Generates a complete HTML document with the rendered component
 * @param componentString The rendered component HTML string
 * @param data The portfolio data
 * @returns A complete HTML document as a string
 */
export function generateHTMLDocument(
  componentString: string,
  data: PortfolioData
): string {
  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.bio.name} - Portfolio</title>
  <!-- Include Tailwind CSS via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="index.js"></script>
</head>
<body>
  <div id="root">${componentString}</div>
</body>
</html>`;
}

/**
 * Renders a template component based on the selected template type
 * @param data The portfolio data
 * @returns The rendered component as an HTML string
 */
export function renderTemplateToString(data: PortfolioData): string {
  const { selectedTemplate } = data;

  switch (selectedTemplate) {
    case "Minimalist":
      // In the future, you can add other templates here
      // return renderComponentToString(Minimalist, data);
      return renderComponentToString(Minimalist, {
        bio: data.bio,
        skills: data.skills,
        experience: data.workExperience,
        projects: data.projects,
        theme: data.theme,
        selectedTemplate: data.selectedTemplate,
        contact: data.contact,
      });
    case "Creative":
      return renderComponentToString(Creative, {
        bio: data.bio,
        skills: data.skills,
        experience: data.workExperience,
        projects: data.projects,
        theme: data.theme,
        selectedTemplate: data.selectedTemplate,
        contact: data.contact,
      });
    default:
      return "";
  }
}
