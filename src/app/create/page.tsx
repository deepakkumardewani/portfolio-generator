"use client";
import FormStepper from "@/components/form/FormStepper";
import LoadingScreen from "@/components/LoadingScreen";
import { Suspense, useEffect } from "react";
import CreateHeader from "./components/CreateHeader";
import { useAppwrite } from "@/hooks/useAppwrite";
import { initializeAppwrite } from "@/store";

export default function CreatePage() {
  const { user } = useAppwrite();

  useEffect(() => {
    if (!user) return;

    // Only initialize Appwrite - document creation should be handled during signup flow
    initializeAppwrite(user.$id);
  }, [user]);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <main className="min-h-screen bg-stone-50 dark:bg-neutral-950 pt-12 pb-24">
        <div className="container mx-auto px-4">
          <CreateHeader />

          <div className="flex justify-center">
            <FormStepper />
          </div>
        </div>
      </main>
    </Suspense>
  );
}
