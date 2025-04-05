"use client";
import React from "react";
import { Icons } from "@/components/ui/icons";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { motion } from "framer-motion";

export default function CreativeContact() {
  const [isPreview, setIsPreview] = React.useState(false);
  const { darkMode } = useDarkMode();

  React.useEffect(() => {
    const isInPreview = document.getElementById("preview-pane") !== null;
    setIsPreview(isInPreview);
  }, []);

  const darkModeClasses = isPreview
    ? darkMode
      ? "bg-black/10"
      : "bg-white"
    : "bg-white text-black dark:bg-black/10 dark:text-white";

  return (
    <section id="contact" className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          id="creative-contact-container"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h2
            id="creative-contact-heading"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Get in Touch
          </motion.h2>
          <motion.p
            id="creative-contact-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-black dark:text-white text-lg mb-8"
          >
            I am always open to new opportunities and interesting projects. Feel
            free to reach out!
          </motion.p>
          <motion.div
            id="creative-contact-links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center space-x-8"
          >
            <a
              href="mailto:your.email@example.com"
              className="flex items-center space-x-2 text-black dark:text-white hover:text-white transition-colors hover:scale-110 duration-300"
            >
              <Icons.mail size={24} />
              <span>Email</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-black dark:text-white hover:text-white transition-colors hover:scale-110 duration-300"
            >
              <Icons.linkedin size={24} />
              <span>LinkedIn</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-black dark:text-white hover:text-white transition-colors hover:scale-110 duration-300"
            >
              <Icons.gitHub size={24} />
              <span>GitHub</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
