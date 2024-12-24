import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="overflow-y-auto">
      <div className="flex items-center space-x-2 mb-6">
        <Skeleton className="h-4 w-24" />
        <span className="text-gray-200">/</span>
        <Skeleton className="h-4 w-24" />
      </div>
    </main>
  );
}
