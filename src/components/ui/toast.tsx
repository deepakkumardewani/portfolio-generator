"use client";

import { useState, useEffect } from "react";
import { XCircle, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Toast, ToastVariant } from "./use-toast";

interface ToastProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

export function ToastItem({ toast, onDismiss }: ToastProps) {
  const { id, title, description, variant = "default" } = toast;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Handle dismiss
  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDismiss(id);
    }, 300); // Matches the CSS transition duration
  };

  const getIcon = () => {
    switch (variant) {
      case "destructive":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div
      className={cn(
        "pointer-events-auto relative flex w-full max-w-md rounded-lg border border-stone-200 bg-white p-4 shadow-lg transition-all duration-300 dark:border-stone-700 dark:bg-stone-800",
        {
          "translate-y-0 opacity-100": isVisible,
          "translate-y-2 opacity-0": !isVisible,
        },
        variant === "destructive" &&
          "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"
      )}
    >
      <div className="flex grow items-start gap-3">
        <div className="shrink-0 mt-0.5">{getIcon()}</div>
        <div className="flex-1">
          {title && (
            <div className="font-medium text-stone-900 dark:text-stone-50">
              {title}
            </div>
          )}
          {description && (
            <div className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              {description}
            </div>
          )}
        </div>
      </div>
      <button
        onClick={handleDismiss}
        className="absolute right-2 top-2 rounded-md p-1 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-50"
      >
        <span className="sr-only">Close</span>
        <XCircle className="h-4 w-4" />
      </button>
    </div>
  );
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Find toasts in the global state
  useEffect(() => {
    // In a real implementation, this would subscribe to a toast context/store
    // For now, we'll leave it as a placeholder
    // You would implement a more robust solution to connect this to useToast
  }, []);

  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map((toast) => (
        <div key={toast.id} className="mb-2">
          <ToastItem
            toast={toast}
            onDismiss={(id) => {
              setToasts((prev) => prev.filter((t) => t.id !== id));
            }}
          />
        </div>
      ))}
    </div>
  );
}
