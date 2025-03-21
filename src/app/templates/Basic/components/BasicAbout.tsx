import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { useAppSelector } from "@/store";

function About() {
  const { darkMode } = useDarkMode();
  const { bio } = useAppSelector((state) => state.portfolio);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    const isInPreview = document.getElementById("preview-pane") !== null;
    setIsPreview(isInPreview);
  }, []);

  const darkModeClasses = isPreview
    ? darkMode
      ? "bg-gray-800"
      : "bg-white"
    : "bg-white text-black dark:bg-gray-800 dark:text-white";

  return (
    <section
      id="about"
      className={`w-full ${darkModeClasses} transition-colors duration-300`}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-8 md:px-6 md:py-12">
        <h2
          className={`mb-8 text-center text-2xl font-bold text-stone-900 dark:text-white md:text-3xl`}
        >
          About Me
        </h2>
        <Card
          className={`max-w-2xl bg-stone-100 text-stone-700 dark:bg-gray-800 dark:text-gray-300 p-4 md:p-6 transition-colors duration-300`}
        >
          <p className="text-base">{bio.about}</p>
        </Card>
      </div>
    </section>
  );
}

export default About;
