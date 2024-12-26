import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createCanvas } from "canvas";

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

export const calculateAmount = (
  parkingDetailed: ParkingDetailed,
  start: string,
  end: string
) => {
  if (start && end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const hours = Math.max(
      0,
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)
    );
    if (hours <= 24) {
      return (hours * parseFloat(parkingDetailed.ratePerHour))
        .toFixed(2)
        .toString();
    } else {
      let calculateAmount =
        parseFloat(parkingDetailed.ratePerDay) * (hours / 24);
      const remainingHours = hours % 24;
      if (remainingHours > 0) {
        calculateAmount +=
          remainingHours * parseFloat(parkingDetailed.ratePerHour);
      }
      return calculateAmount.toFixed(2).toString();
    }
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
): string {
  // Destructure the response
  const { bookingNo, startTime, endTime, status, paymentStatus } = response;

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
  ctx.fillText(`Start Time: ${new Date(startTime).toLocaleString()}`, 30, 220); // Start time
  ctx.fillText(`End Time: ${new Date(endTime).toLocaleString()}`, 30, 260); // End time
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
}

// export const isValidTime = (
//   start: string,
//   end: string,
//   parkingDetailed: ParkingDetailed
// ) => {
//   const startTime = new Date(start);
//   const endTime = new Date(end);

//   if (endTime <= startTime) {
//     toast.error("End time must be after start time", { autoClose: 4000 });
//     return false;
//   }

//   const availabilities = parkingDetailed.availabilities;
//   const validDays = availabilities.map((availability) => availability.day);
//   // Example- [{day: 'Monday', startTime: '08:00:00', endTime: '20:00:00'}]

//   const dayOfWeek = startTime.toLocaleDateString("en-US", {
//     weekday: "long",
//   }); // Example- 'Monday'

//   const availabilityForDay = availabilities.find(
//     (availability) => availability.day.toLowerCase() === dayOfWeek.toLowerCase()
//   );

//   if (!availabilityForDay) {
//     toast.error(
//       `Parking is not available on this day (${dayOfWeek}) choose from ${validDays.join(
//         ", "
//       )}`,
//       { autoClose: 20000 }
//     );
//     return false;
//   }

//   // Example- "2024-12-23T18:38:13.699Z".split("T")[1].slice(0,8) // '18:38:13'
//   const startTimeString = start.split("T")[1].slice(0, 8);
//   const endTimeString = end.split("T")[1].slice(0, 8);

//   const isStartTimeValid =
//     startTimeString >= availabilityForDay.startTime &&
//     startTimeString <= availabilityForDay.endTime;

//   if (!isStartTimeValid) {
//     toast.error(
//       `Start time is not valid please choose between ${availabilityForDay.startTime} and ${availabilityForDay.endTime}`,
//       { autoClose: 20000 }
//     );
//     return false;
//   }

//   const isEndTimeValid =
//     endTimeString >= availabilityForDay.startTime &&
//     endTimeString <= availabilityForDay.endTime;

//   if (!isEndTimeValid) {
//     toast.error(
//       `End time is not valid please choose between ${availabilityForDay.startTime} and ${availabilityForDay.endTime}`,
//       { autoClose: 20000 }
//     );
//     return false;
//   }

//   return true;
// };

export const isValidTime = (
  start: string,
  end: string,
  parkingDetailed: ParkingDetailed
) => {
  const startTime = new Date(start);
  const endTime = new Date(end);

  if (endTime <= startTime) {
    toast.error("End time must be after start time", { autoClose: 4000 });
    return false;
  }

  const availabilities = parkingDetailed.availabilities;
  const validDays = availabilities.map((availability) => availability.day);
  // Example- [{day: 'Monday', startTime: '08:00:00', endTime: '20:00:00'}]

  const dayOfWeek = startTime.toLocaleDateString("en-US", {
    weekday: "long",
  }); // Example- 'Monday'

  const availabilityForDay = availabilities.find(
    (availability) => availability.day.toLowerCase() === dayOfWeek.toLowerCase()
  );

  if (!availabilityForDay) {
    toast.error(
      `Parking is not available on this day (${dayOfWeek}) choose from ${validDays.join(
        ", "
      )}`,
      { autoClose: 20000 }
    );
    return false;
  }

  const availabilityStartTime = new Date(availabilityForDay.startTime);
  const availabilityEndTime = new Date(availabilityForDay.endTime);

  // Set the availability times for the day
  const [
    availabilityStartHours,
    availabilityStartMinutes,
    availabilityStartSeconds,
  ] = availabilityForDay.startTime.split(":").map(Number);
  availabilityStartTime.setHours(
    availabilityStartHours,
    availabilityStartMinutes,
    availabilityStartSeconds
  );

  const [availabilityEndHours, availabilityEndMinutes, availabilityEndSeconds] =
    availabilityForDay.endTime.split(":").map(Number);
  availabilityEndTime.setHours(
    availabilityEndHours,
    availabilityEndMinutes,
    availabilityEndSeconds
  );

  // Adjust for times that go past midnight
  if (availabilityEndTime <= availabilityStartTime) {
    availabilityEndTime.setDate(availabilityEndTime.getDate() + 1);
  }

  // Check if the start time is within the availability
  if (startTime < availabilityStartTime || startTime > availabilityEndTime) {
    toast.error(
      `Start time is not valid. Please choose between ${availabilityForDay.startTime} and ${availabilityForDay.endTime}`,
      { autoClose: 20000 }
    );
    return false;
  }

  // Check if the end time is within the availability
  if (endTime < availabilityStartTime || endTime > availabilityEndTime) {
    toast.error(
      `End time is not valid. Please choose between ${availabilityForDay.startTime} and ${availabilityForDay.endTime}`,
      { autoClose: 20000 }
    );
    return false;
  }

  return true;
};
