import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return "-";
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  return format(parsedDate, "dd MMMM yyyy", { locale: id });
}

export function formatDateTime(date: string | Date | null | undefined): string {
  if (!date) return "-";
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  return format(parsedDate, "dd MMMM yyyy, HH:mm", { locale: id });
}

export function formatPhoneNumber(phoneNumber: string | null | undefined): string {
  if (!phoneNumber) return "-";
  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, "");
  
  // Example formatting: 0812-3456-7890
  if (cleaned.startsWith("62")) {
    return `+62 ${cleaned.slice(2, 5)}-${cleaned.slice(5, 9)}-${cleaned.slice(9)}`;
  } else if (cleaned.startsWith("0")) {
    return `0${cleaned.slice(1, 4)}-${cleaned.slice(4, 8)}-${cleaned.slice(8)}`;
  }
  
  return phoneNumber;
}

export function truncateText(text: string | null | undefined, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
