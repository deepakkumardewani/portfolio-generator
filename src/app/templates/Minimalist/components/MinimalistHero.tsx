import React from "react";
import { useAppSelector } from "@/store";
import { Icons } from "@/components/ui/icons";

export default function MinimalistHero() {
  const { bio } = useAppSelector((state) => state.portfolio);

  return (
    <section
      id="home"
      className="py-6 bg-gray-50 dark:bg-black"
      aria-labelledby="hero-heading"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      <div className="px-6 max-w-4xl mx-auto min-h-screen flex flex-col items-center justify-center relative">
        <div className="text-center space-y-4 animate-fade-in mb-20">
          <h1
            id="hero-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 dark:text-white"
            itemProp="headline"
          >
            {bio.name || "Your Name"}
          </h1>
          <p
            className="text-xl md:text-2xl text-gray-600 dark:text-white font-light"
            itemProp="alternativeHeadline"
          >
            {bio.tagline || "Your tagline"}
          </p>
          <meta itemProp="author" content={bio.name || "Your Name"} />
        </div>
        <a
          href="#about"
          className="bottom-8 animate-bounce cursor-pointer"
          aria-label="Scroll to About section"
        >
          <Icons.chevronDown className="w-6 h-6 text-gray-400 dark:text-white" />
        </a>
      </div>
    </section>
  );
  // return (
  //   <section className={`py-20 ${darkModeClasses}`} id="hero">
  //     <div className="max-w-3xl mx-auto">
  //       <h2 className={`text-4xl md:text-5xl font-light tracking-tight mb-6`}>
  //         {bio.name || "Your Name"}
  //       </h2>
  //       <h3 className={`text-xl md:text-2xl font-light mb-8`}>
  //         {bio.tagline || "Your tagline"}
  //       </h3>
  //       <div className="flex space-x-6">
  //         <a
  //           href="#contact"
  //           className={`p-3 border border-black hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200`}
  //         >
  //           Contact Me
  //         </a>
  //         <a
  //           href="#projects"
  //           className={`p-3 hover:text-blackdark:hover:text-white ${darkModeClasses}`}
  //         >
  //           View Projects
  //         </a>
  //       </div>
  //     </div>
  //   </section>
  // );
}
