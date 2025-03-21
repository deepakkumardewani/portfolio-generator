import { NextRequest, NextResponse } from "next/server";

// Environment variable for Netlify API token
// This should be set in .env.local file
const NETLIFY_API_TOKEN = process.env.NETLIFY_API_TOKEN;
const NETLIFY_BASE_URL = process.env.NETLIFY_BASE_URL;

/**
 * POST handler for creating a new Netlify site
 */
export async function POST(request: NextRequest) {
  try {
    if (!NETLIFY_API_TOKEN) {
      return NextResponse.json(
        { error: "Netlify API token is not configured" },
        { status: 500 }
      );
    }

    // Get request body
    const body = await request.json();

    // Forward the request to Netlify API
    const response = await fetch(`${NETLIFY_BASE_URL}/sites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${NETLIFY_API_TOKEN}`,
      },
      body: JSON.stringify({
        name: body.name,
        // Pass through any other configuration from the request
        ...body,
      }),
    });

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
    console.error("Error creating Netlify site:", error);
    return NextResponse.json(
      { error: "Failed to create Netlify site" },
      { status: 500 }
    );
  }
}
