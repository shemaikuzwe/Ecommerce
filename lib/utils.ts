import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
const currencyFormater = new Intl.NumberFormat("en-rw", {
  style: "currency",
  currency: "RWF",
});