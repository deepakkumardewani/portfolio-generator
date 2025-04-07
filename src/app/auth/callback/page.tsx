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
          return;
        }

        // Check if we've already attempted document creation in this session
        if (documentCreationAttempted.current) {
          console.log(
            "Document creation already attempted in this component lifecycle"
          );
          router.push("/create");
          return;
        }

        // Check session storage if we've handled this user before
        const alreadyHandled = sessionStorage.getItem(
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

        // Store in session storage that we've handled this user
        sessionStorage.setItem(`oauth_handled_${user.$id}`, "true");
        sessionStorage.setItem("is_authenticated", "true");

        // Clear persisted state to ensure fresh data load
        clearPersistedState();

        // Redirect to create page
        router.push("/create");
      } catch (err: any) {
        console.error("Error in OAuth callback:", err);
        setError(err.message || "An error occurred during authentication");
        setIsLoading(false);
      }
    };

    handleCallback();
  }, [user, router]);

  if (error) {
    router.push("/");
    // return (
    //   <div className="min-h-screen flex items-center justify-center">
    //     <div className="text-center">
    //       <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
    //       <p className="text-red-500 mb-4">{error}</p>
    //       <button
    //         onClick={() => router.push("/")}
    //         className="px-4 py-2 bg-primary text-primary-foreground rounded"
    //       >
    //         Return to Home
    //       </button>
    //     </div>
    //   </div>
    // );
  }

  return <LoadingScreen />;
}
