import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useAppSelector } from "@/store";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useDarkMode } from "@/contexts/DarkModeContext";

const navItems = [
  "Home",
  "About",
  "Experience",
  "Projects",
  "Skills",
  "Contact",
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { viewMode } = useAppSelector((state) => state.portfolio);

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

  const darkModeClasses = isPreview
    ? darkMode
      ? "bg-gray-800"
      : "bg-white"
    : "bg-white text-black dark:bg-gray-800 dark:text-white";

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
      ? "block opacity-100"
      : "hidden opacity-0"
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
              className={`block py-2 text-gray-300 hover:text-white`}
              style={{
                animation: `slideIn 0.3s ease forwards`,
              }}
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
