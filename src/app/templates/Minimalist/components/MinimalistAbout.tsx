import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store";
import { useDarkMode } from "@/contexts/DarkModeContext";

export default function MinimalistAbout() {
  const { bio } = useAppSelector((state) => state.portfolio);
  const [isPreview, setIsPreview] = useState(false);
  // const { darkMode } = useDarkMode();
  useEffect(() => {
    const isInPreview = document.getElementById("preview-pane") !== null;
    setIsPreview(isInPreview);
  }, []);
  // Split the about text into paragraphs
  // const paragraphs = bio.about
  //   ? bio.about.split("\n").filter((p) => p.trim())
  //   : [];

  const darkModeClasses = "bg-white text-black dark:bg-black dark:text-white";
  return (
    <section id="about" className={`py-20 ${darkModeClasses}`}>
      <div className="px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-light mb-8">About</h2>
        <p className=" leading-relaxed">{bio.about}</p>
      </div>
    </section>
  );
  // return (
  //   <section id="about">
  //     <h2 className={`text-2xl font-light mb-8 ${darkModeClasses}`}>About</h2>
  //     <div className={`max-w-3xl`}>
  //       {paragraphs.length > 0 ? (
  //         paragraphs.map((paragraph, index) => (
  //           <p key={index} className="mb-4 leading-relaxed text-base">
  //             {paragraph}
  //           </p>
  //         ))
  //       ) : (
  //         <p className="mb-4 leading-relaxed text-base">
  //           Tell your story here. What drives you? What's your background? What
  //           are you passionate about?
  //         </p>
  //       )}
  //     </div>
  //   </section>
  // );
}
