import FormStepper from "@/components/form/FormStepper";
import LoadingScreen from "@/components/LoadingScreen";
import { Suspense } from "react";

export default function CreatePage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <main className="min-h-screen bg-stone-50 dark:bg-stone-900 pt-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-50">
              Create Your Portfolio
            </h1>
            <p className="text-stone-600 dark:text-stone-300 mt-2">
              Fill in your details and showcase your best work
            </p>
          </div>

          <div className="flex justify-center">
            <FormStepper />
          </div>
        </div>
      </main>
    </Suspense>
  );
}
