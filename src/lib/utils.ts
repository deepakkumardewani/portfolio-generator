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
  card: "dark:bg-stone-800 dark:border-stone-700",
  cardTitle: "dark:text-stone-100",
  cardDescription: "dark:text-stone-400",
  formLabel: "dark:text-stone-200",
  formDescription: "dark:text-stone-400",
  input: "dark:bg-stone-700 dark:border-stone-600 dark:text-stone-100",
  textarea: "dark:bg-stone-700 dark:border-stone-600 dark:text-stone-100",
  buttonPrimary: "dark:bg-stone-100 dark:text-stone-800 dark:hover:bg-white",
  buttonOutline:
    "dark:border-stone-600 dark:text-stone-200 dark:hover:bg-stone-700",
  text: "dark:text-stone-300",
  heading: "dark:text-stone-100",
};
