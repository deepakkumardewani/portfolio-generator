import "@/app/globals.css";
import { Providers } from "@/app/providers";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import ClientBody from "./ClientBody";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CreateFolio",
  description: "Create and customize your portfolio with ease",
  keywords: [
    "portfolio",
    "generator",
    "developer",
    "resume",
    "personal website",
  ],
  authors: [{ name: "Portfolio Generator Team" }],
  creator: "Portfolio Generator",
  publisher: "Portfolio Generator",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "CreateFolio - Create Professional Portfolios",
    description:
      "Create and customize your professional portfolio with ease. Showcase your work, skills, and experience.",
    url: "https://createfolio.app",
    siteName: "CreateFolio",
    images: [
      {
        url: "https://cloud.appwrite.io/v1/storage/buckets/portfolio-gen-bucket/files/67f407ee001d3b1b09ca/view?project=67ec2e4a000218d4bf94&mode=admin",
        width: 512,
        height: 512,
        alt: "CreateFolio Preview",
      },
    ],
    locale: "en_US",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  alternates: {
    canonical: "https://createfolio.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased dark:bg-gray-950">
        <ClientBody>
          <Providers>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <main className="min-h-screen font-sans antialiased">
                {children}
              </main>
            </ThemeProvider>
          </Providers>
        </ClientBody>
      </body>
    </html>
  );
}
