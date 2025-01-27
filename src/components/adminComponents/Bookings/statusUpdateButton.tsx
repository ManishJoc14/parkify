"use client";

import { useState } from "react";
import { Booking, BookingStatus } from "@/types/definitions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axiosInstance from "@/lib/axiosInstance";
import { getBookingKey } from "@/lib/utils";
import { useAuth } from "@/context/authContext";

export default function StatusUpdateButton({
  booking,
  fetchBookings,
}: {
  booking: Booking;
  fetchBookings: (url: string) => void;
}) {
  const [status, setStatus] = useState(booking.status);
  const [isLoading, setIsLoading] = useState(false);
  const { handleTokenNotValid } = useAuth();

  const handleStatusChange = async (newStatus: string) => {
    setIsLoading(true);
    try {
      await axiosInstance.put(
        `/admin/parking-spot-app/bookings/${booking.id}/update-status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setStatus(newStatus as BookingStatus);
      fetchBookings("/admin/parking-spot-app/bookings?limit=4");
      // eslint-disable-next-line
    } catch (error: any) {
      console.log("Error updating booking status:", error);
      if (error?.response?.data?.code === "token_not_valid") {
        handleTokenNotValid();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Select
      value={getBookingKey(status)}
      onValueChange={handleStatusChange}
      disabled={isLoading}
    >
      <SelectTrigger className="w-[115px]">
        <SelectValue placeholder="Update to" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(BookingStatus).map((statusOption) => (
          <SelectItem
            key={statusOption}
            value={statusOption as keyof typeof BookingStatus}
          >
            {BookingStatus[statusOption as keyof typeof BookingStatus]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
