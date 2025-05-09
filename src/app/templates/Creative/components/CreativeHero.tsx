"use client";
import React from "react";
import { Icons } from "@/components/ui/icons";
import { useAppSelector } from "@/store";
import { motion } from "framer-motion";

export default function CreativeHero() {
  const { bio, contact } = useAppSelector((state) => state.portfolio);

  return (
    <section
      id="hero"
      className="py-12 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black"
      aria-labelledby="hero-heading"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      <div className="container mx-auto px-6">
        <motion.div
          id="creative-hero-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            id="creative-hero-profile-img"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mx-auto mb-8 relative w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full"
          >
            {bio.profileImg ? (
              <img
                src={bio.profileImg}
                alt={bio.name || "Profile"}
                sizes="(max-width: 768px) 8rem, 10rem"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white text-3xl font-bold">
                <Icons.user className="w-12 h-12" />
              </div>
            )}
          </motion.div>
          <motion.h1
            id="creative-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
            itemProp="headline"
          >
            {bio.name || "Your Name"}
          </motion.h1>
          <motion.p
            id="creative-hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl dark:text-gray-400 text-black mb-8"
            itemProp="alternativeHeadline"
          >
            {bio.tagline || "Your tagline"}
          </motion.p>
          <meta itemProp="author" content={bio.name || "Your Name"} />
          <motion.div
            id="creative-hero-social"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center space-x-6"
          >
            {contact?.links &&
              contact.links.map((link, index) => {
                if (!link?.url) return null;

                if (link.url.toLowerCase().includes("github")) {
                  return (
                    <a
                      key={index}
                      href={link.url}
                      className="dark:text-gray-400 text-black hover:text-white transition-colors"
                      aria-label="GitHub Profile"
                      rel="noopener"
                    >
                      <Icons.gitHub size={24} />
                    </a>
                  );
                } else if (link.url.toLowerCase().includes("linkedin")) {
                  return (
                    <a
                      key={index}
                      href={link.url}
                      className="dark:text-gray-400 text-black hover:text-white transition-colors"
                      aria-label="LinkedIn Profile"
                      rel="noopener"
                    >
                      <Icons.linkedin size={24} />
                    </a>
                  );
                }
                return null;
              })}

            {contact?.email && (
              <a
                href={`mailto:${contact.email}`}
                className="dark:text-gray-400 text-black hover:text-white transition-colors"
                aria-label="Email Contact"
                rel="noopener"
              >
                <Icons.mail size={24} />
              </a>
            )}
          </motion.div>
          <motion.div
            id="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            className="mt-12"
          >
            <a
              href="#about"
              aria-label="Scroll to About section"
              className="inline-block"
            >
              <Icons.chevronDown className="w-8 h-8 text-black dark:text-gray-400 animate-bounce" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
