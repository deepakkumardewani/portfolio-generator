import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-gradient-to-br from-stone-800 to-stone-900 dark:from-stone-900 dark:to-black text-white">
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
            className="bg-white hover:bg-stone-100 dark:bg-stone-100 dark:hover:bg-white text-stone-900 px-8 py-6 font-medium text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
          >
            Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
