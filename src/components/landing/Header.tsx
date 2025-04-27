import Link from "next/link";
import React from "react";
import { ThemeToggle } from "../ui/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import UserMenu from "../shared/UserMenu";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import Logo from "../shared/Logo";

export default function Header() {
  const { user } = useAuth();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const btnClasses =
    "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer";
  return (
    <header className="fixed top-0 w-full z-50 bg-neutral-50 dark:bg-neutral-950 backdrop-blur-md border-b border-border/40 shadow-sm">
      <div className="flex justify-between items-center px-6 py-3 w-full mx-auto">
        <Logo />

        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection("features")}
            className={btnClasses}
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className={btnClasses}
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection("templates")}
            className={btnClasses}
          >
            Templates
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <div className="flex items-center gap-2">
            <Link href={`${user ? "/create" : "/signup"}`}>
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 cursor-pointer"
              >
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-md">
                  Get Started
                </span>
              </HoverBorderGradient>
            </Link>
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
