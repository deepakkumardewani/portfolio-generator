import React from "react";
import { useAppSelector } from "@/store";
import { useDarkMode } from "@/contexts/DarkModeContext";

export default function MinimalistFooter() {
  const { bio } = useAppSelector((state) => state.portfolio);
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`w-full min-h-24 dark:bg-black dark:text-gray-300 bg-white text-gray-600 transition-colors duration-300`}
    >
      <div className="mx-auto max-w-7xl flex flex-col justify-center items-center gap-2 px-4 py-4 md:px-6 md:py-6">
        <div className="text-sm text-center">
          © {currentYear} {bio.name}. All rights reserved.
        </div>
        <div className="text-sm text-center">
          Designed and Coded with <span className="text-red-500">❤</span> by{" "}
          {bio.name}
        </div>
      </div>
    </footer>
  );
}
