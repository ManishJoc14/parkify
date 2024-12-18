import Image from "next/image";
import { Footprints, Info } from "lucide-react";
import { Star } from "lucide-react";
import { ParkingLocation } from "@/types/definitions";
import { Button } from "../ui/button";
import Link from "next/link";

const ParkingCard = ({ parking }: { parking: ParkingLocation }) => {
  return (
    <div className="relative flex w-full overflow-hidden bg-white rounded-lg hover:shadow-sm transition-all">
      <div className="w-1/3">
        <Image
          src={parking.coverImage}
          alt={parking.name}
          height={144}
          width={144}
          className="h-full w-full object-cover"
        />
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
        <div className="flex items-center justify-between gap-4 mb-2 py-2">
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
        {/* BUTTONS  */}
        <div className="flex justify-between gap-2 pt-2">
          <Button
            variant="outline"
            className="px-2 py-1 text-xs font-mont-medium text-secondary-foreground hover:bg-primary/5 rounded-md transition-colors"
          >
            <Link href={`/parking/${parking.uuid}`}>View details</Link>
          </Button>
          <Button
            variant="default"
            className="px-4 py-2 text-xs font-mont-medium bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Book now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParkingCard;
