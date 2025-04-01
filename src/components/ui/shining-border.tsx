"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const ShiningBorder = ({
  children,
  className,
  containerClassName,
  borderClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setPosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative group", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition duration-500",
          borderClassName
        )}
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${position.x * 100}% ${
                position.y * 100
              }%, rgba(120, 100, 255, 0.2) 0%, transparent 50%)`
            : "",
        }}
      />

      <div
        className={cn(
          "absolute -inset-0.5 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-75 transition duration-1000 group-hover:blur-sm",
          borderClassName
        )}
      />
      <div className={cn("relative rounded-lg", className)}>{children}</div>
    </div>
  );
};
