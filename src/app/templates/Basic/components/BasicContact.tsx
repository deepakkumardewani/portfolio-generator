import React from "react";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { useAppSelector } from "@/store";

function ContactSection() {
  const { darkMode } = useDarkMode();
  const { contact } = useAppSelector((state) => state.portfolio);
  const { viewMode } = useAppSelector((state) => state.portfolio);
  const isMobile = viewMode === "mobile";
  return (
    <section
      id="contact"
      className={`w-full ${darkMode ? "bg-gray-900" : "bg-[#F2F2F2]"} py-16 ${
        isMobile ? "px-4" : "py-30 px-4 md:px-16 lg:px-64"
      } transition-colors duration-300`}
    >
      <div className="mx-auto max-w-7xl space-y-25">
        <div className="space-y-12">
          <div className="flex items-center gap-5">
            <div
              className={`h-px flex-1 ${
                darkMode ? "bg-gray-300" : "bg-[#1F1F1F]"
              }`}
            />
            <h2
              className={`${
                isMobile ? "text-[28px]" : "text-[36px]"
              } font-normal ${darkMode ? "text-white" : "text-[#1F1F1F]"}`}
            >
              Contact
            </h2>
            <div
              className={`h-px flex-1 ${
                darkMode ? "bg-gray-300" : "bg-[#1F1F1F]"
              }`}
            />
          </div>

          <div className={`space-y-${isMobile ? "4" : "6"}`}>
            <div className="space-y-2">
              <h3
                className={`${isMobile ? "text-lg" : "text-xl"} font-medium ${
                  darkMode ? "text-white" : "text-[#1F1F1F]"
                }`}
              >
                Get in touch
              </h3>
              <p
                className={`${
                  isMobile ? "text-sm" : "text-base"
                } leading-[1.7] ${
                  darkMode ? "text-gray-300" : "text-[#1F1F1F]"
                }`}
              >
                Feel free to reach out to me through any of the following
                channels:
              </p>
            </div>

            <div className={`space-y-${isMobile ? "2" : "4"}`}>
              <div
                className={`${isMobile ? "text-sm" : "text-base"} ${
                  darkMode ? "text-gray-300" : "text-[#1F1F1F]"
                }`}
              >
                <span className="font-medium">Email:</span> {contact.email}
              </div>
              {contact.phone && (
                <div
                  className={`${isMobile ? "text-sm" : "text-base"} ${
                    darkMode ? "text-gray-300" : "text-[#1F1F1F]"
                  }`}
                >
                  <span className="font-medium">Phone:</span> {contact.phone}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              {contact.links.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`${isMobile ? "text-xs py-1 px-2" : ""} ${
                    darkMode
                      ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                      : "border-gray-300 text-[#1F1F1F] hover:bg-gray-100"
                  }`}
                  asChild
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
