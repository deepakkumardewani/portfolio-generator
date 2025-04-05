import React from "react";
import { useAppSelector } from "@/store";
import { Icons } from "@/components/ui/icons";

export default function MinimalistContact() {
  const { contact } = useAppSelector((state) => state.portfolio);

  return (
    <section id="contact" className="py-12 bg-white dark:bg-black">
      <div className="px-6 max-w-4xl mx-auto">
        <h2
          className={`text-2xl font-light mb-8 text-neutral-900 dark:text-neutral-50`}
        >
          Contact
        </h2>
        <div className="space-y-6 max-w-xl">
          {contact.email && (
            <div className="flex items-center">
              <Icons.mail
                size={18}
                className={`mr-4 text-neutral-600 dark:text-neutral-400`}
              />
              <a
                href={`mailto:${contact.email}`}
                className={`text-base text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors`}
              >
                {contact.email}
              </a>
            </div>
          )}

          {contact.phone && (
            <div className="flex items-center">
              <Icons.phone
                size={18}
                className={`mr-4 text-neutral-600 dark:text-neutral-400`}
              />
              <a
                href={`tel:${contact.phone}`}
                className={`text-base text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors`}
              >
                {contact.phone}
              </a>
            </div>
          )}

          {contact.links && contact.links.length > 0 && (
            <div className="space-y-4 mt-6">
              {contact.links.map((link, index) => (
                <div key={index} className="flex items-center">
                  <Icons.externalLink
                    size={18}
                    className={`mr-4 text-neutral-600 dark:text-neutral-400`}
                  />
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-base text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors`}
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
                className={`text-base text-neutral-600 dark:text-neutral-400`}
              >
                Add your contact information to allow visitors to reach out to
                you.
              </div>
            )}
        </div>
      </div>
    </section>
  );
}
