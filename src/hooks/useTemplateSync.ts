"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch, setTemplate } from "@/store";
import { useSearchParams, useRouter } from "next/navigation";
import type { ReadonlyURLSearchParams } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { TemplateType } from "@/types";

/**
 * Custom hook to synchronize the selected template with the URL query parameter
 * @returns The current selected template from the store
 */
export function useTemplateSync() {
  const { selectedTemplate } = useAppSelector((state) => state.portfolio);
  let searchParams: ReadonlyURLSearchParams | undefined;
  let router: AppRouterInstance | undefined;
  let isRouterAvailable = true;

  try {
    searchParams = useSearchParams();
    router = useRouter();
  } catch (e) {
    isRouterAvailable = false;
  }

  const dispatch = useAppDispatch();

  // Read template from URL and update store if needed
  useEffect(() => {
    if (!isRouterAvailable) return;

    const templateFromUrl = searchParams?.get(
      "template"
    ) as TemplateType | null;

    if (
      templateFromUrl &&
      ["Minimalist", "Creative", "Modern"].includes(templateFromUrl)
    ) {
      if (templateFromUrl !== selectedTemplate) {
        dispatch(setTemplate(templateFromUrl as TemplateType));
      }
    } else if (selectedTemplate) {
      // Update URL with current template if not already set
      const newParams = new URLSearchParams(searchParams?.toString() || "");
      newParams.set("template", selectedTemplate);
      router?.replace(`?${newParams.toString()}`, { scroll: false });
    }
  }, [searchParams, selectedTemplate, dispatch, router, isRouterAvailable]);

  return selectedTemplate;
}

/**
 * Updates the template in both the store and URL
 * @param template The template to set
 */
export function useUpdateTemplate() {
  const dispatch = useAppDispatch();
  let router: AppRouterInstance | undefined;
  let searchParams: ReadonlyURLSearchParams | undefined;
  let isRouterAvailable = true;

  try {
    router = useRouter();
    searchParams = useSearchParams();
  } catch (e) {
    isRouterAvailable = false;
  }

  return (template: TemplateType) => {
    dispatch(setTemplate(template));

    if (!isRouterAvailable) return;

    // Update URL with the new template
    const newParams = new URLSearchParams(searchParams?.toString() || "");
    newParams.set("template", template);
    router?.replace(`?${newParams.toString()}`, { scroll: false });
  };
}
