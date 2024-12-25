"use client";

import React, { useEffect, useState } from "react";
import Table from "@/components/adminComponents/manageParkingSpots/table";
import { ParkingsTableSkeleton } from "@/components/adminComponents/skeletons";
import axiosInstance from "@/lib/axiosInstance";
import { AdminParkingSpot } from "@/types/definitions";
import Pagination from "@/components/adminComponents/manageParkingSpots/pagination";
import { SearchIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";

const DynamicCreateParkingSpot = dynamic(
  () =>
    import("@/components/adminComponents/manageParkingSpots/buttons").then(
      (mod) => mod.CreateParkingSpot
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg" />
    ),
  }
);

export default function Page() {
  const [parkingSpots, setParkingSpots] = useState<AdminParkingSpot[] | null>(
    null
  );

  const [total, setTotal] = React.useState(0);
  const [next, setNext] = React.useState<string | null>(null);
  const [previous, setPrevious] = React.useState<string | null>(null);
  const limit = 4;

  const fetchData = async (url: string) => {
    const res = await axiosInstance.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    setParkingSpots(res.data.results);
    setNext(res.data.next);
    setPrevious(res.data.previous);
    setTotal(res.data.count);
  };

  useEffect(() => {
    try {
      fetchData(`/admin/parking-spot-app/parking-spots?limit=${limit}`);
    } catch {
      console.log("Error fetching parking spots in admin table");
    }
  }, []);

  const handleSearch = async (query: string) => {
    fetchData(
      `/admin/parking-spot-app/parking-spots?limit=${limit}&search=${query}`
    );
  };

  return (
    <>
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-mont-semibold">Manage Parking Spots</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <Input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Search parking spots.."
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
            <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <DynamicCreateParkingSpot />
        </div>
        {parkingSpots ? (
          <Table data={parkingSpots} />
        ) : (
          <ParkingsTableSkeleton />
        )}
        <div className="mt-5 flex w-full justify-center">
          <Pagination
            title="Total parking spots: "
            next={next}
            previous={previous}
            total={total}
            handlePagination={fetchData}
          />
        </div>
      </div>
    </>
  );
}
