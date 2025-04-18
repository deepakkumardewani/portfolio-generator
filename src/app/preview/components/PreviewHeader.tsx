import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Icons } from "@/components/ui/icons";
import { useAppSelector } from "@/store";
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
import ToggleButtons from "./ToggleButtons";
import UserMenu from "@/components/shared/UserMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
export default function PreviewHeader() {
  const { user } = useAuth();
  // const dispatch = useAppDispatch();
  // const { viewMode } = useAppSelector((state) => state.portfolio);
  const [deploymentStatus, setDeploymentStatus] =
    useState<DeploymentStatus>("preparing");
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [deploymentUrl, setDeploymentUrl] = useState("");
  const [deploymentError, setDeploymentError] = useState<string | undefined>(
    undefined
  );
  const [showDeployDialog, setShowDeployDialog] = useState(false);
  const [netlifySiteId, setNetlifySiteId] = useState<string | null>(null);

  const portfolioData = useAppSelector((state) => state.portfolio);

  useEffect(() => {
    const siteId = localStorage.getItem("netlify_portfolio_site_id");
    const siteUrl = localStorage.getItem("netlify_portfolio_site");
    setNetlifySiteId(siteId);
    setDeploymentUrl(siteUrl || "");
  }, [deploymentUrl]);

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
          localStorage.setItem("netlify_portfolio_site", result.url);
          setDeploymentUrl(result.url);

          // Store deployment date for reference in profile page
          if (result.status === "success") {
            localStorage.setItem(
              "netlify_deployment_date",
              new Date().toISOString()
            );
          }
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

  const handleCopyDeploymentUrl = () => {
    if (deploymentUrl) {
      navigator.clipboard.writeText(deploymentUrl);
    }
  };

  const { theme } = useTheme();

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 shadow-sm fixed top-0 left-0 right-0 z-10 border-b">
      <div className="mx-auto py-3 px-4">
        {/* Desktop layout (hidden on small screens) */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex-1 flex items-center gap-4">
            <Link href="/create">
              <Button variant="outline">
                <Icons.arrowLeftIcon className="h-4 w-4" />
                Edit
              </Button>
            </Link>
            <Link href="/" className="transition-transform hover:scale-105">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-stone-900 to-stone-600 dark:from-stone-100 dark:to-stone-300 bg-clip-text text-transparent">
                PortfolioGen
              </h1>
            </Link>
          </div>

          <div className="flex-1 flex justify-center">
            <ToggleButtons />
          </div>

          <div className="flex-1 flex justify-end items-center space-x-2">
            <Link href="/templates">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      <Icons.pencil className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Change template</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
            <Popover>
              <TooltipProvider>
                <Tooltip>
                  <PopoverTrigger asChild>
                    <TooltipTrigger asChild>
                      <Button variant="outline">
                        <Icons.settings className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                  </PopoverTrigger>
                  <TooltipContent>
                    <p>Edit template</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <PopoverContent
                className="w-[300px] p-0 dark:bg-stone-800 dark:border-stone-700"
                align="end"
              >
                <TemplateSectionEditor onClose={() => {}} />
              </PopoverContent>
            </Popover>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => handleExport("static")}
                  >
                    <Icons.download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/* <ShimmerButton
                    className={`shadow-2xl`}
                    shimmerColor="#9E7AFF"
                    background={`${theme === "dark" ? "#000000" : "#ffffff"}`}
                  >
                    <Icons.rocketIcon className="h-4 w-4 mr-2 text-black dark:text-white" />
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-black dark:text-white text-md">
                      Deploy
                    </span>
                  </ShimmerButton> */}
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 cursor-pointer"
                  >
                    <Icons.rocketIcon className="h-4 w-4 mr-2 text-black dark:text-white" />
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-md">
                      Deploy
                    </span>
                  </HoverBorderGradient>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="bg-neutral-50 dark:bg-neutral-950"
                  align="end"
                >
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => handleExport("netlify")}
                  >
                    <Icons.rocketIcon className="h-4 w-4" />
                    Publish
                  </DropdownMenuItem>
                  {netlifySiteId && (
                    <DropdownMenuItem className="cursor-pointer">
                      <Link
                        className="flex items-center justify-between"
                        href={deploymentUrl}
                        target="_blank"
                      >
                        <Icons.externalLinkIcon className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <ThemeToggle size="md" />
            {user && <UserMenu />}
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
            <ToggleButtons />

            <div className="flex gap-2 items-center">
              <div className="flex items-center">
                <ShimmerButton
                  className={`shadow-2xl ${
                    netlifySiteId ? "rounded-r-none border-r-0" : ""
                  }`}
                  shimmerColor="#9E7AFF"
                  background={`${theme === "dark" ? "#000000" : "#ffffff"}`}
                  onClick={() => handleExport("netlify")}
                >
                  <Icons.rocketIcon className="h-4 w-4 text-black dark:text-white" />
                </ShimmerButton>

                {netlifySiteId && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 rounded-l-none border-l-0 px-1"
                      >
                        <Icons.chevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center justify-between">
                        <a
                          href={deploymentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 truncate mr-2 text-xs"
                        >
                          {deploymentUrl}
                        </a>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCopyDeploymentUrl}
                          className="h-5 w-5 p-0"
                        >
                          <Icons.copy className="h-3 w-3" />
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          </div>

          <div className="h-px bg-stone-200 dark:bg-stone-900" />

          {/* Second row: Edit Info and Change Template buttons */}
          <div className="flex justify-between items-center">
            <Link href="/create">
              <Button
                variant="outline"
                size="sm"
                className={darkModeClasses.buttonOutline}
              >
                <Icons.arrowLeftIcon className="mr-2 h-4 w-4" />
                Edit Info
              </Button>
            </Link>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => handleExport("static")}
                className={darkModeClasses.buttonOutline}
              >
                <Icons.download className="h-4 w-4" />
              </Button>
              <Link href="/templates">
                <Button variant="outline">
                  <Icons.pencil className="h-4 w-4" />
                </Button>
              </Link>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Icons.settings className="h-4 w-4" />
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
