import React, { useState, useEffect, useRef } from "react";
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
import Logo from "@/components/shared/Logo";
import Deploy from "./Deploy";
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
  const [sectionsPopoverOpen, setSectionsPopoverOpen] = useState(false);
  const [sectionsPopoverOpenMobile, setSectionsPopoverOpenMobile] =
    useState(false);

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

  // const handleCopyDeploymentUrl = () => {
  //   if (deploymentUrl) {
  //     navigator.clipboard.writeText(deploymentUrl);
  //   }
  // };

  const handleSectionsPopoverClose = () => {
    setSectionsPopoverOpen(false);
  };

  const handleSectionsPopoverCloseMobile = () => {
    setSectionsPopoverOpenMobile(false);
  };

  // const { theme } = useTheme();

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 shadow-sm fixed top-0 left-0 right-0 z-10 border-b">
      <div className="mx-auto py-3 px-6">
        {/* Desktop layout (hidden on small screens) */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex-1 flex items-center gap-4">
            <Logo />
          </div>

          <div className="flex-1 flex justify-center">
            <ToggleButtons />
          </div>

          <div className="flex-1 flex justify-end items-center space-x-2">
            <Popover
              open={sectionsPopoverOpen}
              onOpenChange={setSectionsPopoverOpen}
            >
              <TooltipProvider>
                <Tooltip delayDuration={500}>
                  <PopoverTrigger asChild>
                    <TooltipTrigger asChild>
                      <Button variant="outline">
                        <Icons.arrowDownUp className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                  </PopoverTrigger>
                  <TooltipContent>
                    <p>Re-order sections</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <PopoverContent
                className="w-[300px] p-0 dark:bg-stone-800 dark:border-stone-700"
                align="end"
              >
                <TemplateSectionEditor onClose={handleSectionsPopoverClose} />
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Icons.chevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-neutral-50 dark:bg-neutral-950"
                align="end"
              >
                <DropdownMenuItem>
                  <Link href="/templates" className="flex items-center w-full">
                    <Icons.pencil className="h-4 w-4 mr-2" />
                    Change template
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/create" className="flex items-center w-full">
                    <Icons.squarePen className="h-4 w-4 mr-2" />
                    Edit details
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <TooltipProvider>
              <Tooltip delayDuration={500}>
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
              <Deploy
                netlifySiteId={netlifySiteId}
                deploymentUrl={deploymentUrl}
                handleExport={handleExport}
              />
            </div>
            <ThemeToggle size="md" />
            <UserMenu />
          </div>
        </div>

        {/* Mobile layout (hidden on medium and larger screens) */}
        <div className="flex flex-col md:hidden gap-3">
          {/* First row: Heading, Toggle Buttons, Export */}
          <div className="flex justify-between items-center">
            <Logo />

            <div className="flex gap-2 items-center">
              <div className="flex items-center">
                <Deploy
                  netlifySiteId={netlifySiteId}
                  deploymentUrl={deploymentUrl}
                  handleExport={handleExport}
                />
              </div>
            </div>
          </div>

          <div className="h-px bg-stone-200 dark:bg-stone-900" />

          {/* Second row: Edit Info and Change Template buttons */}
          <div className="flex justify-center items-center">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => handleExport("static")}
                className={darkModeClasses.buttonOutline}
              >
                <Icons.download className="h-4 w-4" />
              </Button>

              <Popover
                open={sectionsPopoverOpenMobile}
                onOpenChange={setSectionsPopoverOpenMobile}
              >
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Icons.arrowDownUp className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[400px] p-0 dark:bg-stone-800 dark:border-stone-700"
                  align="end"
                >
                  <TemplateSectionEditor
                    onClose={handleSectionsPopoverCloseMobile}
                  />
                </PopoverContent>
              </Popover>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Icons.chevronDownIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link
                      href="/templates"
                      className="flex items-center w-full"
                    >
                      <Icons.pencil className="h-4 w-4 mr-2" />
                      Change template
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/create" className="flex items-center w-full">
                      <Icons.squarePen className="h-4 w-4 mr-2" />
                      Edit details
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
