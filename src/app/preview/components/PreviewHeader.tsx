import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Monitor,
  Smartphone,
  ArrowLeft,
  Download,
  RocketIcon,
  Settings,
} from "lucide-react";
import { useAppDispatch, useAppSelector, setViewMode } from "@/store";
import {
  exportToStatic,
  deployToNetlify,
  DeploymentStatus,
  convertStateToExportData,
} from "@/utils/exportUtils";
import NetlifyDeployDialog from "@/components/NetlifyDeployDialog";
import TemplateSectionEditor from "@/components/TemplateSectionEditor";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { darkModeClasses } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { useTheme } from "next-themes";

export default function PreviewHeader() {
  const dispatch = useAppDispatch();
  const { viewMode } = useAppSelector((state) => state.portfolio);
  const [deploymentStatus, setDeploymentStatus] =
    useState<DeploymentStatus>("preparing");
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [deploymentUrl, setDeploymentUrl] = useState("");
  const [deploymentError, setDeploymentError] = useState<string | undefined>(
    undefined
  );
  const [showDeployDialog, setShowDeployDialog] = useState(false);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);

  const portfolioData = useAppSelector((state) => state.portfolio);
  const handleExport = async (type: "static" | "netlify") => {
    try {
      if (type === "static") {
        // Convert portfolio state to export format
        const exportData = convertStateToExportData(portfolioData);
        await exportToStatic(exportData);
      } else if (type === "netlify") {
        // Reset deployment state
        setDeploymentStatus("preparing");
        setDeploymentProgress(0);
        setDeploymentUrl("");
        setDeploymentError(undefined);

        // Show the deployment dialog
        setShowDeployDialog(true);

        // Define a progress callback to update the UI
        const progressCallback = (
          status: DeploymentStatus,
          progress?: number
        ) => {
          setDeploymentStatus(status);
          if (progress !== undefined) {
            setDeploymentProgress(progress);
          }
        };

        // Convert portfolio state to export format
        const exportData = convertStateToExportData(portfolioData);

        // Deploy to Netlify
        const result = await deployToNetlify(exportData, progressCallback);

        // Update state with deployment result
        setDeploymentStatus(result.status);
        if (result.url) {
          setDeploymentUrl(result.url);
        }
        if (result.error) {
          setDeploymentError(result.error);
        }
      }
    } catch (error) {
      console.error("Export error:", error);
      if (type === "netlify") {
        setDeploymentStatus("error");
        setDeploymentError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } else {
        alert("Failed to export. Please try again.");
      }
    }
  };

  const closeDeployDialog = () => {
    setShowDeployDialog(false);
  };

  const { theme } = useTheme();

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 shadow-sm fixed top-0 left-0 right-0 z-10 border-b">
      <div className="mx-auto py-3 px-4">
        {/* Desktop layout (hidden on small screens) */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex-1">
            <Link href="/" className="transition-transform hover:scale-105">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-stone-900 to-stone-600 dark:from-stone-100 dark:to-stone-300 bg-clip-text text-transparent">
                PortfolioGen
              </h1>
            </Link>
          </div>

          <div className="flex-1 flex justify-center">
            {/* Device Toggle Buttons */}
            <div className="flex border rounded-md overflow-hidden">
              <Button
                variant={viewMode === "desktop" ? "default" : "ghost"}
                className={`rounded-none px-3 py-2 h-9 ${
                  viewMode === "desktop"
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-white dark:bg-stone-950 dark:text-stone-300 dark:hover:bg-stone-800"
                }`}
                onClick={() => dispatch(setViewMode("desktop"))}
              >
                <Monitor size={18} />
              </Button>
              <Button
                variant={viewMode === "mobile" ? "default" : "ghost"}
                className={`rounded-none px-3 py-2 h-9 ${
                  viewMode === "mobile"
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-white dark:bg-stone-950 dark:text-stone-300 dark:hover:bg-stone-800"
                }`}
                onClick={() => dispatch(setViewMode("mobile"))}
              >
                <Smartphone size={18} />
              </Button>
            </div>
          </div>

          <div className="flex-1 flex justify-end items-center space-x-4">
            <Link href="/create">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Edit Info
              </Button>
            </Link>
            <Link href="/templates">
              <Button variant="outline">Change Template</Button>
            </Link>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Template
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[400px] p-0 dark:bg-stone-800 dark:border-stone-700"
                align="end"
              >
                <TemplateSectionEditor onClose={() => {}} />
              </PopoverContent>
            </Popover>
            <Button variant="outline" onClick={() => handleExport("static")}>
              <Download className="h-4 w-4" />
            </Button>
            <ShimmerButton
              className="shadow-2xl"
              shimmerColor="#9E7AFF"
              background={`${theme === "dark" ? "#000000" : "#ffffff"}`}
            >
              <RocketIcon className="h-4 w-4 mr-2 text-black dark:text-white" />
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-black dark:text-white text-md">
                Deploy
              </span>
            </ShimmerButton>
            {/* <Button
              variant="outline"
              className="bg-purple-600 text-white hover:bg-purple-700"
              onClick={() => handleExport("netlify")}
            >
              <RocketIcon className="h-4 w-4" />
              Deploy
            </Button> */}

            <ThemeToggle size="md" />
          </div>
        </div>

        {/* Mobile layout (hidden on medium and larger screens) */}
        <div className="flex flex-col md:hidden gap-3">
          {/* First row: Heading, Toggle Buttons, Export */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold dark:text-stone-100">
                Portfolio AI
              </h1>
            </div>

            {/* Device Toggle Buttons */}
            <div className="flex border rounded-md overflow-hidden dark:border-stone-700">
              <Button
                variant={viewMode === "desktop" ? "default" : "ghost"}
                className={`rounded-none px-3 py-2 h-9 ${
                  viewMode === "desktop"
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-white dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800"
                }`}
                onClick={() => dispatch(setViewMode("desktop"))}
              >
                <Monitor size={18} />
              </Button>
              <Button
                variant={viewMode === "mobile" ? "default" : "ghost"}
                className={`rounded-none px-3 py-2 h-9 ${
                  viewMode === "mobile"
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-white dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800"
                }`}
                onClick={() => dispatch(setViewMode("mobile"))}
              >
                <Smartphone size={18} />
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleExport("static")}
                className={darkModeClasses.buttonOutline}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="bg-purple-600 text-white hover:bg-purple-700"
                onClick={() => handleExport("netlify")}
              >
                <RocketIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Second row: Edit Info and Change Template buttons */}
          <div className="flex justify-between items-center">
            <Link href="/create">
              <Button
                variant="outline"
                size="sm"
                className={darkModeClasses.buttonOutline}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Edit Info
              </Button>
            </Link>
            <div className="flex space-x-2">
              <Link href="/templates">
                <Button
                  variant="outline"
                  size="sm"
                  className={darkModeClasses.buttonOutline}
                >
                  Change Template
                </Button>
              </Link>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={darkModeClasses.buttonOutline}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[400px] p-0 dark:bg-stone-800 dark:border-stone-700"
                  align="end"
                >
                  <TemplateSectionEditor onClose={() => {}} />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      <NetlifyDeployDialog
        isOpen={showDeployDialog}
        onClose={closeDeployDialog}
        deploymentStatus={deploymentStatus}
        deploymentUrl={deploymentUrl}
        deploymentError={deploymentError}
        progress={deploymentProgress}
      />
    </div>
  );
}
