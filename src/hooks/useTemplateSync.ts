"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch, setTemplate } from "@/store";
import { useSearchParams, useRouter } from "next/navigation";
import { TemplateType } from "@/types";

/**
 * Custom hook to synchronize the selected template with the URL query parameter
 * @returns The current selected template from the store
 */
export function useTemplateSync() {
  const { selectedTemplate } = useAppSelector((state) => state.portfolio);
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Read template from URL and update store if needed
  useEffect(() => {
    const templateFromUrl = searchParams.get("template") as TemplateType | null;

    if (
      templateFromUrl &&
      ["Minimalist", "Creative", "Professional"].includes(templateFromUrl)
    ) {
      if (templateFromUrl !== selectedTemplate) {
        dispatch(setTemplate(templateFromUrl as TemplateType));
      }
    } else if (selectedTemplate) {
      // Update URL with current template if not already set
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("template", selectedTemplate);
      router.replace(`?${newParams.toString()}`, { scroll: false });
    }
  }, [searchParams, selectedTemplate, dispatch, router]);

  return selectedTemplate;
}

/**
 * Updates the template in both the store and URL
 * @param template The template to set
 */
export function useUpdateTemplate() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  return (template: TemplateType) => {
    dispatch(setTemplate(template));

    // Update URL with the new template
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("template", template);
    router.replace(`?${newParams.toString()}`, { scroll: false });
  };
}
