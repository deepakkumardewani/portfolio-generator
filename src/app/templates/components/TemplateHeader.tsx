import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { darkModeClasses } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import React from "react";
import Logo from "@/components/shared/Logo";
export default function CreateHeader() {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 shadow-sm fixed top-0 left-0 right-0 z-10 border-b">
      <div className="flex justify-between items-center px-6 py-3 w-full mx-auto">
        <Logo />

        <div className="flex justify-end items-center space-x-4">
          <Link href="/create">
            <Button variant="outline" className={darkModeClasses.buttonOutline}>
              <Icons.arrowLeft className="h-4 w-4" />
              Form
            </Button>
          </Link>
          <ThemeToggle size="md" />
        </div>
      </div>
    </div>
  );
}
