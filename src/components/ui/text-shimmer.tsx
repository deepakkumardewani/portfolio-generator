"use client";

import { cn } from "@/lib/utils";

export const TextShimmer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-primary/80 via-secondary/90 to-primary/80 bg-clip-text text-transparent animate-text-shimmer bg-[length:200%_auto]",
        className
      )}
    >
      {children}
    </div>
  );
};
