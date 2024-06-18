import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FormatPrice = {
  price: number | string;
  options: {
    currency?: "USD" | "CAD" | "EUR" | "GBP";
    notation?: Intl.NumberFormatOptions["notation"];
  };
};

export function formatPrice({ price, options }: FormatPrice) {
  const { currency = "CAD", notation = "compact" } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}
