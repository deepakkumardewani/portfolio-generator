import { NextResponse } from "next/server";

const LINKEDIN_BASE_URL = "https://api.linkedin.com/v2";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.endpoint || !body.accessToken) {
      return NextResponse.json(
        { error: "Missing required fields: endpoint or accessToken" },
        { status: 400 }
      );
    }

    const { endpoint, accessToken } = body;

    // Validate endpoint format
    if (!endpoint.startsWith("/")) {
      return NextResponse.json(
        { error: "Endpoint must start with /" },
        { status: 400 }
      );
    }

    const response = await fetch(`${LINKEDIN_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      console.error("LinkedIn API error:", data);
      return NextResponse.json(
        {
          error:
            typeof data === "object"
              ? data.message || "LinkedIn API request failed"
              : data,
          status: response.status,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to proxy LinkedIn request",
      },
      { status: 500 }
    );
  }
}
