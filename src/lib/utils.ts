import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const PLACEHOLDER_DATE = /^(?:\[TODO|\s*$|TBD|N\/A)/i;

/** Format a YYYY-MM date string to "Mon YYYY" */
export function formatDate(dateStr: string): string {
  if (!dateStr || PLACEHOLDER_DATE.test(dateStr)) return "TBD";
  const [year, month] = dateStr.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/** Format a date range */
export function formatDateRange(start: string, end: string | null): string {
  const startFormatted = formatDate(start);
  const endFormatted = end ? formatDate(end) : "Present";
  return `${startFormatted} – ${endFormatted}`;
}

export function isHttpUrl(value: string | null | undefined): boolean {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
