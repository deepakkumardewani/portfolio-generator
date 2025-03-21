"use client";
import React, { ReactNode } from "react";
import { useAppSelector } from "@/store";

interface SectionComponent {
  id: string;
  component: ReactNode;
}

interface OrderedTemplateContainerProps {
  sections: SectionComponent[];
}

/**
 * A component that renders template sections in the correct order based on template configuration
 * @param sections Array of section components with their IDs
 */
export default function OrderedTemplateContainer({
  sections,
}: OrderedTemplateContainerProps) {
  // Get the template sections configuration from the store
  const { templateSections } = useAppSelector((state) => state.portfolio);

  // Create a map of section IDs to components for easy lookup
  const sectionMap = new Map(sections.map((s) => [s.id, s.component]));

  // Filter out sections that are not visible
  const visibleSections = templateSections.sections.filter(
    (section) => section.visible
  );

  // Sort sections based on the order in the configuration
  const orderedSections = visibleSections
    .map((section) => ({
      ...section,
      component: sectionMap.get(section.id),
    }))
    .filter((section) => section.component); // Only include sections we have components for

  return (
    <>
      {orderedSections.map((section) => (
        <React.Fragment key={section.id}>{section.component}</React.Fragment>
      ))}
    </>
  );
}
