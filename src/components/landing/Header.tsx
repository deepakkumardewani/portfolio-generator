import Link from "next/link";
import React from "react";
import { ThemeToggle } from "../ui/theme-toggle";
import { ShimmerButton } from "../magicui/shimmer-button";
import { useAuth } from "@/contexts/AuthContext";
import UserMenu from "../shared/UserMenu";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 w-full z-50 bg-neutral-50 dark:bg-neutral-950 backdrop-blur-md border-b border-border/40 shadow-sm h-[72px]">
      <div className="flex justify-between items-center px-6 py-4 w-full mx-auto">
        <Link href="/" className="transition-transform hover:scale-105">
          <h1 className="text-2xl font-bold text-black/90 dark:text-white bg-clip-text">
            PortfolioGen
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-2">
              <Link href="/create">
                <ShimmerButton className="shadow-2xl" shimmerColor="#9E7AFF">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:text-stone-300 text-md">
                    Get Started
                  </span>
                </ShimmerButton>
              </Link>
              <UserMenu />
            </div>
          ) : (
            <Link href="/auth/signup">
              <ShimmerButton className="shadow-2xl" shimmerColor="#9E7AFF">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:text-stone-300 text-md">
                  Get Started
                </span>
              </ShimmerButton>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
