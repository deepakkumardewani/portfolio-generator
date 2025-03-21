import { NextRequest, NextResponse } from "next/server";

// Environment variable for Netlify API token
const NETLIFY_API_TOKEN = process.env.NETLIFY_API_TOKEN;
const NETLIFY_BASE_URL = process.env.NETLIFY_BASE_URL;

/**
 * GET handler for checking the status of a deployment
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ siteId: string; deployId: string }> }
): Promise<NextResponse> {
  try {
    if (!NETLIFY_API_TOKEN) {
      return NextResponse.json(
        { error: "Netlify API token is not configured" },
        { status: 500 }
      );
    }

    const { siteId, deployId } = await params;

    // Get deployment status from Netlify
    const response = await fetch(
      `${NETLIFY_BASE_URL}/sites/${siteId}/deploys/${deployId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${NETLIFY_API_TOKEN}`,
          "Content-Type": "application/json",
        },
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
    console.error("Error checking deployment status:", error);
    return NextResponse.json(
      { error: "Failed to check deployment status" },
      { status: 500 }
    );
  }
}
