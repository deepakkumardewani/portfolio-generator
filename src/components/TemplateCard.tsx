import Image from "next/image";
import { useRouter } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/store";
import { TemplateType } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { useState, lazy, Suspense, createContext } from "react";
import { cn } from "@/lib/utils";
import { useUpdateTemplate } from "@/hooks/useTemplateSync";
import ModernHero from "@/app/templates/Modern/components/ModernHero";

// Dynamically import hero components
const MinimalistHero = lazy(
  () => import("@/app/templates/Minimalist/components/MinimalistHero")
);
const CreativeHero = lazy(
  () => import("@/app/templates/Creative/components/CreativeHero")
);

interface TemplateCardProps {
  name: TemplateType;
  description: string;
  supportsDarkMode: boolean;
}

export default function TemplateCard({
  name,
  description,
  supportsDarkMode,
}: TemplateCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const updateTemplate = useUpdateTemplate();

  const handleSelectTemplate = () => {
    updateTemplate(name);
    // Navigate to preview page with template query parameter
    router.push(`/preview?template=${name}`);
  };

  // Function to render the appropriate hero component based on template name
  const renderHeroComponent = () => {
    switch (name) {
      case "Minimalist":
        return <MinimalistHero />;
      case "Creative":
        return <CreativeHero />;
      case "Modern":
        return <ModernHero />;
      default:
        return null;
    }
  };

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-md border-2 bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800",
        isHovered
          ? "border-neutral-300 dark:border-neutral-700"
          : "border-transparent"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <p className="text-sm text-muted-foreground">
                Loading template...
              </p>
            </div>
          }
        >
          {name === "Minimalist" || name === "Creative" || name === "Modern" ? (
            <div className="h-full w-full overflow-hidden">
              <div className="transform scale-[0.25] origin-top-left h-[400%] w-[400%]">
                {renderHeroComponent()}
              </div>
            </div>
          ) : (
            renderHeroComponent()
          )}
        </Suspense>
        <div className="absolute top-2 right-2 flex space-x-1 bg-white/80 dark:bg-black/80 rounded-full p-1.5">
          <Icons.sun size={16} className="text-amber-500" />
          {supportsDarkMode && (
            <Icons.moon size={16} className="text-indigo-700" />
          )}
        </div>
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSelectTemplate}
          className="w-full"
          variant={isHovered ? "default" : "outline"}
        >
          {isHovered && <Icons.checkIcon className="mr-2 h-4 w-4" />}
          Select Template
        </Button>
      </CardFooter>
    </Card>
  );
}
