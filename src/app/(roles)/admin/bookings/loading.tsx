import { BookingsTableSkeleton, PaginationSkeleton } from "@/components/adminComponents/skeletons";

export default function loading() {
  return (
    <div className="w-full animate-pulse">
      <div className="h-8 w-44 rounded-md bg-gray-100"></div>
      <div className="h-12 w-full rounded-md bg-gray-100 mt-4"></div>
      <BookingsTableSkeleton />
      <PaginationSkeleton/>
    </div>
  );
}
