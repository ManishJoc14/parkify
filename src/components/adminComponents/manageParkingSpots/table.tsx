import Image from "next/image";
import {
  UpdateParkingSpot,
  DeleteParkingSpot,
} from "@/components/adminComponents/manageParkingSpots/buttons";

import ParkingSpotStatus from "@/components/adminComponents/manageParkingSpots/status";
import { formatCurrency } from "@/lib/utils";

import { ParkingSpotFormData } from "../addParkingForm/parkingSpotSchema";

export default function ParkingSpotsTable({
  data,
}: {
  data: ParkingSpotFormData[];
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Responsive List View */}
          <div className="md:hidden">
            {data?.map((spot: ParkingSpotFormData) => (
              <div
                key={spot.spotName}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={spot.spotPhotos?.[0] || "/default-image.jpg"}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`Parking spot ${spot.spotName}`}
                      />
                      <p>{spot.spotName}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      Type: {spot.parkingType} | Rate:{" "}
                      {formatCurrency(spot.costPerUnit)}
                    </p>
                  </div>
                  <ParkingSpotStatus
                    status={spot.isAvailable ? "Available" : "Occupied"}
                  />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-sm">Address: {spot.fullAddress}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateParkingSpot id={spot.spotName} />
                    <DeleteParkingSpot id={spot.spotName} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table View */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Parking Spot
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Type
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Rate
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Address
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data?.map((spot) => (
                <tr
                  key={spot.spotName}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={spot.spotPhotos?.[0] || "/default-image.jpg"}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`Parking spot ${spot.spotName}`}
                      />
                      <p>{spot.spotName}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {spot.parkingType}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(spot.costPerUnit)} {spot.rateType}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {spot.fullAddress}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <ParkingSpotStatus
                      status={spot.isAvailable ? "Available" : "Occupied"}
                    />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateParkingSpot id={spot.spotName} />
                      <DeleteParkingSpot id={spot.spotName} />
                    </div>
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
