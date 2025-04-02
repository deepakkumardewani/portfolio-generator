"use client";

import React from "react";
import { useAppSelector } from "@/store";
import { Icons } from "@/components/ui/icons";

export default function ModernFooter() {
  const { bio } = useAppSelector((state) => state.portfolio);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 px-4 border-t border-zinc-800 relative">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-zinc-400 text-sm">
              © {currentYear} {bio.name || "Your Name"}. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-zinc-500 text-sm">
              Built with passion and precision
            </p>

            <a
              href="#hero"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors border border-zinc-800"
              aria-label="Back to top"
            >
              <Icons.arrowUpIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
