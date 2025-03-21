import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  variant?: "icon" | "button";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ThemeToggle({
  darkMode,
  toggleDarkMode,
  variant = "icon",
  size = "md",
  className,
}: ThemeToggleProps) {
  const sizeClasses = {
    sm: { icon: 16, button: "h-8 w-8" },
    md: { icon: 18, button: "h-10 w-10" },
    lg: { icon: 20, button: "h-12 w-12" },
  };

  const iconSize = sizeClasses[size].icon;
  const buttonSize = sizeClasses[size].button;

  if (variant === "icon") {
    return (
      <Button
        id="dark-mode-toggle"
        variant="ghost"
        size="icon"
        onClick={toggleDarkMode}
        className={cn(
          buttonSize,
          "rounded-full transition-colors",
          darkMode
            ? "text-yellow-300 hover:bg-gray-800"
            : "text-gray-600 hover:bg-gray-100",
          className
        )}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          <Sun size={iconSize} className="text-yellow-300" />
        ) : (
          <Moon size={iconSize} />
        )}
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      onClick={toggleDarkMode}
      className={cn(
        "flex items-center gap-2 transition-colors",
        darkMode
          ? "text-gray-300 hover:text-white hover:bg-gray-800"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
        className
      )}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span>
        {darkMode ? (
          <Sun size={iconSize} className="text-yellow-300" />
        ) : (
          <Moon size={iconSize} />
        )}
      </span>
      {darkMode ? "Light Mode" : "Dark Mode"}
    </Button>
  );
}
