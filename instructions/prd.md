# Portfolio Generator - Product Requirements Document (PRD)

## 1. Overview

### 1.1 Purpose

The Portfolio Generator is a web-based application designed to enable users to create professional portfolio websites quickly and efficiently. It provides an intuitive interface for inputting personal and professional information, selecting customizable templates, previewing the portfolio in real-time, and exporting or deploying it with ease.

### 1.2 Target Audience

- Freelancers, developers, designers, and professionals seeking an online portfolio.
- Individuals with minimal technical knowledge who need a simple portfolio creation tool.
- Users looking for fast deployment options to showcase their work online.

### 1.3 Goals

- Simplify the process of creating a portfolio website.
- Offer flexibility with template selection and customization.
- Provide seamless export and deployment options.
- Ensure a responsive and visually appealing user experience.

---

## 2. Features

### 2.1 Multi-Step Form

- **Description**: A guided form to collect user information and project details.
- **Components**:
  - `InfoForm.tsx`: Collects basic user information (e.g., name, bio).
  - `ProjectsForm.tsx`: Allows users to add project details (e.g., title, description, links).
  - `ExperienceForm.tsx`: Captures work experience.
  - `SkillsForm.tsx`: Enables skill input with a `SkillSelector.tsx`.
  - `ContactForm.tsx`: Gathers contact details.
  - `FormStepper.tsx`: Displays progress through the multi-step process.
- **Requirements**:
  - Form validation using `react-hook-form`.
  - Conditional rendering of sections based on user input (via `ConditionalSection.tsx`).

### 2.2 Template Selection and Customization

- **Description**: Users can choose from predefined templates and customize them.
- **Templates**:
  - `Creative/`: A visually rich template with components like `CreativeHero.tsx`, `CreativeProjects.tsx`, etc.
  - `Minimalist/`: A clean, simple template with components like `MinimalistAbout.tsx`, `MinimalistSkills.tsx`, etc.
  - `shared/`: Reusable components like `CommonHeader.tsx` and `CommonFooter.tsx`.
- **Components**:
  - `TemplateCard.tsx`: Displays template options.
  - `ThemeSelector.tsx`: Allows theme switching (e.g., light/dark mode via `DarkModeContext.tsx`).
  - `TemplateSectionEditor.tsx`: Enables editing of template sections.
- **Requirements**:
  - Templates must be responsive and customizable.
  - Support for live updates using `useTemplateSync.ts`.

### 2.3 Live Preview

- **Description**: A real-time preview of the portfolio as users build it.
- **Components**:
  - `PreviewPane.tsx`: Displays the rendered portfolio.
  - `PreviewHeader.tsx`: Provides preview-specific controls.
- **Requirements**:
  - Reflects changes instantly as users edit content or switch templates.
  - Responsive design for desktop and mobile views.

### 2.4 Export Options

- **Description**: Users can export their portfolio in multiple formats.
- **Functionality**:
  - Export as PDF using `html2canvas` and `jsPDF`.
  - Export as static files (HTML/CSS/JS) using `file-saver` and `jszip`.
- **Components**:
  - Utilities in `exportUtils.ts` for handling exports.
- **Requirements**:
  - Ensure exported files maintain styling and responsiveness.
  - Provide a downloadable ZIP file for static exports.

### 2.5 One-Click Deployment to Netlify

- **Description**: Deploy the portfolio directly to Netlify with a single action.
- **API Endpoints**:
  - `/api/netlify/sites/route.ts`: Create a new site.
  - `/api/netlify/sites/[siteId]/deploys/route.ts`: Manage deployments.
- **Components**:
  - `NetlifyDeployDialog.tsx`: UI for initiating deployment.
- **Requirements**:
  - Integrate with Netlify API for seamless deployment.
  - Provide deployment status feedback to the user.

### 2.6 Responsive Design

- **Description**: The application and generated portfolios must be fully responsive.
- **Requirements**:
  - Use Tailwind CSS for adaptive layouts.
  - Test across mobile, tablet, and desktop breakpoints.

---

## 3. Technical Requirements

### 3.1 Tech Stack

- **Framework**: Next.js with TypeScript for server-side rendering and routing.
- **Styling**: `shadcn` UI components with Tailwind CSS for consistency and scalability.
- **State Management**: Redux Toolkit (`store.ts`) for managing application state.
- **Form Handling**: `react-hook-form` for efficient form management.
- **Export Utilities**: `html2canvas`, `jsPDF`, `file-saver`, `jszip` for export functionality.
- **Deployment**: Netlify API integration for hosting.
- **Utilities**: `utils.ts`, `serverRenderUtils.ts`, `constants.ts` for reusable logic.

### 3.2 Directory Structure

- **Root**:
  - `README.md`: Project documentation.
  - `next.config.js`: Next.js configuration.
  - `package.json`: Dependencies and scripts.
- **Public/**: Static assets.
- **Src/**:
  - `app/`: Pages and API routes (e.g., `layout.tsx`, `page.tsx`, `api/`).
  - `components/`: Reusable UI components (e.g., `button.tsx`, `card.tsx`).
  - `contexts/`: Context providers (e.g., `DarkModeContext.tsx`).
  - `hooks/`: Custom hooks (e.g., `useTemplateSync.ts`).
  - `lib/`: Utility functions.
  - `types/`: TypeScript type definitions.
  - `utils/`: Helper functions and constants.

### 3.3 API Routes

- `/api/generate/`: Generate portfolio files.
- `/api/netlify/`: Handle Netlify site creation and deployment.
- `/api/upload/`: Manage file uploads (e.g., images via `ImageUpload.tsx`).

---

## 4. User Interface

### 4.1 Landing Page

- **Components**:
  - `Header.tsx`: Navigation and branding.
  - `Hero.tsx`: Introduction and call-to-action.
  - `Steps.tsx`: Overview of the portfolio creation process.
  - `CTA.tsx`: Prompts to start building.
  - `Footer.tsx`: Additional links and information.
- **Requirements**:
  - Clean, inviting design to attract users.
  - Clear call-to-action to begin the process.

### 4.2 Creation Workflow

- **Pages**:
  - `/create/`: Multi-step form page.
  - `/preview/`: Live preview page.
  - `/templates/`: Template selection page.
- **Requirements**:
  - Intuitive navigation between steps.
  - Visual feedback during editing and preview.

### 4.3 UI Components

- Reusable `shadcn` components: `button.tsx`, `dialog.tsx`, `input.tsx`, etc.
- Custom components: `TemplateCard.tsx`, `SkillSelector.tsx`, etc.

---

## 5. Non-Functional Requirements

### 5.1 Performance

- Page load time under 3 seconds.
- Smooth real-time preview updates.

### 5.2 Security

- Validate all user inputs to prevent injection attacks.
- Secure API endpoints with appropriate authentication where needed.

### 5.3 Scalability

- Support for adding new templates in `templates/`.
- Modular component structure for easy expansion.

---

## 6. Future Enhancements

- Additional export formats (e.g., WordPress theme).
- Integration with other hosting platforms (e.g., Vercel, GitHub Pages).
- Advanced customization options (e.g., custom CSS editor).

---

## 7. Milestones

1. **Prototype**: Basic form and template rendering.
2. **Core Features**: Multi-step form, preview, and export functionality.
3. **Deployment**: Netlify integration and responsive design.
4. **Polish**: UI enhancements and performance optimization.

---

This PRD provides a comprehensive outline of the Portfolio Generator's purpose, features, and technical requirements based on the provided directory structure and README. Let me know if you'd like to adjust or expand any section!
