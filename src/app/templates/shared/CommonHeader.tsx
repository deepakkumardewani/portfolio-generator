import { useState, useEffect } from "react";
import { Icons } from "@/components/ui/icons";
import { useAppSelector } from "@/store";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { motion } from "framer-motion";

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
  const { viewMode, templateSections, bio } = useAppSelector(
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
    : "justify-center sm:justify-center";

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
                className={`nav-link text-black dark:text-white transition-opacity ease-in duration-300 transform ${
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
              <Icons.x
                size={24}
                className="transition-transform duration-300 scale-110"
              />
            ) : (
              <Icons.menu
                size={24}
                className="transition-transform duration-300"
              />
            )}
          </button>

          {/* Resume Button and Dark Mode Toggle */}
          <div className="flex items-center justify-end ml-auto space-x-4">
            {bio.resumeUrl && (
              <motion.div
                id="resume-button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`flex items-center space-x-2 text-sm font-medium px-4 py-2 rounded-md bg-white dark:bg-neutral-950 hover:bg-neutral-300 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 transition-colors duration-300`}
                style={{ transitionDelay: "100ms" }}
              >
                <a href={bio.resumeUrl} target="_blank">
                  Resume
                </a>
                <Icons.externalLink className="h-4 w-4" />
              </motion.div>
            )}
            {!isPreview && <ThemeToggle size="md" />}
          </div>
        </div>
        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={`${mobileNavigationClasses} pt-4 pb-6`}
        >
          {navItems.map((item) => (
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
