# Portfolio Generator - Application Flow

This document outlines the user journey and application flow for the Portfolio Generator, a Next.js-based tool for creating professional portfolio websites. It details the steps users take and how the application's components and pages interact to deliver the experience.

---

## 1. Landing Page

**Purpose**: Introduce the application and guide users to start creating their portfolio.

- **Entry Point**: `/` (Root page, `app/page.tsx`)
- **Components**:
  - `Header.tsx`: Navigation bar with branding and links.
  - `Hero.tsx`: Eye-catching introduction with a call-to-action.
  - `Steps.tsx`: Visual overview of the portfolio creation process (e.g., "Enter Info → Choose Template → Deploy").
  - `CTA.tsx`: Button to start building (links to `/create/`).
  - `Footer.tsx`: Additional information and links.
- **User Action**: Click the "Get Started" button (`CTA.tsx`).
- **Next Step**: Redirects to `/create/` page.

---

## 2. Portfolio Creation Workflow

**Purpose**: Collect user data and guide them through portfolio setup.

- **Page**: `/create/` (`app/create/page.tsx`)
- **Components**:
  - `FormStepper.tsx`: Displays progress through multi-step form.
  - `InfoForm.tsx`: Collects basic user info (e.g., name, bio).
  - `ProjectsForm.tsx`: Adds project details (e.g., title, description, links).
  - `ExperienceForm.tsx`: Captures work experience.
  - `SkillsForm.tsx`: Inputs skills via `SkillSelector.tsx`.
  - `ContactForm.tsx`: Gathers contact information.
  - `ImageUpload.tsx`: Allows uploading profile or project images.
  - `ConditionalSection.tsx`: Shows/hides sections based on user input.
- **Flow**:
  1. User enters personal info in `InfoForm.tsx`.
  2. Advances to `ProjectsForm.tsx` to add projects.
  3. Proceeds to `ExperienceForm.tsx` for work history.
  4. Adds skills in `SkillsForm.tsx`.
  5. Fills out `ContactForm.tsx`.
  6. Form data is validated using `react-hook-form` and stored in Redux (`store.ts`).
- **User Action**: Click "Next" to move between steps; click "Finish" to proceed.
- **Next Step**: Redirects to `/templates/` for template selection.

---

## 3. Template Selection

**Purpose**: Allow users to choose and customize a portfolio template.

- **Page**: `/templates/` (`app/templates/page.tsx`)
- **Components**:
  - `TemplateCard.tsx`: Displays available templates (e.g., Creative, Minimalist).
  - `ThemeSelector.tsx`: Switches between light/dark modes (`DarkModeContext.tsx`).
  - `OrderedTemplateContainer.tsx`: Organizes template options.
- **Templates**:
  - `Creative/`:
    - Components: `CreativeHero.tsx`, `CreativeProjects.tsx`, `CreativeSkills.tsx`, etc.
    - Styling: `index.css`.
  - `Minimalist/`:
    - Components: `MinimalistAbout.tsx`, `MinimalistContact.tsx`, etc.
  - `shared/`:
    - Reusable: `CommonHeader.tsx`, `CommonFooter.tsx`.
- **Flow**:
  1. User browses templates via `TemplateCard.tsx`.
  2. Selects a template (e.g., `Creative.tsx` or `Minimalist.tsx`).
  3. Optionally adjusts theme with `ThemeSelector.tsx`.
  4. Template choice is synced with form data (`useTemplateSync.ts`).
- **User Action**: Click "Preview" to see the portfolio.
- **Next Step**: Redirects to `/preview/`.

---

## 4. Live Preview

**Purpose**: Show a real-time rendering of the portfolio based on user input and selected template.

- **Page**: `/preview/` (`app/preview/page.tsx`)
- **Components**:
  - `PreviewPane.tsx`: Renders the portfolio layout.
  - `PreviewHeader.tsx`: Provides controls (e.g., "Edit", "Export", "Deploy").
- **Flow**:
  1. Portfolio is rendered using the selected template and form data.
  2. Changes sync in real-time (`useTemplateSync.ts`).
  3. User can toggle between desktop/mobile views.
- **User Actions**:
  - Click "Edit" to return to `/create/` or `/templates/`.
  - Click "Export" to download the portfolio.
  - Click "Deploy" to publish to Netlify.
- **Next Steps**:
  - Export: Proceeds to export process.
  - Deploy: Opens deployment dialog.

---

## 5. Export Options

**Purpose**: Allow users to save their portfolio locally.

- **Backend**: `/api/generate/` (`app/api/generate/route.ts`)
- **Utilities**: `exportUtils.ts`
- **Flow**:
  1. User selects export format from `PreviewHeader.tsx`:
     - **PDF**: `html2canvas` captures the preview, `jsPDF` generates the file.
     - **Static Files**: `jszip` bundles HTML/CSS/JS, `file-saver` triggers download.
  2. API generates files based on template and data.
  3. Files are downloaded to the user’s device.
- **Outcome**: User receives a PDF or ZIP file with their portfolio.

---

## 6. One-Click Deployment to Netlify

**Purpose**: Publish the portfolio online with minimal effort.

- **Backend**:
  - `/api/netlify/sites/route.ts`: Creates a new Netlify site.
  - `/api/netlify/sites/[siteId]/deploys/route.ts`: Deploys the portfolio.
- **Components**:
  - `NetlifyDeployDialog.tsx`: UI for deployment initiation and status.
- **Flow**:
  1. User clicks "Deploy" in `PreviewHeader.tsx`.
  2. `NetlifyDeployDialog.tsx` opens, prompting confirmation.
  3. API generates static files and sends them to Netlify.
  4. User receives a live URL upon successful deployment.
- **Outcome**: Portfolio is hosted on Netlify with a unique URL.

---

## 7. Additional Features

- **Responsive Design**: Ensured across all pages and templates via Tailwind CSS.
- **Dark Mode**: Toggled via `ThemeSelector.tsx` and managed by `DarkModeContext.tsx`.
- **File Uploads**: Handled by `/api/upload/` (`app/api/upload/route.ts`) for images.

---

## 8. Navigation Summary

- **`/ → /create/ → /templates/ → /preview/`**: Core creation flow.
- **Backtracking**: Users can return to previous steps (e.g., `/preview/` → `/create/`).
- **Endpoints**:
  - `/api/generate/`: Export generation.
  - `/api/netlify/`: Deployment.
  - `/api/upload/`: Image uploads.

---

## 9. Visual Flow Diagram

```
[Landing Page] --> [Create Portfolio] --> [Select Template] --> [Preview Portfolio]
     |                   |                     |                     |
     v                   v                     v                     v
[Start]           [Form Steps]        [Choose Theme]       [Export / Deploy]
```
