import { ThemeToggle } from "@/components/ui/theme-toggle";
import UserMenu from "@/components/shared/UserMenu";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { darkModeClasses } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
export default function CreateHeader() {
  const { user } = useAuth();
  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 shadow-sm fixed top-0 left-0 right-0 z-10 border-b">
      <div className="mx-auto py-3 px-4">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <Link href="/" className="transition-transform hover:scale-105">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-stone-900 to-stone-600 dark:from-stone-100 dark:to-stone-300 bg-clip-text text-transparent">
                PortfolioGen
              </h1>
            </Link>
          </div>

          <div className="flex-1 flex justify-end items-center space-x-4">
            <Link href="/create">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className={`${darkModeClasses.buttonOutline}`}
                    >
                      <Icons.pencil className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Edit your portfolio</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
            <Link href="/templates">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className={`${darkModeClasses.buttonOutline}`}
                    >
                      <Icons.settings className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Change your template</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
            <ThemeToggle size="md" />
          </div>
          {user && <UserMenu />}
        </div>
      </div>
    </div>
  );
}
