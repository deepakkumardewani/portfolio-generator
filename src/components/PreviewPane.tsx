"use client";

import { Suspense, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Minimalist from "@/app/templates/Minimalist/Minimalist";
import Creative from "@/app/templates/Creative/Creative";
import Modern from "@/app/templates/Modern/Modern";
import { useTemplateSync } from "@/hooks/useTemplateSync";
import { useAppSelector } from "@/store";

export default function PreviewPane() {
  const selectedTemplate = useTemplateSync();
  const { viewMode } = useAppSelector((state) => state.portfolio);
  const [loading] = useState(false);

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "Minimalist":
        return <Minimalist />;
      case "Creative":
        return <Creative />;
      case "Modern":
        return <Modern />;
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <Card className="w-full h-full overflow-auto shadow-lg p-4">
        <Skeleton className="w-full h-full" />
      </Card>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        className="w-full h-full flex justify-center overflow-auto shadow-lg"
        id="preview-pane"
      >
        <div
          className={`transition-all duration-200  ${
            viewMode === "mobile" ? "max-w-[375px]" : "w-full"
          }`}
        >
          {renderTemplate()}
        </div>
      </div>
    </Suspense>
  );
}
