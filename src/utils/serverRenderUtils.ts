import React from "react";
import { renderToString } from "react-dom/server";
import { PortfolioData } from "@/types";
import Minimalist from "@/app/templates/Minimalist/Minimalist";
import Creative from "@/app/templates/Creative/Creative";
import Modern from "@/app/templates/Modern/Modern";
import { Provider } from "react-redux";
import { configureStore, Store } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

// Create a simplified version of the portfolio slice for server-side rendering
const serverPortfolioSlice = {
  name: "portfolio",
  reducer: (state: PortfolioData = {} as PortfolioData) => state,
};

interface ServerState {
  portfolio: PortfolioData;
}

/**
 * Creates a non-persisted Redux store for server-side rendering
 * @param initialState The initial state to hydrate the store with
 * @returns A configured Redux store
 */
function createServerStore(
  initialState: Partial<PortfolioData>
): Store<ServerState> {
  const rootReducer = combineReducers({
    portfolio: serverPortfolioSlice.reducer,
  });

  return configureStore({
    reducer: rootReducer,
    preloadedState: {
      portfolio: initialState as PortfolioData,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
}

/**
 * Renders a React component to an HTML string with Redux support
 * @param Component The React component to render
 * @param props The props to pass to the component
 * @returns The rendered HTML string
 */
export function renderComponentToString(
  Component: React.ComponentType<any>,
  props: any
): string {
  // Create a server-side store with the component props as initial state
  const store = createServerStore({
    bio: props.bio,
    skills: props.skills,
    workExperience: props.experience,
    projects: props.projects,
    theme: props.theme,
    selectedTemplate: props.selectedTemplate,
    contact: props.contact,
    templateSections: {
      sections: [
        { id: "header", title: "Header", visible: true, isFixed: true },
        { id: "hero", title: "Hero", visible: true, isFixed: true },
        { id: "about", title: "About", visible: true, isFixed: false },
        {
          id: "experience",
          title: "Experience",
          visible: true,
          isFixed: false,
        },
        { id: "projects", title: "Projects", visible: true, isFixed: false },
        { id: "skills", title: "Skills", visible: true, isFixed: false },
        { id: "contact", title: "Contact", visible: true, isFixed: false },
        { id: "footer", title: "Footer", visible: true, isFixed: true },
      ],
    },
  });

  const element = React.createElement(Provider, {
    store,
    children: React.createElement(Component, { ...props, isServerSide: true }),
  });

  const result = renderToString(element);
  if (!result) {
    console.error("Warning: Empty string returned from renderToString");
  }
  return result;
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
  // Generate a description from bio for meta description
  const metaDescription =
    data.bio.about ||
    `${data.bio.name}'s professional portfolio showcasing experience, projects, and skills.`;

  // Create JSON-LD structured data for Person schema
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.bio.name,
    description: data.bio.about,
    jobTitle: data.bio.tagline,
    url: "",
    sameAs:
      data.contact?.links
        ?.filter(
          (link) =>
            link.url &&
            (link.url.includes("github.com") ||
              link.url.includes("linkedin.com") ||
              link.url.includes("twitter.com"))
        )
        .map((link) => link.url) || [],
  };

  // Extract website URL from contact links if available
  const websiteUrl =
    data.contact?.links?.find(
      (link) =>
        link?.label?.toLowerCase().includes("website") ||
        (link?.url &&
          !link?.url.includes("github") &&
          !link?.url.includes("linkedin") &&
          !link?.url.includes("twitter"))
    )?.url || "";

  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  
  <!-- Primary Meta Tags -->
  <title>${data.bio.name} - Portfolio</title>
  <meta name="title" content="${data.bio.name} - ${
    data.bio.tagline || "Portfolio"
  }">
  <meta name="description" content="${metaDescription}">
  <meta name="keywords" content="${[
    "portfolio",
    "developer",
    data.bio.tagline,
    ...(data.skills?.map((skill) => skill.label) || []),
  ]
    .filter(Boolean)
    .join(", ")}">
  <meta name="author" content="${data.bio.name}">
  <meta name="robots" content="index, follow">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="profile">
  <meta property="og:title" content="${data.bio.name} - ${
    data.bio.tagline || "Portfolio"
  }">
  <meta property="og:description" content="${metaDescription}">
  <meta property="og:url" content="${websiteUrl}">
  <meta property="og:image" content="${data.bio.profileImg || ""}">
  <meta property="profile:first_name" content="${
    data.bio.name.split(" ")[0] || ""
  }">
  <meta property="profile:last_name" content="${
    data.bio.name.split(" ").slice(1).join(" ") || ""
  }">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${data.bio.name} - ${
    data.bio.tagline || "Portfolio"
  }">
  <meta name="twitter:description" content="${metaDescription}">
  <meta name="twitter:image" content="${data.bio.profileImg || ""}">
  
  <!-- Structured Data -->
  <script type="application/ld+json">
    ${JSON.stringify(structuredData)}
  </script>

  <!-- Favicon -->
  <link rel="icon" href="favicon.ico" type="image/x-icon">
  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
  
  <!-- Stylesheets and scripts -->
  <script src="https://cdn.tailwindcss.com"></script>

  <script src="https://cdn.jsdelivr.net/npm/motion@latest/dist/motion.js"></script>
  <script src="index.js"></script>

  <!-- Canonical URL -->
  <link rel="canonical" href="${websiteUrl}" />
</head>
<body>
  <div id="root">${componentString}</div>

  <script src="https://unpkg.com/lucide@latest"></script>
  <script>
      tailwind.config = {
        darkMode: "class",
      };
    </script>
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

  const props = {
    bio: data.bio,
    skills: data.skills,
    experience: data.workExperience,
    projects: data.projects,
    theme: data.theme,
    selectedTemplate: data.selectedTemplate,
    contact: data.contact,
  };

  switch (selectedTemplate) {
    case "Minimalist":
      return renderComponentToString(Minimalist, props);
    case "Creative":
      return renderComponentToString(Creative, props);
    case "Modern":
      return renderComponentToString(Modern, props);
    default:
      console.error("No template selected");
      return "";
  }
}
