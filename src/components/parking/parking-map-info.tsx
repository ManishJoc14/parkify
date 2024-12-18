import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ParkingLocation } from "@/types/definitions";
import Link from "next/link";

interface ParkingCardProps {
  location: ParkingLocation;
}

export function ParkingMapInfoCard({ location }: ParkingCardProps) {
  return (
    <div className="flex flex-col border rounded-lg overflow-hidden bg-white">
      <div className="w-full relative">
        <Image
          src={location.coverImage}
          alt={location.name}
          width={200}
          height={200}
          className="object-cover h-full w-full"
        />
      </div>
      <div className="w-full p-4 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center gap-1 text-yellow-400 mb-1">
              <Star className="fill-current h-4 w-4" />
              <span className="text-sm font-medium text-gray-900">
                {location.averageRating.toFixed(1)} ({location.totalReviews})
              </span>
            </div>
            <h3 className="text-lg font-semibold">{location.name}</h3>
            <p className="text-sm text-gray-600">{location.address}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">
              £{parseFloat(location.ratePerHour).toFixed(2)}/hr
            </p>
            <p className="text-sm text-gray-600">
              £{parseFloat(location.ratePerDay).toFixed(2)}/day
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">{location.description}</p>
        <div className="flex gap-3 mt-auto">
          <Button variant="outline" className="w-1/2">
            <Link href={`/parking/${location.name}`}>View details</Link>
          </Button>
          <Button className="w-1/2 bg-emerald-500 hover:bg-emerald-600">
            Book now
          </Button>
        </div>
      </div>
    </div>
  );
}
