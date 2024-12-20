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

export function getDayInNumber(day: string) {
  switch (day.toLowerCase()) {
    case "sunday":
      return 0;
    case "monday":
      return 1;
    case "tuesday":
      return 2;
    case "wednesday":
      return 3;
    case "thursday":
      return 4;
    case "friday":
      return 5;
    case "saturday":
      return 6;
  }
}

export const timeAgo = (timestamp: string): string => {
  const now = new Date();
  const date = new Date(timestamp);

  const diffMs = now.getTime() - date.getTime(); // Difference in milliseconds
  const diffSec = Math.floor(diffMs / 1000); // Seconds
  const diffMin = Math.floor(diffSec / 60); // Minutes
  const diffHours = Math.floor(diffMin / 60); // Hours
  const diffDays = Math.floor(diffHours / 24); // Days
  const diffWeeks = Math.floor(diffDays / 7); // Weeks
  const diffMonths = Math.floor(diffDays / 30); // Approx. months
  const diffYears = Math.floor(diffDays / 365); // Approx. years

  if (diffSec < 60) return `${diffSec} seconds ago`;
  if (diffMin < 60) return `${diffMin} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffWeeks < 4) return `${diffWeeks} weeks ago`;
  if (diffMonths < 12) return `${diffMonths} months ago`;
  return `${diffYears} years ago`;
};
