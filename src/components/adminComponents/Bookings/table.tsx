import { formatCurrency, formatDateToLocal, getStatusColor } from "@/lib/utils";
import { Booking, VehicleType } from "@/types/definitions";
import StatusUpdateButton from "./statusUpdateButton";

export default function BookingsTable({ data }: { data: Booking[] }) {
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
            {data?.map((booking) => (
              <div
                key={booking.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-mont-medium">
                      Booking No: {booking.bookingNo}
                    </p>
                    <p className="text-sm text-gray-500">
                      Status: {booking.status}
                    </p>
                  </div>
                  <StatusUpdateButton booking={booking} />
                </div>
                <div className="pt-4 text-sm">
                  <p>Start: {formatDateToLocal(booking.startTime)}</p>
                  <p>End: {formatDateToLocal(booking.endTime)}</p>
                  <p>Amount: {formatCurrency(parseFloat(booking.amount))}</p>
                  <p>
                    Vehicle: {booking.vehicleNo} ({booking.vehicle})
                  </p>
                </div>
              </div>
            ))}
          </div>

          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header.key}
                    scope="col"
                    className="px-4 py-5 font-mont-medium whitespace-nowrap sm:pl-6"
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {data?.map((booking) => (
                <tr
                  key={booking.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {booking.bookingNo}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span
                      className={` ${getStatusColor(
                        booking.status
                      )} p-1 rounded-full`}
                    >
                      {booking.status}
                    </span>{" "}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(booking.startTime)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(booking.endTime)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(parseFloat(booking.amount))}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {booking.vehicleNo} (
                    {VehicleType[booking.vehicle as keyof typeof VehicleType]})
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <StatusUpdateButton booking={booking} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
