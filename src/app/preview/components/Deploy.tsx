import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import React from "react";

interface DeployProps {
  netlifySiteId: string | null;
  deploymentUrl: string;
  handleExport: (type: "static" | "netlify") => void;
}
export default function Deploy({
  netlifySiteId,
  deploymentUrl,
  handleExport,
}: DeployProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
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
  );
}
