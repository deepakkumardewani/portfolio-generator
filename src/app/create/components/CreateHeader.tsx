import { ThemeToggle } from "@/components/ui/theme-toggle";
import UserMenu from "@/components/shared/UserMenu";
import Logo from "@/components/shared/Logo";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
export default function CreateHeader() {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 shadow-sm fixed top-0 left-0 right-0 z-10 border-b">
      <div className="flex justify-between items-center px-6 py-3 w-full mx-auto">
        <Logo />

        <div className="flex justify-end items-center space-x-2">
          <ThemeToggle size="md" />
          <UserMenu />
        </div>
      </div>
    </div>
  );
}
