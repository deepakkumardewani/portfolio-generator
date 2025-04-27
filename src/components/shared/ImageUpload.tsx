"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { darkModeClasses } from "@/lib/utils";
import { client, storage } from "@/lib/appwrite";
import { Role } from "node-appwrite";
import { Permission } from "node-appwrite";
import { ID } from "appwrite";
import { useAuth } from "@/contexts/AuthContext";
interface ImageUploadProps {
  currentImageUrl: string;
  onImageUrlChange: (url: string) => void;
}

export default function ImageUpload({
  currentImageUrl,
  onImageUrlChange,
}: ImageUploadProps) {
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

      // Get the file view URL
      const fileUrl = storage.getFileView(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "",
        result.$id
      );

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
    <div className="space-y-4">
      {previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Project preview"
            className="w-full h-[200px] object-cover rounded-md"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={removeImage}
          >
            <Icons.x className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className="flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-6 h-[200px] cursor-pointer"
          onClick={handleButtonClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <Icons.upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {isUploading ? (
                <div className="flex items-center">
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </div>
              ) : (
                <label className="cursor-pointer hover:text-gray-800 dark:hover:text-gray-300">
                  <span>Upload an image (JPG, PNG, max 5MB)</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="sr-only"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                </label>
              )}
            </div>
            {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
