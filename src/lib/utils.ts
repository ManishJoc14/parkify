import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { Revenue } from "@/types/definitions";
import { UseFormReturn } from "react-hook-form";
import { SignUpFormData } from "@/app/(auth-pages)/login/AuthModal";

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const splitName = (
  form: UseFormReturn<SignUpFormData>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  data: { name: string }
): { firstName: string; middleName: string; lastName: string } | void => {
  let firstName: string,
    middleName: string = "",
    lastName: string | string[];
  const nameParts = data.name.split(" ");
  const length = nameParts.length;

  if (length < 2) {
    setIsLoading(false);
    return form.setError("name", {
      type: "manual",
      message: "Full name is required",
    });
  }

  if (length == 2) {
    [firstName, lastName] = nameParts;
  } else if (length == 3) {
    [firstName, middleName, lastName] = nameParts;
  } else {
    [firstName, middleName, ...lastName] = nameParts;
    lastName = lastName.join(" ");
  }

  return { firstName, middleName, lastName };
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
