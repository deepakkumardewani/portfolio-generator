"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";

export default function FormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get all query parameters
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      params.append(key, value);
    });

    // Redirect to create page with the same query parameters
    router.push(`/create${params.toString() ? `?${params.toString()}` : ""}`);
  }, [router, searchParams]);

  return <LoadingScreen />;
}
