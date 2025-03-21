import React, { useState } from "react";
import { useAppSelector } from "@/store";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function MinimalistHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { viewMode } = useAppSelector((state) => state.portfolio);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const menuItems = [
    "Home",
    "About",
    "Experience",
    "Projects",
    "Skills",
    "Contact",
  ];

  const isMobileView = viewMode === "mobile";

  return (
    <header
      className={`w-full ${
        darkMode ? "bg-black text-white" : "bg-white text-stone-900"
      } z-0 shadow-sm transition-colors duration-200`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 md:px-6">
        {/* Mobile Menu Button - Only visible on mobile */}
        {isMobileView && (
          <div className="ml-2">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "h-10 w-10 p-0 justify-center",
                      darkMode
                        ? "bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white"
                        : "bg-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                    )}
                    onClick={toggleMobileMenu}
                  >
                    <span className="sr-only">Menu</span>
                    <Menu size={20} />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent
                    className={cn(darkMode ? "bg-gray-800" : "bg-white")}
                  >
                    <ul className="flex flex-col p-2">
                      {menuItems.map((item) => (
                        <li key={item} className="py-1">
                          <NavigationMenuLink
                            asChild
                            className={cn(
                              "block w-full p-2 text-sm font-medium rounded-md",
                              darkMode
                                ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                            )}
                          >
                            <a
                              href={`#${item.toLowerCase()}`}
                              aria-label={`Navigate to ${item} section`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item}
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}
        <div className="flex-1"></div>

        {!isMobileView && (
          <div className="flex-1">
            {/* Desktop Navigation */}
            <nav>
              <ul className="flex space-x-8">
                {menuItems.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className={`text-sm font-medium ${
                        darkMode
                          ? "text-gray-300 hover:text-white"
                          : "text-stone-600 hover:text-stone-900"
                      } transition-colors`}
                      aria-label={`Navigate to ${item} section`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}

        {/* Dark Mode Toggle */}
        <div className="flex flex-1 items-center justify-end ml-4">
          <ThemeToggle
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            size="md"
            className={darkMode ? "hover:bg-gray-700" : "hover:bg-stone-100"}
          />
        </div>
      </div>
    </header>
  );
}
