import React from "react";

export default function Skeleton() {
  return (
    <div className="container relative w-full max-w-6xl mx-auto mt-8">
      <div className="aspect-video rounded-lg overflow-hidden border border-border/50 shadow-2xl ">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg" />
        <div className="flex items-center justify-center h-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-8 w-full max-w-5xl">
            <div className="col-span-1">
              <div className="space-y-4">
                <div className="h-8 w-24 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
                <div className="h-24 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
                <div className="h-8 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
                <div className="h-8 bg-black/5 dark:bg-white/5" />
              </div>
            </div>
            <div className="col-span-2">
              <div className="h-full bg-black/5 dark:bg-white/5 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg h-48 w-48 blur-[100px] opacity-30" />
      <div className="absolute -top-4 -left-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg h-48 w-48 blur-[100px] opacity-30" />
    </div>
  );
}
