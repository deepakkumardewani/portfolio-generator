import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { darkModeClasses } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import React from "react";

export default function CreateHeader() {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 shadow-sm fixed top-0 left-0 right-0 z-10 border-b">
      <div className="mx-auto py-3 px-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-1 items-center gap-4">
            <Link href="/create">
              <Button
                variant="outline"
                className={darkModeClasses.buttonOutline}
              >
                <Icons.arrowLeft className="h-4 w-4" />
                Edit
              </Button>
            </Link>
            <Link href="/" className="transition-transform hover:scale-105">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-stone-900 to-stone-600 dark:from-stone-100 dark:to-stone-300 bg-clip-text text-transparent">
                PortfolioGen
              </h1>
            </Link>
          </div>

          <div className="flex-1 flex justify-end items-center space-x-4">
            {/* <Link href="/create">
              <Button
                variant="outline"
                className={darkModeClasses.buttonOutline}
              >
                <ArrowLeft className="h-4 w-4" />
                Form
              </Button>
            </Link> */}
            <ThemeToggle size="md" />
          </div>
        </div>
      </div>
    </div>
  );
}
