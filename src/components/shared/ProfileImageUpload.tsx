"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Icons } from "@/components/ui/icons";
import { storage } from "@/lib/appwrite";
import { Permission, Role, ID } from "appwrite";
import { useAuth } from "@/contexts/AuthContext";
interface ProfileImageUploadProps {
  currentImageUrl: string | undefined;
  onImageUrlChange: (url: string) => void;
}

export default function ProfileImageUpload({
  currentImageUrl,
  onImageUrlChange,
}: ProfileImageUploadProps) {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImageUrl || null
  );
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

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
      setError("Only JPG and PNG images are allowed");
      return;
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setError("File size must be less than 5MB");
      return;
    }

    // Valid file, proceed with upload
    uploadImage(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    validateAndUploadFile(file);
  };

  const uploadImage = async (file: File) => {
    if (!file) return;

    // Reset states
    setIsUploading(true);
    setError(null);

    try {
      // Create a preview immediately
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      if (!user) {
        console.error("User not found");
        return;
      }
      // Upload to Appwrite storage
      const result = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "",
        ID.unique(),
        file,
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );

      console.log("result", result);
      // Get the file view URL
      const fileUrl = storage.getFileView(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "",
        result.$id
      );

      console.log("fileUrl", fileUrl);
      // Update with the permanent URL
      onImageUrlChange(fileUrl.toString());
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload image. Please try again.");
      // If upload fails, remove the preview
      setPreviewUrl(currentImageUrl || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setPreviewUrl(null);
    onImageUrlChange("");
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {previewUrl ? (
        <div className="relative">
          <Avatar className="h-32 w-32">
            <AvatarImage src={previewUrl} alt="Profile" />
            <AvatarFallback className="text-2xl font-semibold">
              {currentImageUrl ? "..." : "?"}
            </AvatarFallback>
          </Avatar>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-8 w-8 rounded-full"
            onClick={removeImage}
          >
            <Icons.x className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-full p-6 h-32 w-32 cursor-pointer"
          onClick={handleButtonClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <Icons.upload className="mx-auto h-10 w-10 text-gray-400 dark:text-gray-500" />
            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
              {isUploading ? (
                <div className="flex items-center justify-center">
                  <Icons.spinner className="mr-1 h-3 w-3 animate-spin" />
                  <span>Uploading...</span>
                </div>
              ) : (
                <span>Upload photo</span>
              )}
            </div>
          </div>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        className="sr-only"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      {error && (
        <p className="text-xs text-red-500 text-center max-w-[250px]">
          {error}
        </p>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center max-w-[250px]">
        Upload a profile image (JPG, PNG, max 5MB)
      </p>
    </div>
  );
}
