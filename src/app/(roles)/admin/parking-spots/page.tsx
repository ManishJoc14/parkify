import React, { Suspense } from "react";
// import Pagination from "@/components/adminComponents/manageParkingSpots/pagination";
import Search from "@/components/adminComponents/search";
import Table from "@/components/adminComponents/manageParkingSpots/table";
import { CreateParkingSpot } from "@/components/adminComponents/manageParkingSpots/buttons";
import { ParkingsTableSkeleton } from "@/components/adminComponents/skeletons";
import { Metadata } from "next";

// ----------------------------------------------------------------------
// FIXME - Fetch data from API
import { parkingSpots } from "@/data/parkingSpots";
// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Parking spots",
};
// {
//   searchParams,
// }: {
//   searchParams?: {
//     query?: string;
//     page?: string;
//   };
// }
export default async function Page() {
  // const query = (await searchParams?.query) || "";
  // const currentPage = Number(searchParams?.page) || 1;
  // ----------------------------------------------------------------------
  // FIXME - Fetch data from API
  // const totalPages = await fetchInvoicesPages(query);
  // const totalPages = 1;
  // ----------------------------------------------------------------------

  // ----------------------------------------------------------------------
  // FIXME - Fetch data from API
  // const invoices = await fetchFilteredInvoices(query, currentPage);
  // ----------------------------------------------------------------------

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Manage Parking Spots</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search parkings..." />
        <CreateParkingSpot />
      </div>
      {/* key={query + currentPage} */}
      <Suspense fallback={<ParkingsTableSkeleton />}>
        <Table data={parkingSpots} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}
