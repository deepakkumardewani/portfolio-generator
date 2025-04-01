"use client";
import Hero from "@/components/landing/Hero";
import Header from "@/components/landing/Header";
import Steps from "@/components/landing/Steps";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import Features from "@/components/landing/Features";
import Templates from "@/components/landing/Templates";
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
    </main>
  );
}
