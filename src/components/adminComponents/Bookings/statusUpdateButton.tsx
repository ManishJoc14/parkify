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

export default function StatusUpdateButton({ booking }: { booking: Booking }) {
  const [status, setStatus] = useState(booking.status);
  const [isLoading, setIsLoading] = useState(false);

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
    } catch (error) {
      console.error("Error updating booking status:", error);
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
      <SelectTrigger className="w-[145px]">
        <SelectValue placeholder="Update status" />
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
