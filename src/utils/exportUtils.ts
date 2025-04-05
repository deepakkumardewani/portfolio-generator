import { saveAs } from "file-saver";
import JSZip from "jszip";
import { PortfolioData, PortfolioState } from "@/types";
import {
  renderTemplateToString,
  generateHTMLDocument,
} from "./serverRenderUtils";

// Deployment status type
export type DeploymentStatus =
  | "preparing"
  | "uploading"
  | "processing"
  | "success"
  | "error";

// Deployment result type
export interface DeploymentResult {
  url: string;
  status: DeploymentStatus;
  error?: string;
  siteId?: string;
}

// Local storage key for Netlify site ID
const NETLIFY_SITE_ID_KEY = "netlify_portfolio_site_id";

/**
 * Creates a zip file containing the portfolio static files
 * @param data Portfolio data
 * @returns Promise that resolves to the zip blob
 */
export async function createPortfolioZip(data: PortfolioData): Promise<Blob> {
  try {
    // Create a new JSZip instance
    const zip = new JSZip();

    // Render the selected template to a string
    const componentString = renderTemplateToString(data);

    // Generate the complete HTML document
    const htmlContent = generateHTMLDocument(componentString, data);

    const template = data.selectedTemplate;

    // Fetch the index.js file
    const indexJsResponse = await fetch(
      `/templates/${template.toLowerCase()}/index.js`
    );
    const indexJsContent = await indexJsResponse.text();

    // Add files to the zip
    zip.file("output/index.html", htmlContent);
    zip.file("output/index.js", indexJsContent);

    // Generate the zip file
    return await zip.generateAsync({ type: "blob" });
  } catch (error) {
    console.error("Error creating portfolio zip:", error);
    throw error;
  }
}

export async function exportToStatic(
  data: PortfolioData,
  saveFile: boolean = true
): Promise<Blob | null> {
  try {
    const content = await createPortfolioZip(data);

    if (saveFile) {
      // Save the zip file
      saveAs(content, "portfolio-static.zip");
      return null;
    }

    return content;
  } catch (error) {
    console.error("Error exporting to static files:", error);
    throw error;
  }
}

/**
 * Generates a unique site name with optional random suffix
 * @param baseName Base name for the site
 * @param addRandomness Whether to add random suffix
 * @returns Unique site name for Netlify
 */
function generateSiteName(baseName: string, addRandomness = true): string {
  // Sanitize the base name for URL
  const sanitizedName = baseName.toLowerCase().replace(/[^a-z0-9]/g, "-");

  // Add timestamp and random suffix if requested
  if (addRandomness) {
    const timestamp = Date.now().toString().slice(-6);
    const randomStr = Math.random().toString(36).substring(2, 6);
    return `portfolio-${sanitizedName}-${timestamp}-${randomStr}`;
  }

  return `portfolio-${sanitizedName}`;
}

/**
 * Deploys the portfolio to Netlify
 * @param data Portfolio data
 * @param progressCallback Callback function to report deployment progress
 * @returns Promise that resolves to the deployment result
 */
export async function deployToNetlify(
  data: PortfolioData,
  progressCallback: (status: DeploymentStatus, progress?: number) => void
): Promise<DeploymentResult> {
  try {
    // Start with preparing status
    progressCallback("preparing", 10);

    // Get the site ID from localStorage or create a new site
    const storedSiteId = localStorage.getItem(NETLIFY_SITE_ID_KEY);
    let siteId: string | undefined = storedSiteId || undefined;
    let siteName = "";

    // Create the zip file
    const zipBlob = await createPortfolioZip(data);
    progressCallback("preparing", 20);

    // If no site ID exists, create a new Netlify site
    if (!siteId) {
      // Get name from bio instead of basics
      const userName = data.bio?.name || "portfolio";

      siteName = generateSiteName(userName);
      progressCallback("preparing", 30);

      // Create a new site on Netlify
      const createSiteResponse = await fetch("/api/netlify/sites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: siteName,
          // Additional site configuration can go here
        }),
      });

      if (!createSiteResponse.ok) {
        throw new Error(
          `Failed to create Netlify site: ${await createSiteResponse.text()}`
        );
      }

      const siteData = await createSiteResponse.json();
      siteId = siteData.id;

      // Store the site ID in localStorage for future deployments
      if (siteId) {
        localStorage.setItem(NETLIFY_SITE_ID_KEY, siteId);
      }
      progressCallback("uploading", 40);
    }

    // Ensure we have a site ID
    if (!siteId) {
      throw new Error("Failed to obtain a valid Netlify site ID");
    }

    // Start uploading
    // Deploy the zip file to Netlify
    const formData = new FormData();
    formData.append("file", zipBlob, "portfolio.zip");

    const deployResponse = await fetch(`/api/netlify/sites/${siteId}/deploys`, {
      method: "POST",
      body: formData,
    });

    progressCallback("uploading", 60);

    if (!deployResponse.ok) {
      throw new Error(
        `Failed to deploy to Netlify: ${await deployResponse.text()}`
      );
    }

    progressCallback("processing", 70);

    // Get the deployment data
    const deployData = await deployResponse.json();

    // Poll for deployment status
    let deployStatus = deployData.state;
    let retries = 0;
    const maxRetries = 30; // 30 * 2 seconds = 60 seconds max waiting time

    while (
      deployStatus !== "ready" &&
      deployStatus !== "error" &&
      retries < maxRetries
    ) {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds

      const statusResponse = await fetch(
        `/api/netlify/sites/${siteId}/deploys/${deployData.id}`,
        {
          method: "GET",
        }
      );

      if (!statusResponse.ok) {
        throw new Error(
          `Failed to get deployment status: ${await statusResponse.text()}`
        );
      }

      const statusData = await statusResponse.json();
      deployStatus = statusData.state;

      // Calculate overall progress from 70% to 95%
      const pollProgress = Math.min(
        95,
        70 + Math.round((retries / maxRetries) * 25)
      );
      progressCallback("processing", pollProgress);

      retries++;
    }

    if (deployStatus === "error") {
      progressCallback("error", 100);
      return {
        status: "error",
        url: "",
        error: "Deployment failed on Netlify",
        siteId,
      };
    }

    // Deployment successful
    progressCallback("success", 100);

    return {
      status: "success",
      url: deployData.ssl_url || deployData.url,
      siteId,
    };
  } catch (error) {
    progressCallback("error", 100);
    return {
      status: "error",
      url: "",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Converts PortfolioState to PortfolioData format needed for export
 * @param state The portfolio state from Redux store
 * @returns Portfolio data formatted for export
 */
export function convertStateToExportData(state: PortfolioState): PortfolioData {
  return {
    bio: state.bio,
    projects: state.projects,
    skills: state.skills,
    workExperience: state.workExperience,
    contact: state.contact,
    theme: state.theme,
    selectedTemplate: state.selectedTemplate,
    templateSections: state.templateSections,
  };
}
