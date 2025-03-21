"use client";

import PreviewPane from "@/components/PreviewPane";
import PreviewHeader from "./components/PreviewHeader";
import { useAppSelector } from "@/store";

export default function PreviewPage() {
  const { viewMode } = useAppSelector((state) => state.portfolio);

  return (
    <div className="flex flex-col h-screen">
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

      {/* Right side panel - commented out for now */}
      {/* <div className="fixed right-0 top-16 bottom-0 w-72 bg-white border-l p-4 overflow-y-auto">
        <ThemeSelector />
      </div> */}
    </div>
  );
}
