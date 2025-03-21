import { NextRequest, NextResponse } from "next/server";

// Environment variable for Netlify API token
const NETLIFY_API_TOKEN = process.env.NETLIFY_API_TOKEN;
const NETLIFY_BASE_URL = process.env.NETLIFY_BASE_URL;

/**
 * POST handler for deploying a site to Netlify
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  try {
    if (!NETLIFY_API_TOKEN) {
      return NextResponse.json(
        { error: "Netlify API token is not configured" },
        { status: 500 }
      );
    }

    const { siteId } = await params;

    // To properly handle multipart/form-data, we can't just forward the request body
    // We need to get the file from the form data and create a new form data
    const formData = await request.formData();
    const zipFile = formData.get("file") as File;

    if (!zipFile) {
      return NextResponse.json(
        { error: "No file found in request" },
        { status: 400 }
      );
    }

    // Create new FormData to send to Netlify
    // const netlifyFormData = new FormData();
    // netlifyFormData.append("file", zipFile);

    // console.log("netlifyFormData", netlifyFormData);
    // Deploy to Netlify
    const response = await fetch(
      `${NETLIFY_BASE_URL}/sites/${siteId}/deploys`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${NETLIFY_API_TOKEN}`,
          "Content-Type": "application/zip",
        },
        body: zipFile,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Netlify API error:", errorText);
      return NextResponse.json(
        { error: `Netlify API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error deploying to Netlify:", error);
    return NextResponse.json(
      { error: "Failed to deploy to Netlify" },
      { status: 500 }
    );
  }
}
