"use client";
import React from "react";
// import { Bio } from "@/types";
// import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { useAppSelector } from "@/store";

function Hero() {
  const { darkMode } = useDarkMode();
  const { bio } = useAppSelector((state) => state.portfolio);
  return (
    <section
      className={`relative w-full ${
        darkMode ? "bg-gray-900" : "bg-white"
      } transition-colors duration-300`}
      id="home"
    >
      <div className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-4 py-16 md:px-6 md:py-24">
        <div className="text-center">
          <p
            className={`mb-2 text-sm font-medium uppercase tracking-wider ${
              darkMode ? "text-gray-400" : "text-stone-500"
            } md:text-base`}
          >
            Hello, I'm
          </p>
          <h1
            className={`text-4xl font-bold ${
              darkMode ? "text-white" : "text-stone-900"
            } md:text-6xl`}
          >
            {bio.name}
          </h1>
          <p
            className={`mt-4 text-lg ${
              darkMode ? "text-gray-300" : "text-stone-600"
            } md:text-xl`}
          >
            {bio.tagline}
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div
          className={`animate-bounce ${
            darkMode ? "text-gray-500" : "text-stone-400"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Hero;
