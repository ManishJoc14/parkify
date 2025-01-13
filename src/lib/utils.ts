import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createCanvas } from "canvas";
import { parseISO, isBefore, isAfter, format, isEqual } from "date-fns";
import { Decimal } from 'decimal.js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { UseFormReturn } from "react-hook-form";
import { SignUpFormData } from "@/app/(auth-pages)/login/AuthModal";
import {
  BookingResponse,
  BookingStatus,
  ParkingDetailed,
  VehicleType,
} from "@/types/definitions";
import { toast } from "react-toastify";

export const formatCurrency = (amount: number) => {
  return amount.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
  });
};

export function getVehicleTypeKey(value: string): string | undefined {
  const entries = Object.entries(VehicleType);
  for (const [key, val] of entries) {
    if (val === value) {
      return key;
    }
  }
}

export function getBookingKey(value: string): string | undefined {
  const entries = Object.entries(BookingStatus);
  for (const [key, val] of entries) {
    if (val === value) {
      return key;
    }
  }
}

export function getStatusColor(status: string) {
  switch (status) {
    case "PENDING":
      return "bg-yellow-50 text-yellow-900";
    case "CONFIRMED":
      return "bg-green-50 text-green-900";
    case "COMPLETED":
      return "bg-blue-50 text-blue-900";
    case "CANCELLED":
      return "bg-red-50 text-red-900";
    default:
      return "";
  }
}

export const getRoute = (role: string | undefined) => {
  if (role && role === "Owner") {
    return "/admin/parking-spots";
  } else {
    return "/parking";
  }
}
export const getMessage = (role: string | undefined) => {
  if (role && role === "Owner") {
    return "Go to Dashboard";
  } else {
    return "Find Parking";
  }
}

export const calculateAmount = (
  parkingDetailed: ParkingDetailed,
  start: string,
  end: string
) => {
  if (start && end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationSeconds = (endDate.getTime() - startDate.getTime()) / 1000; // Duration in seconds
    const durationHours = new Decimal(durationSeconds).dividedBy(3600); // Convert to hours with Decimal

    let calculatedAmount;

    if (durationHours.lessThanOrEqualTo(24)) {
      calculatedAmount = durationHours.times(parkingDetailed.ratePerHour);
    } else {
      const fullDays = durationHours.div(24).floor(); // Floor the days (similar to // in Python)
      const remainingHours = durationHours.mod(24); // Remainder of hours after full days

      calculatedAmount = fullDays.times(parkingDetailed.ratePerDay);

      if (remainingHours.greaterThan(0)) {
        calculatedAmount = calculatedAmount.plus(remainingHours.times(parkingDetailed.ratePerHour));
      }
    }

    return calculatedAmount.toFixed(2); // Round to two decimal places to match backend rounding
  }
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

export const TimeOnly = (date: string) => {
  return new Date(date).toLocaleTimeString();
};

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

export const formatTimeTo12Hour = (time: string): string => {
  const date = new Date(`1970-01-01T${time}`);
  return format(date, "hh:mm a");
}

/**
 * Generates a parking token image based on the API response.
 * @param response API response containing parking booking details.
 * @param amount Amount paid for the parking (optional, can be passed separately).
 * @param vehicleNo Vehicle number (optional, can be passed separately).
 * @param vehicle Vehicle type (optional, can be passed separately).
 * @returns A base64 string of the generated token image.
 */
export function generateParkingToken(
  response: BookingResponse,
  amount: string,
  vehicleNo: string,
  vehicle: VehicleType
): string | undefined {
  try {
    // Destructure the response
    const { bookingNo, startTime, endTime, status, paymentStatus } = response;

    const start = startTime.split("T")[0] + " " + formatTimeTo12Hour(response.startTime.split("T")[1]);
    const end = endTime.split("T")[0] + " " + formatTimeTo12Hour(response.endTime.split("T")[1]);


    // Create a canvas
    const canvas = createCanvas(600, 420);
    const ctx = canvas.getContext("2d");

    // Background with a light gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#f9f9f9");
    gradient.addColorStop(1, "#e9e9e9");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw a border
    ctx.strokeStyle = "#cccccc";
    ctx.lineWidth = 5;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    // Title
    ctx.fillStyle = "#333333";
    ctx.font = "bold 28px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Parkify", canvas.width / 2, 50);

    // Separator
    ctx.strokeStyle = "#dddddd";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, 70);
    ctx.lineTo(canvas.width - 20, 70);
    ctx.stroke();

    // Draw details
    ctx.textAlign = "left";
    ctx.font = "18px Arial";
    ctx.fillStyle = "#555555";
    ctx.fillText(`Booking No: ${bookingNo}`, 30, 100); // Booking number
    ctx.fillText(`Vehicle No: ${vehicleNo}`, 30, 140); // Vehicle number
    ctx.fillText(`Vehicle Type: ${vehicle}`, 30, 180); // Vehicle type
    ctx.fillText(`Start Time: ${start} `, 30, 220); // Start time
    ctx.fillText(`End Time: ${end} `, 30, 260); // End time
    ctx.fillText(`Amount: £${amount}`, 30, 300); // Amount
    ctx.fillText(`Status: ${status}`, 30, 330); // Booking status
    ctx.fillText(`Payment Status: ${paymentStatus}`, 30, 360); // Payment status

    // Footer
    ctx.fillStyle = "#777777";
    ctx.font = "italic 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Thank you for using our service!", canvas.width / 2, 400);

    // Return the image as a base64 string
    return canvas.toDataURL();

  } catch (error) {
    console.error("Error generating parking token:", error);
  }
}


