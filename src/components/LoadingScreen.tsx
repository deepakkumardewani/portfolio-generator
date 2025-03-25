import { Loader2 } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-stone-600 dark:text-stone-300 mx-auto" />
        <p className="mt-4 text-stone-600 dark:text-stone-300">Loading...</p>
      </div>
    </div>
  );
}
