import clsx from "clsx";
import { Clock, UserCheck2Icon } from "lucide-react";

export default function ParkingSpotStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-gray-100 text-gray-500": status === "Occupied",
          "bg-green-500 text-white": status === "Available",
        }
      )}
    >
      {status === "Occupied" ? (
        <>
          Occupied
          <UserCheck2Icon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === "Available" ? (
        <>
          Available
          <Clock className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
