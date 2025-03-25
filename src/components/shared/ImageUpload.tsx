"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";
import { darkModeClasses } from "@/lib/utils";

interface ImageUploadProps {
  currentImageUrl: string;
  onImageUrlChange: (url: string) => void;
}

export default function ImageUpload({
  currentImageUrl,
  onImageUrlChange,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImageUrl || null
  );
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File) => {
    if (!file) return;

    // Reset states
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      // Upload through our proxy API
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      const imageUrl = data.image.url;

      // Update state with the new URL
      setPreviewUrl(imageUrl);
      onImageUrlChange(imageUrl);
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Preview the image locally before upload
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Start upload
    uploadImage(file);
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
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-6 h-[200px]">
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {isUploading ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </div>
              ) : (
                <label className="cursor-pointer hover:text-gray-800 dark:hover:text-gray-300">
                  <span>Upload an image</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
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
