"use client";

import React, { useCallback, useEffect, useState } from "react";
import BookingsTable from "@/components/adminComponents/Bookings/table";
import { BookingsTableSkeleton } from "@/components/adminComponents/skeletons";
import axiosInstance from "@/lib/axiosInstance";
import { Booking } from "@/types/definitions";
import Pagination from "@/components/adminComponents/manageParkingSpots/pagination";
import { SearchIcon } from "lucide-react";
import { useAuth } from "@/context/authContext";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [total, setTotal] = useState(0);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const limit = 4;
  const { handleTokenNotValid } = useAuth();

  const fetchBookings = useCallback(async (url: string) => {
    try {
      const res = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setBookings(res.data.results);
      setNext(res.data.next);
      setPrevious(res.data.previous);
      setTotal(res.data.count);
      // eslint-disable-next-line
    } catch (error: any) {
      console.log("Error fetching bookings:", error);
      if (error?.response?.data?.code === "token_not_valid") {
        handleTokenNotValid();
      }
    }
  }, [handleTokenNotValid]);

  useEffect(() => {
    try {
      fetchBookings(`/admin/parking-spot-app/bookings?limit=${limit}`);
    } catch {
      console.log("Error fetching bookings in admin table");
    }
  }, [fetchBookings]);

  const handleSearch = async (query: string) => {
    fetchBookings(
      `/admin/parking-spot-app/bookings?limit=${limit}&search=${query}`
    );
  };

  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <div className="relative flex flex-1 flex-shrink-0">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Search bookings.."
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
          <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      </div>
      {bookings ? (
        <BookingsTable data={bookings} fetchBookings={fetchBookings} />
      ) : (
        <BookingsTableSkeleton />
      )}
      <div className="mt-5 flex w-full justify-center">
        <Pagination
          title="Total bookings: "
          next={next}
          previous={previous}
          total={total}
          handlePagination={fetchBookings}
        />
      </div>
    </div>
  );
}
