import { type ClassValue, clsx } from "clsx";

/**
 * Merge class names, filtering falsy values.
 * Tailwind-merge is omitted here for simplicity — clsx covers the basic use case.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
