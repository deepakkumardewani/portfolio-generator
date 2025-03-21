"use client";
import React from "react";
import { useAppSelector } from "@/store";

interface ConditionalSectionProps {
  sectionId: string;
  children: React.ReactNode;
}

/**
 * A component that conditionally renders its children based on template section configuration
 * @param sectionId The ID of the section in the template configuration
 * @param children The content to render if the section is visible
 */
export default function ConditionalSection({
  sectionId,
  children,
}: ConditionalSectionProps) {
  // Get the template sections configuration from the store
  const { templateSections } = useAppSelector((state) => state.portfolio);

  // Find the configuration for this section
  const sectionConfig = templateSections.sections.find(
    (section) => section.id === sectionId
  );

  // If the section is not found or is set to not visible, don't render anything
  if (!sectionConfig || !sectionConfig.visible) {
    return null;
  }

  // Otherwise, render the children
  return <>{children}</>;
}
