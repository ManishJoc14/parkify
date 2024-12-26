import Image from "next/image";
import { Footprints, Info } from "lucide-react";
import { Star } from "lucide-react";
import { ParkingDetailed, ParkingLocation } from "@/types/definitions";
import { Button } from "../ui/button";
import Link from "next/link";

const ParkingCard = ({
  id,
  parking,
}: {
  id: string | undefined;
  parking: ParkingDetailed | ParkingLocation;
}) => {
  return (
    <div className="relative flex flex-col sm:flex-row w-full overflow-hidden bg-white rounded-lg hover:shadow-sm transition-all">
      <div className="w-full sm:w-1/3">
        {parking.coverImage ? (
          <Image
            src={parking.coverImage}
            alt={parking.name}
            height={100}
            width={100}
            className="h-full min-w-[100px] w-full object-cover"
          />
        ) : (
          <div className="h-full min-w-[100px] w-full flex justify-center items-center bg-gray-200">
            {parking?.name
              .split(" ")
              .map((n) => n.charAt(0).toUpperCase())
              .join("")}
          </div>
        )}
      </div>
      <div className="flex-1 p-4">
        {/* header */}
        <div className="flex justify-between">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3 w-3 ${
                  star <= Math.floor(parking.averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
            <span className="text-xs text-gray-600 ml-1">
              {parking.averageRating.toFixed(1)} ({parking.totalReviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex flex-col justify-between items-center">
            <span className="text-sm font-mont-bold">
              £{parking.ratePerHour}
            </span>
          </div>
        </div>

        {/* parking Name and address */}
        <div className=" mb-1 py-1">
          <h3 className="text-sm font-mont-medium ">{parking.name}</h3>
          <p>
            <span className="text-xs">{parking.address}</span>
          </p>
        </div>
        <hr />

        {/* Walking Time & Guaranteed */}
        <div className="flex items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-2">
            <Footprints className="h-3 w-3" />
            <span className="text-xs">
              <span className="font-mont-medium">9</span> miles
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Info className="h-3 w-3" />
            <span className="text-xs font-mont-medium">Guaranteed</span>
          </div>
        </div>

        <hr />
        {/* BUTTON to open detailed page */}
        <div className="flex pt-2">
          <Link
            href={`/parking/${"uuid" in parking ? parking.uuid : id}`}
            className="flex-1"
          >
            <Button
              variant="default"
              className="px-4 py-2 w-full text-xs font-mont-medium bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ParkingCard;
