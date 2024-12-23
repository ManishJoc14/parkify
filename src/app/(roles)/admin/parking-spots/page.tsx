"use client";

import React, { useEffect, useState } from "react";
import Search from "@/components/adminComponents/search";
import Table from "@/components/adminComponents/manageParkingSpots/table";
import { CreateParkingSpot } from "@/components/adminComponents/manageParkingSpots/buttons";
import { ParkingsTableSkeleton } from "@/components/adminComponents/skeletons";
import axiosInstance from "@/lib/axiosInstance";
import { AdminParkingSpot } from "@/types/definitions";
import Pagination from "@/components/adminComponents/manageParkingSpots/pagination";

export default function Page() {
  const [parkingSpots, setParkingSpots] = useState<AdminParkingSpot[] | null>(
    null
  );

  const [total, setTotal] = React.useState(0);
  const [next, setNext] = React.useState<string | null>(null);
  const [previous, setPrevious] = React.useState<string | null>(null);
  const limit = 4;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(
        `/admin/parking-spot-app/parking-spots?limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setParkingSpots(res.data.results);
      setNext(res.data.next);
      setPrevious(res.data.previous);
      setTotal(res.data.count);
    };

    try {
      fetchData();
    } catch {
      console.log("Error fetching parking spots in admin table");
    }
  }, []);

  const handlePagination = async (url: string) => {
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

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Manage Parking Spots</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search parkings..." />
        <CreateParkingSpot />
      </div>
      {parkingSpots ? <Table data={parkingSpots} /> : <ParkingsTableSkeleton />}
      <div className="mt-5 flex w-full justify-center">
        <Pagination
          next={next}
          previous={previous}
          total={total}
          handlePagination={handlePagination}
        />
      </div>
    </div>
  );
}
