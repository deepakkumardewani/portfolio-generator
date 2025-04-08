"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import { useAppwrite } from "@/hooks/useAppwrite";
import { createUserDocument, clearPersistedState } from "@/lib/appwriteService";

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
          console.log("OAuth Callback: No user object yet, waiting...");

          return;
        }

        console.log(`OAuth Callback: User found: ${user.$id}`);

        // Check if we've already attempted document creation in this session
        if (documentCreationAttempted.current) {
          console.log(
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
          console.log(
            "OAuth callback already handled for this session, redirecting to create page"
          );
          router.push("/create");
          return;
        }

        // Mark that we've attempted document creation
        documentCreationAttempted.current = true;

        console.log("OAuth callback - Creating document for user:", user.$id);

        // Create user document if needed
        await createUserDocument(user.$id, user.name, user.email);
        console.log(
          `OAuth Callback: Document creation successful for ${user.$id}`
        );

        // Store in local storage that we've handled this user
        localStorage.setItem(`oauth_handled_${user.$id}`, "true");
        localStorage.setItem("is_authenticated", "true");
        console.log(`OAuth Callback: LocalStorage flags set for ${user.$id}`);

        // Clear persisted state to ensure fresh data load
        clearPersistedState();
        console.log(`OAuth Callback: Persisted state cleared for ${user.$id}`);

        // Redirect to create page
        console.log(`OAuth Callback: Redirecting ${user.$id} to /create`);

        router.push("/create");
      } catch (err: any) {
        console.error("Error in OAuth callback:", err);
        setError(err.message || "An error occurred during authentication");
        setIsLoading(false);
      }
    };

    if (user) {
      handleCallback();
    } else {
      console.log("OAuth Callback: No user object yet, waiting...");
    }
  }, [user, router]);

  if (error) {
    console.error("OAuth Callback: Redirecting to / due to error:", error);
    router.push("/");
  }

  if (isLoading && !error) {
    return <LoadingScreen />;
  }

  return null;
}
