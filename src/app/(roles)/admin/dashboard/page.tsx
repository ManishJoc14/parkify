import CardWrapper from "@/components/adminComponents/dashboard/cards";
import RevenueChart from "@/components/adminComponents/dashboard/revenue-chart";
import LatestInvoices from "@/components/adminComponents/dashboard/latest-invoices";

import { Suspense } from "react";
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from "@/components/adminComponents/skeletons";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  return (
    <main>
      <h1 className=" mb-4 text-xl md:text-2xl">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>{await CardWrapper()}</Suspense>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          {await RevenueChart()}
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          {await LatestInvoices()}
        </Suspense>
      </div>
    </main>
  );
}
