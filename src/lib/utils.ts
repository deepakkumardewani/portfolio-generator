import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
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
