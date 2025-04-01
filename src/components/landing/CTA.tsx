import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";

export default function CTA() {
  return (
    <section className="bg-gradient-to-br bg-stone-50 dark:from-neutral-950 dark:to-black">
      <div className="flex flex-col items-center justify-center py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 max-w-2xl">
          Ready to showcase your work to the world?
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground dark:text-stone-300 text-center mb-10 max-w-2xl">
          Join thousands of professionals who have built stunning portfolios
          with PortfolioGen
        </p>
        <Link href="/create">
          {/* <Button
            size="lg"
            className="bg-white hover:bg-stone-100 dark:bg-stone-100 dark:hover:bg-white text-stone-900 px-8 py-6 font-medium text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
          >
            Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button> */}
          <InteractiveHoverButton>
            <span>Get Started Now</span>
          </InteractiveHoverButton>
        </Link>
      </div>
    </section>
  );
}
