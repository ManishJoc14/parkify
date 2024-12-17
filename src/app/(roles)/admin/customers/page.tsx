import { Metadata } from "next";
import Table from "@/components/adminComponents/customers/table";
import { Suspense } from "react";
// import Pagination from "@/components/adminComponents/manageParkingSpots/pagination";
import { fetchedCustomers } from "@/data/invoices";

export const metadata: Metadata = {
  title: "Customers",
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
  // const query = searchParams?.query || "";
  // const currentPage = Number(searchParams?.page) || 1;
  // const { totalPages } = await fetchFilteredCustomers(query, currentPage);
  // const { customers } = await fetchFilteredCustomers(query, currentPage);

  // const totalPages = 4;
  const customers = fetchedCustomers;
  return (
    <>
      <Suspense fallback="loading...">
        <Table data={customers} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </>
  );
}
