"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.2),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="text-3xl sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-stone-900 via-stone-700 to-stone-800 dark:from-stone-100 dark:via-stone-300 dark:to-stone-200 opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="text-3xl sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-stone-900 via-stone-700 to-stone-800 dark:from-stone-100 dark:via-stone-300 dark:to-stone-200 leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
