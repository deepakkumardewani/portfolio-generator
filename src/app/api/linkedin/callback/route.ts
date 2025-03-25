import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "@/lib/linkedin";

/**
 * LinkedIn OAuth callback handler
 */
export async function GET(request: NextRequest) {
  try {
    // Extract authorization code from query parameters
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");
    const state = searchParams.get("state");

    // Handle error from LinkedIn
    if (error) {
      const errorMessage = errorDescription
        ? `${error}: ${errorDescription}`
        : error;

      console.error("LinkedIn OAuth error:", errorMessage);

      return NextResponse.redirect(
        new URL(`/form?error=${encodeURIComponent(errorMessage)}`, request.url)
      );
    }

    // Validate code
    if (!code) {
      console.error("LinkedIn OAuth error: Missing authorization code");

      return NextResponse.redirect(
        new URL(
          "/form?error=Missing authorization code from LinkedIn",
          request.url
        )
      );
    }

    console.log("Exchanging code for access token...");

    // Exchange code for access token
    const accessToken = await getAccessToken(code);

    if (!accessToken) {
      throw new Error("Failed to obtain access token from LinkedIn");
    }

    console.log("Access token obtained successfully");

    // Redirect back to form with access token
    return NextResponse.redirect(
      new URL(`/form?access_token=${accessToken}`, request.url)
    );
  } catch (error) {
    console.error("LinkedIn callback error:", error);

    // Redirect with error
    return NextResponse.redirect(
      new URL(
        `/form?error=${encodeURIComponent(
          (error as Error).message || "Unknown LinkedIn authentication error"
        )}`,
        request.url
      )
    );
  }
}
