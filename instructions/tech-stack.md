# Portfolio Generator - Tech Stack

This document details the technologies and tools used to build the Portfolio Generator, a Next.js-based application for creating professional portfolio websites.

---

## 1. Core Framework

- **Next.js**

  - **Purpose**: Full-stack React framework for server-side rendering, static site generation, and API routes.
  - **Version**: Latest stable version as of April 01, 2025.
  - **Usage**: Powers the application structure (`app/` directory), routing, and API endpoints (`api/`).
  - **File**: `next.config.js` for custom configurations.

- **TypeScript**
  - **Purpose**: Static typing for improved code quality and developer experience.
  - **Usage**: Applied across the codebase (e.g., `store.ts`, `types/index.ts`).

---

## 2. Styling

- **Tailwind CSS**

  - **Purpose**: Utility-first CSS framework for rapid and responsive styling.
  - **Usage**: Primary styling solution integrated with Next.js (`globals.css`).

- **shadcn UI**
  - **Purpose**: Reusable, customizable UI components built with Tailwind CSS.
  - **Usage**: Components like `button.tsx`, `card.tsx`, `dialog.tsx`, etc., in `components/ui/`.

---

## 3. State Management

- **Redux Toolkit**
  - **Purpose**: Simplified state management for predictable state updates.
  - **Usage**: Centralized store (`store.ts`) and state handling across the app (e.g., form data, template selections).

---

## 4. Form Handling

- **react-hook-form**
  - **Purpose**: Lightweight library for managing form state and validation.
  - **Usage**: Powers form components (`InfoForm.tsx`, `ProjectsForm.tsx`, etc.) with minimal re-renders.

---

## 5. Export Utilities

- **html2canvas**

  - **Purpose**: Converts HTML elements to canvas for screenshot generation.
  - **Usage**: Enables PDF export by rendering portfolio previews.

- **jsPDF**

  - **Purpose**: Generates PDF files from rendered content.
  - **Usage**: Combines with `html2canvas` for PDF export functionality.

- **file-saver**

  - **Purpose**: Saves files on the client-side.
  - **Usage**: Facilitates downloading static files or ZIP archives.

- **jszip**
  - **Purpose**: Creates ZIP files for static portfolio exports.
  - **Usage**: Bundles HTML, CSS, and JS files for download (`exportUtils.ts`).

---

## 6. Deployment Integration

- **Netlify API**
  - **Purpose**: Enables one-click deployment of portfolios to Netlify.
  - **Usage**: Custom API routes (`/api/netlify/`) for site creation and deployment management.

---

## 7. Frontend Utilities

- **React**

  - **Purpose**: Core library for building UI components.
  - **Usage**: Integrated with Next.js for component-based architecture (`components/`, `templates/`).

- **Custom Hooks**

  - **Purpose**: Encapsulate reusable logic.
  - **Usage**: `useTemplateSync.ts` for syncing template data with the preview.

- **Context API**
  - **Purpose**: Manage global state (e.g., dark mode).
  - **Usage**: `DarkModeContext.tsx` for theme toggling.

---

## 8. Component Libraries

- **Custom Components**

  - **Purpose**: Tailored UI elements for the portfolio creation process.
  - **Usage**:
    - `TemplateCard.tsx`, `PreviewPane.tsx`, `NetlifyDeployDialog.tsx` for core functionality.
    - Form-specific components (`ContactForm.tsx`, `SkillsForm.tsx`, etc.).
    - Landing page components (`Hero.tsx`, `CTA.tsx`, etc.).

- **Shared Components**
  - **Purpose**: Reusable across templates.
  - **Usage**: `CommonHeader.tsx`, `CommonFooter.tsx`, `ImageUpload.tsx`, `SkillSelector.tsx`.

---

## 9. File Structure Utilities

- **Custom Utilities**
  - **Purpose**: Helper functions and constants for modularity.
  - **Usage**:
    - `utils.ts`: General utility functions.
    - `constants.ts`: App-wide constants.
    - `serverRenderUtils.ts`: Server-side rendering helpers.
    - `exportUtils.ts`: Export-related logic.

---

## 10. Development Tools

- **npm**

  - **Purpose**: Package management.
  - **Usage**: Defined in `package.json` for dependencies and scripts.

- **ESLint/Prettier** (Assumed)
  - **Purpose**: Code linting and formatting.
  - **Usage**: Ensures consistent code style (not explicitly listed but standard for Next.js projects).

---

## 11. Directory Structure Highlights

- **`public/`**: Static assets (e.g., images, fonts).
- **`src/`**:
  - `app/`: Next.js pages and API routes.
  - `components/`: Reusable UI components.
  - `contexts/`: Global state management.
  - `hooks/`: Custom React hooks.
  - `lib/`: Shared utility functions.
  - `types/`: TypeScript type definitions.
  - `utils/`: Helper utilities and constants.
  - `templates/`: Predefined portfolio templates (e.g., `Creative/`, `Minimalist/`).

---

## 12. Additional Notes

- **Responsive Design**: Achieved through Tailwind CSS and tested across devices.
- **Scalability**: Modular structure allows easy addition of new templates or features.
- **Performance**: Optimized with Next.js features like static generation and lazy loading.

---

This tech stack reflects a modern, efficient, and developer-friendly setup tailored to the Portfolio Generator's requirements. Let me know if you'd like to refine or add more details!
