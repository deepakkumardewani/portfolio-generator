import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useAppSelector } from "@/store";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { DarkModeProvider } from "@/contexts/DarkModeContext";
import { Providers } from "@/app/providers";

// Map section IDs to nav item labels
const sectionToNavItem = {
  hero: "Home",
  about: "About",
  experience: "Experience",
  projects: "Projects",
  skills: "Skills",
  contact: "Contact",
};

interface HeaderProps {
  templateId: string;
}
export default function Header({ templateId }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { viewMode, templateSections } = useAppSelector(
    (state) => state.portfolio
  );

  // Filter navigation items based on visible sections
  const navItems = templateSections.sections
    .filter(
      (section) =>
        section.visible && section.id !== "header" && section.id !== "footer"
    )
    .map(
      (section) => sectionToNavItem[section.id as keyof typeof sectionToNavItem]
    )
    .filter(Boolean); // Remove any undefined values

  useEffect(() => {
    const isInPreview = document.getElementById("preview-pane") !== null;
    setIsPreview(isInPreview);

    // Check if we're in mobile view
    const checkMobile = () => {
      setIsMobile(viewMode === "mobile" || window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);
    setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    // Cleanup
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const darkModeClasses = "bg-white text-black dark:bg-black dark:text-white";

  const previewClasses = isPreview ? "" : "fixed top-0 z-50";
  const mobileMenuButtonClasses = isPreview
    ? isMobile
      ? "block"
      : "hidden"
    : "block sm:hidden ";

  const desktopNavigationClasses = isPreview
    ? isMobile
      ? "hidden"
      : "flex"
    : "hidden md:flex";
  const mobileNavigationClasses = isPreview
    ? isMobile && isOpen
      ? "block"
      : "hidden"
    : "md:hidden";
  const alignClasses = isPreview
    ? isMobile
      ? "justify-start"
      : "justify-center"
    : "justify-start sm:justify-center";

  return (
    <header className={`w-full ${darkModeClasses} ${previewClasses}`}>
      <div className="container mx-auto max-w-7xl px-6 py-4">
        <div className={`flex items-center ${alignClasses}`}>
          {/* Desktop Navigation */}
          <div className={`space-x-8 ${desktopNavigationClasses}`}>
            {navItems.map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-black dark:text-white transition-opacity ease-in duration-300 transform ${
                  isAnimated ? "opacity-100 " : "opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-button"
            className={`text-black dark:text-white cursor-pointer transition-transform duration-300 ease-in-out ${
              isOpen ? "rotate-90" : ""
            } ${mobileMenuButtonClasses}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X
                size={24}
                className="transition-transform duration-300 scale-110"
              />
            ) : (
              <Menu size={24} className="transition-transform duration-300" />
            )}
          </button>
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
        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={`${mobileNavigationClasses} pt-4 pb-6`}
        >
          {navItems.map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`block py-2 text-black dark:text-white hover:text-white transition-all duration-300 transform ${
                isAnimated
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
