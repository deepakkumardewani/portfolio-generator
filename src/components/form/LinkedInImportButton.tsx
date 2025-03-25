"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { FaLinkedin } from "react-icons/fa";
import {
  getLinkedInAuthUrl,
  fetchLinkedInProfile,
  parseLinkedInData,
} from "@/lib/linkedin";
import { useAppDispatch } from "@/store";
import { setBio, setWorkExperience, setContact } from "@/store";

interface LinkedInImportButtonProps {
  className?: string;
  onImportComplete?: () => void;
}

export default function LinkedInImportButton({
  className,
  onImportComplete,
}: LinkedInImportButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Check for access token in URL (from redirect)
  const accessToken = searchParams.get("access_token");
  const error = searchParams.get("error");

  // Handle errors from LinkedIn OAuth
  if (error) {
    toast({
      title: "LinkedIn Login Error",
      description: decodeURIComponent(error),
      variant: "destructive",
    });
  }

  // Process access token if available
  const processAccessToken = async (token: string) => {
    try {
      setIsLoading(true);

      // Fetch profile data
      const profileData = await fetchLinkedInProfile(token);

      // Parse LinkedIn data
      const parsedData = parseLinkedInData(profileData);

      // Update store with LinkedIn data
      dispatch(setBio(parsedData.bio));

      // Only update work experience if we have data
      if (parsedData.workExperience && parsedData.workExperience.length > 0) {
        dispatch(setWorkExperience(parsedData.workExperience));
      }

      // Update contact info if email is available
      if (parsedData.contact.email) {
        dispatch(
          setContact({
            ...parsedData.contact,
            phone: "", // Keep existing phone if any
          })
        );
      }

      // Show success message
      toast({
        title: "Import Successful",
        description: "Your LinkedIn profile data has been imported.",
      });

      // Clean URL to remove the access token
      const url = new URL(window.location.href);
      url.searchParams.delete("access_token");
      router.replace(url.toString());

      // Notify parent component
      if (onImportComplete) {
        onImportComplete();
      }
    } catch (error) {
      console.error("LinkedIn import error:", error);
      toast({
        title: "Import Failed",
        description:
          (error as Error).message || "Failed to import LinkedIn data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Process token from URL if available
  if (accessToken && !isLoading) {
    processAccessToken(accessToken);
  }

  // Handle button click
  const handleImportClick = () => {
    try {
      setIsLoading(true);
      const authUrl = getLinkedInAuthUrl();
      window.location.href = authUrl;
    } catch (error) {
      console.error("LinkedIn auth error:", error);
      toast({
        title: "LinkedIn Login Error",
        description:
          (error as Error).message || "Failed to start LinkedIn login",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className={`flex items-center gap-2 ${className}`}
      onClick={handleImportClick}
      disabled={isLoading}
    >
      <FaLinkedin className="h-4 w-4" />
      {isLoading ? "Importing..." : "Import from LinkedIn"}
    </Button>
  );
}
