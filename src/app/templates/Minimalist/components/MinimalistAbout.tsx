import React from "react";
import { useAppSelector } from "@/store";

export default function MinimalistAbout() {
  const { bio } = useAppSelector((state) => state.portfolio);

  // Split the about text into paragraphs
  const paragraphs = bio.about
    ? bio.about.split("\n").filter((p) => p.trim())
    : [];

  return (
    <section
      id="about"
      className="py-20 bg-white text-black dark:bg-black dark:text-white"
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      <div className="px-6 max-w-4xl mx-auto">
        <h2
          id="about-heading"
          className="text-2xl font-light mb-8"
          itemProp="headline"
        >
          About
        </h2>
        <div itemProp="text">
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="mb-4 leading-relaxed">
              {bio.about ||
                "Tell your story here. What drives you? What's your background? What are you passionate about?"}
            </p>
          )}
        </div>
        <meta itemProp="author" content={bio.name || "Your Name"} />
      </div>
    </section>
  );
}
