"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import { useAppwrite } from "@/hooks/useAppwrite";
import { createUserDocument, clearPersistedState } from "@/lib/appwriteService";
import logger from "@/lib/logger";

export default function OAuthCallbackPage() {
  const { user } = useAppwrite();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const documentCreationAttempted = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Exit if no user yet
        if (!user) {
          logger.info("OAuth Callback: No user object yet, waiting...");
          return;
        }

        logger.info(`OAuth Callback: User found: ${user.$id}`);

        // Check if we've already attempted document creation in this session
        if (documentCreationAttempted.current) {
          logger.info(
            "Document creation already attempted in this component lifecycle"
          );
          router.push("/create");
          return;
        }

        // Check session storage if we've handled this user before
        const alreadyHandled = localStorage.getItem(
          `oauth_handled_${user.$id}`
        );
        if (alreadyHandled) {
          logger.info(
            "OAuth callback already handled for this session, redirecting to create page"
          );
          localStorage.setItem("is_authenticated", "true");
          router.push("/create");
          return;
        }

        // Mark that we've attempted document creation
        documentCreationAttempted.current = true;

        logger.info(`OAuth callback - Creating document for user: ${user.$id}`);

        // Create user document if needed
        await createUserDocument(user.$id, user.name, user.email);
        logger.info(
          `OAuth Callback: Document creation successful for ${user.$id}`
        );

        // Store in local storage that we've handled this user
        localStorage.setItem(`oauth_handled_${user.$id}`, "true");
        localStorage.setItem("is_authenticated", "true");
        logger.info(`OAuth Callback: LocalStorage flags set for ${user.$id}`);

        // Clear persisted state to ensure fresh data load
        clearPersistedState();
        logger.info(`OAuth Callback: Persisted state cleared for ${user.$id}`);

        // Redirect to create page
        logger.info(`OAuth Callback: Redirecting ${user.$id} to /create`);

        router.push("/create");
      } catch (err: any) {
        logger.error("Error in OAuth callback:", err);
        setError(err.message || "An error occurred during authentication");
        setIsLoading(false);
      }
    };

    if (user) {
      handleCallback();
    } else {
      logger.info("OAuth Callback: No user object yet, waiting...");
    }
  }, [user, router]);

  if (error) {
    logger.error(`OAuth Callback: Redirecting to / due to error: ${error}`);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (isLoading && !error) {
    return <LoadingScreen />;
  }

  return null;
}
