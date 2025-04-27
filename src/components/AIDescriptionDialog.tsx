"use client";

import { useState, useEffect, useRef } from "react";
import {
  SparklesIcon,
  RefreshCwIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  InfoIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { darkModeClasses } from "@/lib/utils";
import { useCompletion } from "@ai-sdk/react";
import { AnimatedText } from "./AnimatedText";
import {
  useAppSelector,
  useAppDispatch,
  setRemainingRequests as setStoreRemainingRequests,
} from "@/store";
import { useAuth } from "@/contexts/AuthContext";

interface AIDescriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDescriptionGenerated: (description: string) => void;
  fieldLabel?: string;
  initialDescription?: string;
}

export function AIDescriptionDialog({
  open,
  onOpenChange,
  onDescriptionGenerated,
  fieldLabel = "Description",
  initialDescription = "",
}: AIDescriptionDialogProps) {
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("Professional");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [remainingRequests, setRemainingRequests] = useState<number | null>(
    null
  );
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [originalDescription, setOriginalDescription] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showEmptyContainer, setShowEmptyContainer] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [localCompletion, setLocalCompletion] = useState("");
  const [previousInitialDescription, setPreviousInitialDescription] =
    useState("");

  const descriptionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Get user and dispatch from hooks
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  // Get request limit info from store
  const { remainingRequests: storeRemainingRequests, allowedRequestsPerDay } =
    useAppSelector((state) => state.portfolio);

  // Initialize remainingRequests from store if available
  useEffect(() => {
    if (storeRemainingRequests !== undefined && remainingRequests === null) {
      setRemainingRequests(storeRemainingRequests);
    } else if (remainingRequests === null) {
      // Fallback to default if not in store
      setRemainingRequests(10);
    }
  }, [storeRemainingRequests, remainingRequests]);

  const { completion, complete, isLoading } = useCompletion({
    api: "/api/description",
    body: {
      keywords,
      tone,
      feedback,
      originalDescription,
      userId: user?.$id, // Include user ID in the request
    },
    onResponse: (response) => {
      // console.log("Response:", response.ok, response.status);
      setIsStreaming(true);

      // Check if there's a remaining count header
      if (response.headers.has("X-Remaining-Requests")) {
        const remaining = parseInt(
          response.headers.get("X-Remaining-Requests") || "0",
          10
        );
        console.log("Remaining requests from server:", remaining);
        setRemainingRequests(remaining);
        dispatch(setStoreRemainingRequests(remaining));
      }

      if (!response.ok) {
        if (response.status === 429) {
          setError(
            "You have reached your daily limit of AI description requests."
          );
          setRemainingRequests(0);
          dispatch(setStoreRemainingRequests(0));
        } else {
          setError("Failed to generate description");
        }
        setIsStreaming(false);
        setIsGenerating(false);
        throw new Error("Failed to generate description");
      }
    },
    onFinish: () => {
      setIsStreaming(false);
      setIsGenerating(false);
      if (!feedback) {
        setShowFeedbackForm(true);
      }
      // Scroll to the description
      setTimeout(() => {
        if (descriptionRef.current && contentRef.current) {
          const descriptionTop = descriptionRef.current.offsetTop;
          contentRef.current.scrollTop = descriptionTop - 100; // Adjust for better visibility
        }
      }, 100);
    },
    onError: (err) => {
      console.error("Error generating description:", err);
      setError("An unexpected error occurred");
      setIsStreaming(false);
      setIsGenerating(false);
    },
  });

  // Update state when dialog opens with initial description
  useEffect(() => {
    if (
      open &&
      initialDescription &&
      initialDescription !== previousInitialDescription
    ) {
      // Set as local completion
      setLocalCompletion(initialDescription);

      // Remember this initial description so we don't re-apply it
      setPreviousInitialDescription(initialDescription);

      // Show feedback form since we have an existing description
      setShowFeedbackForm(true);

      // Set as original description for refinements
      setOriginalDescription(initialDescription);
    }
  }, [open, initialDescription]);

  // Update the description when the completion changes
  useEffect(() => {
    if (completion) {
      // If this is the first generation (not a feedback refinement)
      if (!feedback) {
        setOriginalDescription(completion);
      }

      // Also update local completion
      setLocalCompletion(completion);
    }
  }, [completion, feedback]);

  const handleGenerate = async () => {
    if (!keywords.trim()) {
      setError("Please enter keywords");
      return;
    }

    // Check if user is authenticated
    if (!user?.$id) {
      setError("You must be logged in to generate descriptions");
      return;
    }

    // Check if limit is reached locally before server call
    // The server will do its own check, but this prevents unnecessary API calls
    if (remainingRequests !== null && remainingRequests <= 0) {
      setError("You have reached your daily limit of AI description requests");
      return;
    }

    setError(null);
    setIsGenerating(true);
    setIsStreaming(false); // Reset streaming state before starting a new generation

    if (!feedback.trim()) {
      console.log("New generation");
      // This is a new generation
      setLocalCompletion(""); // Clear local completion only
      setShowFeedbackForm(false);
      setFeedback("");
      setIsDescriptionExpanded(false);
      setShowEmptyContainer(true);
    } else {
      // This is a refinement
      // Keep the container but empty it visually
      setLocalCompletion(""); // Clear local completion only
      setShowEmptyContainer(true);
    }

    // Call the complete function with the prompt
    try {
      // Set streaming to true right before completion starts so animation works
      setTimeout(() => setIsStreaming(true), 0);

      complete(``, {
        body: {
          keywords,
          tone,
          feedback: feedback.trim(),
          originalDescription: feedback.trim() ? originalDescription : "",
          userId: user.$id, // Include user ID in the request
        },
      });
    } catch (err) {
      console.error("Error generating description:", err);
      setError("An unexpected error occurred");
      setIsGenerating(false);
      setIsStreaming(false);
    }
  };

  const toggleDescriptionExpand = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);

    // Scroll to the description after expanding
    if (!isDescriptionExpanded) {
      setTimeout(() => {
        if (descriptionRef.current && contentRef.current) {
          const descriptionTop = descriptionRef.current.offsetTop;
          contentRef.current.scrollTop = descriptionTop - 100;
        }
      }, 50);
    }
  };

  // Check if the user has reached their limit
  const isLimitReached = remainingRequests !== null && remainingRequests <= 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Write Description with AI</DialogTitle>
        </DialogHeader>

        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto px-6 py-2 scrollbar-thin"
        >
          <div className="space-y-4">
            {/* Keywords */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="keywords">Keywords</Label>
                <Tooltip delayDuration={500}>
                  <TooltipTrigger asChild>
                    <span className="cursor-help">
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    {fieldLabel === "about"
                      ? "Add skills, expertise, or qualities that define you. The AI will craft a personalized bio highlighting these elements."
                      : fieldLabel === "project_description"
                      ? "Add key technologies, features, or achievements of your project. The AI will craft a compelling project description highlighting these elements."
                      : fieldLabel === "experience_description"
                      ? "Add responsibilities, achievements, or skills used in this role. The AI will craft a professional experience description highlighting these elements."
                      : "Add keywords separated by commas. The AI will craft a personalized description highlighting these elements."}
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="keywords"
                placeholder="Enter keywords separated by commas"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className={darkModeClasses.input}
                disabled={isLoading || isLimitReached}
              />
              {error && !keywords.trim() && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
              )}
            </div>

            {/* Tone */}
            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select
                value={tone}
                onValueChange={setTone}
                disabled={isLoading || isLimitReached}
              >
                <SelectTrigger id="tone" className={darkModeClasses.select}>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Formal">Formal</SelectItem>
                  <SelectItem value="Casual">Casual</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Friendly">Friendly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && keywords.trim() && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}

          {/* Always show the description container */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <Label className="text-sm font-medium">Description</Label>
              {localCompletion && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2"
                  onClick={toggleDescriptionExpand}
                  disabled={isLoading && !localCompletion}
                >
                  {isDescriptionExpanded ? (
                    <ChevronUpIcon className="h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
            <div
              ref={descriptionRef}
              className={`p-4 bg-neutral-50 dark:bg-neutral-900 rounded-md border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed transition-all duration-200 overflow-y-auto ${
                isDescriptionExpanded
                  ? "max-h-[300px]"
                  : localCompletion
                  ? "max-h-[120px]"
                  : "h-[42px] max-h-[42px]" // 1-line height when empty
              }`}
            >
              {localCompletion ? (
                <AnimatedText
                  text={localCompletion}
                  shouldAnimate={isStreaming}
                />
              ) : null}
            </div>
          </div>

          {showFeedbackForm && (
            <div className="space-y-2 mt-4">
              <Label htmlFor="feedback">
                Not satisfied? Add feedback to refine the description
              </Label>
              <Textarea
                id="feedback"
                placeholder="Example: Make it shorter, more technical, emphasize leadership skills, etc."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className={`${darkModeClasses.input} min-h-[80px]`}
                disabled={isLoading || isLimitReached}
              />
            </div>
          )}
        </div>

        <DialogFooter className="p-3 flex flex-row justify-between items-center border-t">
          <div className="flex flex-1 space-x-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                if (localCompletion) {
                  onDescriptionGenerated(localCompletion);
                }
                onOpenChange(false);
              }}
              disabled={isLoading || !localCompletion}
            >
              Done
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={isLoading || isLimitReached}
              className={`${darkModeClasses.buttonPrimary} ${
                isLoading ? "animate-pulse" : ""
              }`}
            >
              {isLimitReached ? (
                "Daily limit reached"
              ) : isLoading ? (
                <span className="flex items-center">
                  {feedback.trim() ? (
                    <RefreshCwIcon className="h-4 w-4 animate-spin" />
                  ) : (
                    <SparklesIcon className="h-4 w-4 animate-spin" />
                  )}
                </span>
              ) : feedback.trim() ? (
                <>
                  <RefreshCwIcon className="h-4 w-4" />
                  Refine{" "}
                  {remainingRequests !== null && (
                    <span className="ml-1 opacity-80">
                      ({remainingRequests})
                    </span>
                  )}
                </>
              ) : (
                <>
                  <SparklesIcon className="h-4 w-4" />
                  Generate{" "}
                  {remainingRequests !== null && (
                    <span className="ml-1 opacity-80">
                      ({remainingRequests})
                    </span>
                  )}
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
