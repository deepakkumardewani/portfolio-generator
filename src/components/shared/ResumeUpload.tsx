"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { storage } from "@/lib/appwrite";
import { Permission, Query, Role } from "appwrite";
import { ID } from "appwrite";
import { useAuth } from "@/contexts/AuthContext";
import logger from "@/lib/logger";
interface ResumeUploadProps {
  currentResumeUrl: string | undefined;
  onResumeUrlChange: (url: string) => void;
}

export default function ResumeUpload({
  currentResumeUrl,
  onResumeUrlChange,
}: ResumeUploadProps) {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(
    currentResumeUrl ? extractFileName(currentResumeUrl) : null
  );

  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
  const ALLOWED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  useEffect(() => {
    setFileName(currentResumeUrl ? extractFileName(currentResumeUrl) : null);
  }, [currentResumeUrl]);

  function extractFileName(url: string): string {
    // Extract file name from the URL
    const parts = url.split("/");
    const fullName = parts[parts.length - 1];
    // Truncate if too long
    return fullName.length > 20 ? fullName.substring(0, 17) + "..." : fullName;
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      validateAndUploadFile(files[0]);
    }
  };

  const validateAndUploadFile = (file: File) => {
    // Reset error
    setError(null);

    // Check file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only PDF and Word documents are allowed");
      return;
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setError("File size must be less than 5MB");
      return;
    }

    // Valid file, proceed with upload
    uploadResume(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    validateAndUploadFile(file);
  };

  const checkExistingFile = async (file: File): Promise<string | null> => {
    try {
      // Search for files with matching name and size
      const response = await storage.listFiles(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "",
        [Query.equal("sizeOriginal", file.size), Query.equal("name", file.name)]
      );

      if (response.files.length > 0) {
        // Return the URL of the first matching file
        return storage
          .getFileView(
            process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "",
            response.files[0].$id
          )
          .toString();
      }

      return null;
    } catch (error) {
      console.error("Error checking existing file:", error);
      return null;
    }
  };

  const uploadResume = async (file: File) => {
    if (!file) return;

    // Reset states
    setIsUploading(true);
    setError(null);

    try {
      if (!user) {
        console.error("User not found");
        return;
      }
      // Set file name for display immediately
      setFileName(file.name);

      // Check if file already exists
      const existingFileUrl = await checkExistingFile(file);
      logger.info("existingFileUrl", existingFileUrl);
      if (existingFileUrl) {
        onResumeUrlChange(existingFileUrl);
        return;
      }

      // Upload to Appwrite storage
      const result = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "",
        ID.unique(), // Use ID.unique() instead of "unique()"
        file,
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );

      // Get the file view URL
      const fileUrl = storage.getFileView(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "",
        result.$id
      );

      // Update with the permanent URL
      onResumeUrlChange(fileUrl.toString());
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload resume. Please try again.");
      // If upload fails, remove the file name
      setFileName(currentResumeUrl ? extractFileName(currentResumeUrl) : null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    fileInputRef.current?.click();
  };

  const removeResume = () => {
    setFileName(null);
    onResumeUrlChange("");
    // Reset the file input value to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col space-y-2 w-full">
      {fileName ? (
        <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center space-x-2">
            <Icons.file className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[200px]">
              {fileName}
            </span>
          </div>
          <div className="flex space-x-2">
            {currentResumeUrl && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => window.open(currentResumeUrl, "_blank")}
              >
                <Icons.externalLink className="h-4 w-4 mr-1" />
                View
              </Button>
            )}
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="h-8"
              onClick={removeResume}
            >
              <Icons.trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          onClick={handleButtonClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <Icons.fileUpload className="mx-auto h-10 w-10 text-gray-400 dark:text-gray-500" />
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {isUploading ? (
                <div className="flex items-center justify-center">
                  <Icons.spinner className="mr-1 h-3 w-3 animate-spin" />
                  <span>Uploading...</span>
                </div>
              ) : (
                <span>Upload your resume</span>
              )}
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              PDF or Word document, max 5MB
            </p>
          </div>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        className="sr-only"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
