import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface AnimatedTextProps {
  text: string;
  shouldAnimate?: boolean;
}

export function AnimatedText({
  text,
  shouldAnimate = true,
}: AnimatedTextProps) {
  const [hasAnimated, setHasAnimated] = useState(false);

  // Reset hasAnimated when text changes
  useEffect(() => {
    setHasAnimated(false);
  }, [text]);

  // Determine if we should animate based on props and internal state
  const animate = shouldAnimate && !hasAnimated;

  // Mark as animated after a small delay
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(
        () => setHasAnimated(true),
        text.split(" ").length * 10 + 100
      );
      return () => clearTimeout(timer);
    }
  }, [animate, text]);

  return (
    <div>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={animate ? { opacity: 0, y: 5 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={animate ? { delay: i * 0.01 } : { delay: 0 }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </div>
  );
}
