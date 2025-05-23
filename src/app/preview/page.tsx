"use client";

import PreviewPane from "@/components/PreviewPane";
import PreviewHeader from "./components/PreviewHeader";
import LoadingScreen from "@/components/LoadingScreen";
import { useAppSelector } from "@/store";
import { Suspense } from "react";

export default function PreviewPage() {
  const { viewMode } = useAppSelector((state) => state.portfolio);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
        <PreviewHeader />

        {/* Main Content */}
        <div className="pt-32 sm:pt-16 flex-1">
          {viewMode === "desktop" ? (
            /* Desktop Preview */
            <div className="w-full">
              <PreviewPane />
            </div>
          ) : (
            /* Mobile Preview */
            <div className="flex justify-center py-8">
              <div className="relative max-w-[375px] w-full">
                <div className="bg-black rounded-t-full pt-6 px-4 pb-4">
                  <div className="w-1/3 h-1 bg-gray-600 mx-auto rounded-full"></div>
                </div>
                <div className="border-8 border-black h-[650px] overflow-y-hidden">
                  <div className="h-full overflow-y-auto">
                    <PreviewPane />
                  </div>
                </div>
                <div className="bg-black rounded-b-full pb-6 px-4 pt-4"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
}
