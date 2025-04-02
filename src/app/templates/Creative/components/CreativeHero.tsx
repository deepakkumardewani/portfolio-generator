import React, { useEffect, useState } from "react";
import { Icons } from "@/components/ui/icons";
import { useAppSelector } from "@/store";

export default function Hero() {
  const { bio } = useAppSelector((state) => state.portfolio);
  const [isAnimated, setIsAnimated] = useState(false);
  useEffect(() => {
    // Trigger animations on page load
    setTimeout(() => {
      setIsAnimated(true);
    }, 100);
  }, []);

  return (
    <section
      id="home"
      className="py-12 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black"
    >
      <div className="container mx-auto px-6">
        <div
          className={`text-center transition-all duration-800 transform ${
            isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h1
            className={`text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent transition-all duration-800 delay-200 transform ${
              isAnimated
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            {bio.name}
          </h1>
          <p
            className={`text-xl md:text-2xl dark:text-gray-400 text-black mb-8 transition-all duration-800 delay-400 transform ${
              isAnimated
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            {bio.tagline}
          </p>
          <div
            className={`flex justify-center space-x-6 transition-all duration-800 delay-600 transform ${
              isAnimated
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            <a
              href="#"
              className="dark:text-gray-400 text-black hover:text-white transition-colors"
            >
              <Icons.gitHub size={24} />
            </a>
            <a
              href="#"
              className="dark:text-gray-400 text-black hover:text-white transition-colors"
            >
              <Icons.linkedin size={24} />
            </a>
            <a
              href="#"
              className="dark:text-gray-400 text-black hover:text-white transition-colors"
            >
              <Icons.mail size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