export const isValidTime = (
  start: string,
  end: string,
  parkingDetailed: ParkingDetailed
) => {
  const startTime = parseISO(start);
  const endTime = parseISO(end);
  const now = new Date();

  /* ------------- start date and end date should be in the future ------------ */
  if (isBefore(startTime, now)) {
    toast.error("Start time should be in the future", { autoClose: 4000 });
    return false;
  }

  if (isBefore(endTime, now)) {
    toast.error("End time should be in the future", { autoClose: 4000 });
    return false;
  }

  /* ------------- end date should be after start date ------------ */
  if (isBefore(endTime, startTime) || isEqual(endTime, startTime)) {
    toast.error("End time must be after start time", { autoClose: 4000 });
    return false;
  }

  /* -------------------------- for availability day -------------------------- */

  const availabilities = parkingDetailed.availabilities;

  // Get valid days as: ["Monday", "Tuesday", ...]
  const validDays = availabilities.map((availability) => availability.day);

  // Get the day names for start and end times
  const startDay = format(startTime, "EEEE"); // "Monday", "Tuesday", ...
  const endDay = format(endTime, "EEEE");

  /* --------- Get the availability obj for the start day and end day --------- */

  const availabilityForStartDay = availabilities.find(
    (availability) =>
      availability.day.toLowerCase() ===
      startDay.toLowerCase()
  );

  const availabilityForEndDay = availabilities.find(
    (availability) =>
      availability.day.toLowerCase() ===
      endDay.toLowerCase()
  );


  /* ------------ check if the start day and end day are valid ------------ */
  // is the start day valid?
  if (!availabilityForStartDay) {
    toast.error(
      `Start day is not valid. Choose from ${validDays.join(
        ", "
      )}`,
      { autoClose: 20000 }
    );
    return false;
  }

  // is the end day valid?
  if (!availabilityForEndDay) {
    toast.error(
      `End day is not valid. Choose from ${validDays.join(
        ", "
      )}`,
      { autoClose: 20000 }
    );
    return false;
  }


  /* ---------------- for availability times(minutes and hours) --------------- */

  // Combine date and availability times
  const availabilityStartTime = parseISO(
    `${format(startTime, "yyyy-MM-dd")}T${availabilityForStartDay.startTime}`
  );
  const availabilityEndTime = parseISO(
    `${format(endTime, "yyyy-MM-dd")}T${availabilityForEndDay.endTime}`
  );

  // Validate start time
  if (
    isBefore(startTime, availabilityStartTime) ||
    isAfter(startTime, availabilityEndTime)
  ) {
    toast.error(
      `Start time is not valid. Please choose between ${formatTimeTo12Hour(availabilityForStartDay.startTime)} and ${formatTimeTo12Hour(availabilityForStartDay.endTime)}`,
      { autoClose: 20000 }
    );
    return false;
  }

  // Validate end time
  if (
    isBefore(endTime, availabilityStartTime) ||
    isAfter(endTime, availabilityEndTime)
  ) {
    toast.error(
      `End time is not valid. Please choose between ${formatTimeTo12Hour(availabilityForEndDay.startTime)} and ${formatTimeTo12Hour(availabilityForEndDay.endTime)}`,
      { autoClose: 20000 }
    );
    return false;
  }

  return true;
};