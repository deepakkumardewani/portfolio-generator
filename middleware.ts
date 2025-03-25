import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Clone the response
  const response = NextResponse.next();

  // Define CSP
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' *.linkedin.com *.licdn.com platform.linkedin.com platform-akam.linkedin.com platform-ecst.linkedin.com platform-azur.linkedin.com spdy.linkedin.com static-src.linkedin.com *.ads.linkedin.com static.chartbeat.com bcvipva02.rightnowtech.com www.bizographics.com sjs.bizographics.com js.bizographics.com d.la4-c1-was.salesforceliveagent.com www.googletagmanager.com googleads.g.doubleclick.net adservice.google.com www.google-analytics.com;
    connect-src 'self' *.linkedin.com api.linkedin.com;
    img-src 'self' blob: data: *.linkedin.com *.licdn.com;
    style-src 'self' 'unsafe-inline';
    frame-src 'self' *.linkedin.com;
    font-src 'self';
    worker-src 'self' blob:;
  `
    .replace(/\s+/g, " ")
    .trim();

  // Set CSP header
  response.headers.set("Content-Security-Policy", cspHeader);

  return response;
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
