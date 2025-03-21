# Portfolio Generator

A Next.js application that allows users to create a professional portfolio website by following a few simple steps.

## Features

- Multi-step form for collecting user information and projects
- Template selection and customization
- Live preview of the portfolio
- Export options (PDF, static files)
- One-click deployment to Netlify
- Responsive design

## Tech Stack

- **Framework**: Next.js with TypeScript
- **Styling**: shadcn UI components with Tailwind CSS
- **State Management**: Redux Toolkit
- **Form Handling**: react-hook-form
- **Export Utilities**: html2canvas, jsPDF, file-saver, jszip
- **Deployment**: Netlify API for direct deployment

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- Netlify account (for deployment feature)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/portfolio-generator.git
   cd portfolio-generator
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   Copy `.env.example` to `.env.local` and add your Netlify personal access token:

   ```
   NEXT_PUBLIC_NETLIFY_TOKEN=your_netlify_token_here
   ```

   You can generate a token at [Netlify User Applications](https://app.netlify.com/user/applications#personal-access-tokens)

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Step 1**: Enter your personal information (name, tagline, about)
2. **Step 2**: Add your projects (title, description, image URL, link)
3. **Preview**: Select a template, customize colors and layout
4. **Export**:
   - Download as static files for self-hosting
   - Deploy directly to Netlify with progress tracking

## Netlify Deployment

The application supports direct deployment to Netlify without requiring GitHub integration. Here's how it works:

1. Click the "Export" button and select "Deploy to Netlify"
2. The application will:
   - Generate your portfolio files
   - Create a ZIP archive
   - Upload directly to Netlify using their API
   - Show real-time deployment progress
   - Provide a public URL once deployment is complete

You can then copy the URL or visit your site directly from the deployment dialog.

### Site Naming

When deploying to Netlify, the application automatically generates a unique site name based on your name. If there's a naming conflict (which can happen if you deploy multiple times or someone else has used a similar name), the application will automatically retry with a more unique name that includes random characters and a timestamp.

The site URL will be in the format: `https://portfolio-yourname-xxxxxx.netlify.app` where `xxxxxx` is a random string to ensure uniqueness.

## Project Structure

```
portfolio-generator/
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout with Redux Provider
│   │   ├── step1/page.tsx        # Bio form page
│   │   ├── step2/page.tsx        # Projects form page
│   │   ├── preview/page.tsx      # Preview + theme selector page
│   │   ├── api/
│   │   │   └── generate-template/route.ts  # API to return populated template
│   │   └── templates/
│   │       ├── Minimalist.tsx    # Server Component template
│   │       └── Creative.tsx      # Server Component template
│   ├── components/
│   │   ├── FormStep1.tsx         # Bio form component
│   │   ├── FormStep2.tsx         # Projects form component
│   │   ├── PreviewPane.tsx       # Client-side preview
│   │   ├── ThemeSelector.tsx     # Customization controls
│   │   ├── ExportButton.tsx      # Export and deploy options
│   │   └── NetlifyDeployDialog.tsx # Deployment progress UI
│   ├── utils/
│   │   └── exportUtils.ts        # PDF/ZIP generation and Netlify deployment logic
│   └── store.ts                  # Redux store
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
