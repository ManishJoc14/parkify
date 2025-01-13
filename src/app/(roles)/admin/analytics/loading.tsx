import BookingChartsSkeleton from "@/components/adminComponents/analytics/analyticsChartSkeleton";

export default function loading() {
  return (
    <div className="w-full animate-pulse">
      <div className="h-8 w-44 rounded-md bg-gray-100"></div>
      <div className="h-12 w-full rounded-md bg-gray-100 mt-4"></div>
      <BookingChartsSkeleton />
    </div>
  );
}
