"use client";

import { useState, useEffect } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { DeploymentStatus } from "@/utils/exportUtils";
import { cn } from "@/lib/utils";

interface NetlifyDeployDialogProps {
  isOpen: boolean;
  onClose: () => void;
  deploymentStatus: DeploymentStatus;
  deploymentUrl: string;
  deploymentError?: string;
  progress?: number;
}

export default function NetlifyDeployDialog({
  isOpen,
  onClose,
  deploymentStatus,
  deploymentUrl,
  deploymentError,
  progress = 0,
}: NetlifyDeployDialogProps) {
  const [copied, setCopied] = useState(false);

  // Reset copied state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
    }
  }, [isOpen]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(deploymentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  const getStatusMessage = () => {
    switch (deploymentStatus) {
      case "preparing":
        return "Preparing your files for deployment...";
      case "uploading":
        if (progress > 30) {
          return "Creating site on Netlify... (ensuring unique site name)";
        }
        return "Uploading files to Netlify...";
      case "processing":
        return "Processing deployment... This may take a minute.";
      case "success":
        return "Your site is successfully deployed! 🎉";
      case "error":
        return `Deployment failed: ${deploymentError || "Unknown error"}`;
      default:
        return "Initializing deployment...";
    }
  };

  const visitSite = () => {
    window.open(deploymentUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Deploy to Netlify</DialogTitle>
          <DialogDescription>
            {deploymentStatus === "success"
              ? "Your portfolio is now live on Netlify"
              : "Deploying your portfolio to Netlify"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          {/* Progress indicator */}
          {deploymentStatus !== "success" && deploymentStatus !== "error" && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          {/* Status message */}
          <p className="text-sm">{getStatusMessage()}</p>

          {/* Deployed URL */}
          {deploymentStatus === "success" && deploymentUrl && (
            <div className="flex items-center justify-between p-2 border rounded-md bg-slate-50">
              <a
                href={deploymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-600 truncate hover:underline"
              >
                {deploymentUrl}
              </a>
              <button
                onClick={copyToClipboard}
                className={cn(
                  "p-2 rounded-md hover:bg-slate-200 transition-colors",
                  copied ? "text-green-500" : "text-gray-500"
                )}
                aria-label="Copy URL to clipboard"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          {deploymentStatus === "success" ? (
            <>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button onClick={visitSite} className="flex items-center gap-2">
                Visit Site <ExternalLink size={16} />
              </Button>
            </>
          ) : deploymentStatus === "error" ? (
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          ) : (
            <Button onClick={onClose} variant="outline" disabled>
              Deploying...
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
