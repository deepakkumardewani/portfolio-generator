import React from "react";
import { useAppSelector } from "@/store";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { Mail, Phone, ExternalLink } from "lucide-react";

export default function MinimalistContact() {
  const { contact } = useAppSelector((state) => state.portfolio);
  const { darkMode } = useDarkMode();

  return (
    <section
      id="contact"
      className="px-6 py-12 max-w-4xl mx-auto bg-white dark:bg-black"
    >
      <h2
        className={`text-2xl font-light mb-8 ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        Contact
      </h2>
      <div className="space-y-6 max-w-xl">
        {contact.email && (
          <div className="flex items-center">
            <Mail
              size={18}
              className={`mr-4 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}
            />
            <a
              href={`mailto:${contact.email}`}
              className={`text-base ${
                darkMode
                  ? "text-zinc-300 hover:text-white"
                  : "text-zinc-700 hover:text-black"
              } transition-colors`}
            >
              {contact.email}
            </a>
          </div>
        )}

        {contact.phone && (
          <div className="flex items-center">
            <Phone
              size={18}
              className={`mr-4 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}
            />
            <a
              href={`tel:${contact.phone}`}
              className={`text-base ${
                darkMode
                  ? "text-zinc-300 hover:text-white"
                  : "text-zinc-700 hover:text-black"
              } transition-colors`}
            >
              {contact.phone}
            </a>
          </div>
        )}

        {contact.links && contact.links.length > 0 && (
          <div className="space-y-4 mt-6">
            {contact.links.map((link, index) => (
              <div key={index} className="flex items-center">
                <ExternalLink
                  size={18}
                  className={`mr-4 ${
                    darkMode ? "text-zinc-400" : "text-zinc-500"
                  }`}
                />
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-base ${
                    darkMode
                      ? "text-zinc-300 hover:text-white"
                      : "text-zinc-700 hover:text-black"
                  } transition-colors`}
                >
                  {link.label}
                </a>
              </div>
            ))}
          </div>
        )}

        {!contact.email &&
          !contact.phone &&
          (!contact.links || contact.links.length === 0) && (
            <div
              className={`text-base ${
                darkMode ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              Add your contact information to allow visitors to reach out to
              you.
            </div>
          )}
      </div>
    </section>
  );
}
