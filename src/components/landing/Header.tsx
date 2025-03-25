import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { ThemeToggle } from "../ui/theme-toggle";
import { ShimmerButton } from "../magicui/shimmer-button";
import { useTheme } from "next-themes";
import { ShinyButton } from "../magicui/shiny-button";

export default function Header() {
  const { theme } = useTheme();
  return (
    <header className="fixed top-0 w-full z-10 bg-neutral-50 dark:bg-neutral-950 backdrop-blur-md border-b border-border/40 shadow-sm h-[72px]">
      <div className="flex justify-between items-center px-6 py-4 w-full mx-auto">
        <Link href="/" className="transition-transform hover:scale-105">
          <h1 className="text-2xl font-bold text-black/90 dark:text-white bg-clip-text">
            PortfolioGen
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/create">
            {/* <Button
              size="lg"
              className="text-white dark:text-black bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Get Started
            </Button> */}
            <ShimmerButton className="shadow-2xl" shimmerColor="#9E7AFF">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:text-stone-300 text-md">
                Get Started
              </span>
            </ShimmerButton>
          </Link>
        </div>
      </div>
    </header>
  );
}
