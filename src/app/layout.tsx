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
  title: "Portfolio Generator",
  description: "Create and customize your portfolio with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <ClientBody>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <main className="min-h-screen font-sans antialiased">
              {children}
            </main>
          </ThemeProvider>
        </Providers>
      </ClientBody>
    </html>
  );
}
