
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ParkingTableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Parking Name and Cover Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
      </td>

      {/* Rate Per Hour */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>

      {/* Rate Per Day */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>

      {/* Address */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>

      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}

export function ParkingsMobileSkeleton() {
  return (
    <div className="animate-pulse mb-2 w-full rounded-md bg-white p-4">
      <div className="flex flex-col items-start gap-2 border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="h-6 w-56 rounded bg-gray-100"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div className="h-6 w-48 rounded bg-gray-100"></div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export function ParkingsTableSkeleton() {
  const headers = [
    { key: "name", label: "Parking Spot" },
    { key: "ratePerHour", label: "Rate/hr" },
    { key: "ratePerDay", label: "Rate/day" },
    { key: "address", label: "Address" },
  ];

  return (
    <div className="animate-pulse mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <ParkingsMobileSkeleton />
            <ParkingsMobileSkeleton />
            <ParkingsMobileSkeleton />
            <ParkingsMobileSkeleton />
            <ParkingsMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header.key}
                    scope="col"
                    className="px-4 py-5 font-medium sm:pl-6"
                  >
                    {header.label}
                  </th>
                ))}
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <ParkingTableRowSkeleton />
              <ParkingTableRowSkeleton />
              <ParkingTableRowSkeleton />
              <ParkingTableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function BookingsMobileSkeleton() {
  return (
    <div className="animate-pulse mb-2 w-full rounded-md bg-white p-4">
      <div className="border-b flex justify-between items-center border-gray-100 pb-8">
        <div className="flex flex-col items-start gap-2">
          <div className="h-6 w-48 rounded bg-gray-100"></div>
          <div className="h-6 w-32 rounded bg-gray-100"></div>
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="h-10 w-32 rounded bg-gray-100"></div>
      </div>
      <div className="flex flex-col w-full items-start gap-1 pt-4">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
        <div className="h-6 w-24 rounded bg-gray-100"></div>
        <div className="h-6 w-20 rounded bg-gray-100"></div>
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </div>
    </div>
  );
}
export function BookingTableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-40 rounded bg-gray-100"></div>
      </td>

      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-20 rounded bg-gray-100"></div>
      </td>

      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-24 rounded bg-gray-100"></div>
      </td>

      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-24 rounded bg-gray-100"></div>
      </td>

      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>

      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>

      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="h-6 w-full rounded bg-gray-100"></div>
      </td>
    </tr>
  );
}

export function BookingsTableSkeleton() {
  const headers = [
    { key: "bookingNo", label: "Booking No" },
    { key: "status", label: "Status" },
    { key: "startTime", label: "Start Time" },
    { key: "endTime", label: "End Time" },
    { key: "amount", label: "Amount" },
    { key: "vehicleNo", label: "Vehicle No" },
    { key: "actions", label: "Actions" },
  ];

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <BookingsMobileSkeleton />
            <BookingsMobileSkeleton />
            <BookingsMobileSkeleton />
            <BookingsMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header.key}
                    scope="col"
                    className="px-4 py-5 font-medium sm:pl-6"
                  >
                    {header.label}
                  </th>
                ))}
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                ></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <BookingTableRowSkeleton />
              <BookingTableRowSkeleton />
              <BookingTableRowSkeleton />
              <BookingTableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function PaginationSkeleton() {
  return (
    <div className="flex items-center my-4 justify-between mx-auto w-full max-w-lg animate-pulse">
      <div className="flex gap-24">
        <div className="h-10 w-24 rounded-md bg-gray-200"></div>
        <div className="h-6 w-40 rounded-md bg-gray-200"></div>
        <div className="h-10 w-20 rounded-md bg-gray-200"></div>
      </div>
    </div>
  );
}


export default function CreateFormSkeleton() {
  return (
    <div className="mt-10">
      <Card>
        <CardContent className="space-y-12 py-8">
          {/* Basic Details */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>

          <hr className="text-gray-200" />

          {/* Location */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-64 w-full" /> {/* Map placeholder */}
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>

          <hr className="text-gray-200" />

          {/* Features */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>

          <hr className="text-gray-200" />

          {/* Availabilities */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex justify-between">
                {[...Array(2)].map((_, j) => (
                  <Skeleton key={j} className="h-10 w-56" />
                ))}
              </div>
            ))}
            <Skeleton className="h-10 w-36" />
          </div>

          <hr className="text-gray-200" />

          {/* Vehicles Capacity */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex justify-between">
                {[...Array(2)].map((_, j) => (
                  <Skeleton key={j} className="h-10 w-56" />
                ))}
              </div>
            ))}
            <Skeleton className="h-10 w-36" />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Skeleton className="h-12 w-36" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
