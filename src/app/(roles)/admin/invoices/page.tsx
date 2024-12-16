import React, { Suspense } from "react";
import Pagination from "@/components/adminComponents/invoices/pagination";
import Search from "@/components/adminComponents/search";
import Table from "@/components/adminComponents/invoices/table";
import { CreateInvoice } from "@/components/adminComponents/invoices/buttons";
import { InvoicesTableSkeleton } from "@/components/adminComponents/skeletons";
import { Metadata } from "next";

// ----------------------------------------------------------------------
// FIXME - Fetch data from API
import { latestInvoices as invoices } from "@/data/invoices";
// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Invoices",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = await searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  // ----------------------------------------------------------------------
  // FIXME - Fetch data from API
  // const totalPages = await fetchInvoicesPages(query);
  const totalPages = 1;
  // ----------------------------------------------------------------------

  // ----------------------------------------------------------------------
  // FIXME - Fetch data from API
  // const invoices = await fetchFilteredInvoices(query, currentPage);
  // ----------------------------------------------------------------------

  

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table data={invoices} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
