import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

/**
 * Merges multiple class values together and handles Tailwind conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to format date
export const formatDate = (dateString: string) => {
  if (!dateString) return "Present";
  try {
    const date = new Date(dateString);
    return format(date, "dd MMM, yyyy");
  } catch (_) {
    return dateString;
  }
};

// Dark mode utility classes
export const darkModeClasses = {
  card: "dark:bg-neutral-950 dark:border-neutral-800",
  cardTitle: "dark:text-neutral-50",
  cardDescription: "dark:text-neutral-500",
  formLabel: "dark:text-neutral-50",
  formDescription: "dark:text-neutral-500",
  input: "dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-50",
  textarea: "dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-50",
  buttonPrimary:
    "dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-100",
  buttonOutline:
    "dark:border-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800",
  text: "dark:text-neutral-50",
  heading: "dark:text-neutral-50",
  select: "dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-50",
};
