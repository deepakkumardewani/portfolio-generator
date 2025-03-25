"use client";

import React from "react";
import { useAppSelector } from "@/store";
import { motion } from "framer-motion";
import { MailIcon, PhoneIcon } from "lucide-react";
import {
  SiGithub,
  SiX,
  SiInstagram,
  SiFacebook,
} from "@icons-pack/react-simple-icons";
import { FaLinkedin } from "react-icons/fa";

export default function ModernContact() {
  const { contact } = useAppSelector((state) => state.portfolio);

  // Function to detect social media links and return the appropriate icon
  const getSocialIcon = (url: string) => {
    const lowerCaseUrl = url.toLowerCase();

    if (lowerCaseUrl.includes("linkedin")) {
      return <FaLinkedin className="h-5 w-5" />;
    } else if (lowerCaseUrl.includes("github")) {
      return <SiGithub className="h-5 w-5" />;
    } else if (lowerCaseUrl.includes("twitter")) {
      return <SiX className="h-5 w-5" />;
    } else if (lowerCaseUrl.includes("instagram")) {
      return <SiInstagram className="h-5 w-5" />;
    } else if (lowerCaseUrl.includes("facebook")) {
      return <SiFacebook className="h-5 w-5" />;
    } else {
      // Default icon for other links
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656l-1.1 1.1"
          />
        </svg>
      );
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative">
      {/* Subtle background with glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-zinc-900 opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-zinc-900/0 to-zinc-950/0"></div>

      <div className="container mx-auto max-w-4xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              Get In Touch
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-blue-500 rounded"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-zinc-300 mb-8">
              I'm always open to discussing new projects, creative ideas or
              opportunities to be part of your vision.
            </p>

            <div className="space-y-6">
              {contact.email && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-900/20 border border-purple-500/20 text-purple-400">
                    <MailIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">Email</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-zinc-200 hover:text-purple-400 transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
              )}

              {contact.phone && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-900/20 border border-blue-500/20 text-blue-400">
                    <PhoneIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">Phone</p>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-zinc-200 hover:text-blue-400 transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-zinc-100 mb-6">
              Connect With Me
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {contact.links.length > 0 ? (
                contact.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-zinc-800/50 border border-zinc-700 rounded-lg hover:bg-zinc-800 transition-colors group"
                  >
                    <div className="text-zinc-400 group-hover:text-zinc-100 transition-colors">
                      {getSocialIcon(link.url)}
                    </div>
                    <span className="text-zinc-300 group-hover:text-zinc-100 transition-colors truncate">
                      {link.label}
                    </span>
                  </a>
                ))
              ) : (
                <div className="col-span-2 text-center py-8 text-zinc-500">
                  No social links added
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
