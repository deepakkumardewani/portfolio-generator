import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { setViewMode, useAppDispatch, useAppSelector } from "@/store";
import React from "react";

export default function ToggleButtons() {
  const { viewMode } = useAppSelector((state) => state.portfolio);
  const dispatch = useAppDispatch();
  return (
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
        <Icons.monitor size={18} />
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
        <Icons.smartphone size={18} />
      </Button>
    </div>
  );
}
