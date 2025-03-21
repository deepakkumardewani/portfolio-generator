"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code, Palette, Rocket } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-10 bg-white/90 backdrop-blur-md shadow-sm h-[72px]">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" className="transition-transform hover:scale-105">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-stone-900 to-stone-600 bg-clip-text text-transparent">
              PortfolioAI
            </h1>
          </Link>
          <Link href="/create">
            <Button className="bg-gradient-to-r from-stone-800 to-stone-700 hover:from-stone-900 hover:to-stone-800 text-stone-50 px-5 py-2 font-medium rounded-full transition-all duration-300 hover:shadow-md">
              Create Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Empty space to compensate for fixed header */}
      <div className="h-[72px]"></div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200">
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 py-16 max-w-7xl mx-auto">
          <div className="animate-fade-in-up">
            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-stone-200 text-stone-700 rounded-full text-sm font-medium mb-6">
                Portfolio Builder
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-stone-900 via-stone-700 to-stone-800 text-center leading-tight max-w-4xl">
              Build Your Perfect Portfolio in Minutes
            </h1>
            <p className="text-xl md:text-2xl text-stone-600 mt-6 text-center max-w-2xl mx-auto leading-relaxed">
              Create a stunning, personalized portfolio with ease—no coding
              required. Showcase your work professionally.
            </p>
            <div className="flex flex-row gap-4 mt-10 justify-center">
              {/* <Link href="/create">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-stone-800 to-stone-700 hover:from-stone-900 hover:to-stone-800 text-stone-50 px-8 py-6 font-medium text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
                >
                  Create Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link> */}
              <Link href="#how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/80 hover:bg-white text-stone-800 border-stone-300 px-8 py-6 font-medium text-lg rounded-full transition-all duration-300"
                >
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section id="how-it-works" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-stone-100 text-stone-700 rounded-full text-sm font-medium mb-4">
              Simple Process
            </span>
            <h2 className="text-4xl font-bold text-stone-900 mb-4">
              Create Your Portfolio in 3 Simple Steps
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Our streamlined process makes it easy to build and deploy your
              professional portfolio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <Card className="p-8 text-center bg-white border-stone-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden group">
              <CardContent className="pt-6 p-0">
                <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center text-xl font-semibold mx-auto mb-6 group-hover:bg-stone-800 group-hover:text-white transition-all duration-300">
                  <Code className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold mt-5 text-stone-900">
                  Fill Your Details
                </h3>
                <p className="text-base text-stone-600 mt-3 leading-relaxed">
                  Add your bio, skills, experience, and project information
                  through our intuitive form.
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="p-8 text-center bg-white border-stone-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden group">
              <CardContent className="pt-6 p-0">
                <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center text-xl font-semibold mx-auto mb-6 group-hover:bg-stone-800 group-hover:text-white transition-all duration-300">
                  <Palette className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold mt-5 text-stone-900">
                  Select Your Template
                </h3>
                <p className="text-base text-stone-600 mt-3 leading-relaxed">
                  Choose from our collection of professionally designed
                  templates that match your style.
                </p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="p-8 text-center bg-white border-stone-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden group">
              <CardContent className="pt-6 p-0">
                <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center text-xl font-semibold mx-auto mb-6 group-hover:bg-stone-800 group-hover:text-white transition-all duration-300">
                  <Rocket className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold mt-5 text-stone-900">
                  Deploy Your Portfolio
                </h3>
                <p className="text-base text-stone-600 mt-3 leading-relaxed">
                  Export or launch your professional portfolio site with just
                  one click.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-stone-800 to-stone-900 text-white">
        <div className="flex flex-col items-center justify-center py-20 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 max-w-2xl">
            Ready to showcase your work to the world?
          </h2>
          <p className="text-lg md:text-xl text-stone-300 text-center mb-10 max-w-2xl">
            Join thousands of professionals who have built stunning portfolios
            with PortfolioAI
          </p>
          <Link href="/create">
            <Button
              size="lg"
              className="bg-white hover:bg-stone-100 text-stone-900 px-8 py-6 font-medium text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
            >
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-stone-500">
            © {new Date().getFullYear()} PortfolioAI. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Add this to your global CSS or create a style tag */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
