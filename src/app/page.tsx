"use client";
import Hero from "@/components/landing/Hero";
import Header from "@/components/landing/Header";
import Steps from "@/components/landing/Steps";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import Features from "@/components/landing/Features";
import Templates from "@/components/landing/Templates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CreateFolio - Create Your Professional Portfolio",
  description:
    "Build a stunning professional portfolio with our easy-to-use portfolio generator. Showcase your projects, skills, and experience.",
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative">
      <Header />
      <div className="pt-16">
        <Hero />
        <Steps />
        <Features />
        <Templates />
        <CTA />
      </div>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Portfolio Generator",
            url: "https://portfolio-generator.com",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://portfolio-generator.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </main>
  );
}
