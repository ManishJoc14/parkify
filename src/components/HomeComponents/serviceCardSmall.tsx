import { Car, Clock, MapPin, Star } from "lucide-react";
import Image from "next/image";

interface ServiceCardSmallProps {
  image: string;
  title: string;
  distance: string;
  price: string;
  rating: number;
  slots: number;
  location: string;
}

export default function ServiceCardSmall({
  image,
  title,
  distance,
  price,
  rating,
  slots,
  location,
}: ServiceCardSmallProps) {
  return (
    <div className="relative flex flex-col items-start sm:flex-row sm:justify-start w-fit space-x-4 p-2 border bg-white rounded-xl hover:scale-105 transition-all">
      <Image
        src={image}
        alt={title}
        height={144}
        width={144}
        className="h-36 w-full sm:w-36  rounded-md object-cover"
      />

      {/* DETAILS */}
      <div className="pr-12 flex flex-col items-start mt-4">
        <span className="text-primary text-xs bg-accent px-2 py-1 rounded-lg">
          Rental{" "}
        </span>

        {/* TITLE */}
        <h3 className="text-lg font-semibold mb-1">{title}</h3>

        {/* LOCATION and DISTANCE */}
        <p className="flex items-center mt-2 text-nowrap text-sm sm:text-md -ml-1 font-medium text-muted-foreground">
          <MapPin className="text-white fill-primary" />
          {location} | <span className="text-nowrap ml-1">{distance}</span>
        </p>

        <hr className="h-1 w-full my-2 " />

        {/* PRICE and SPOTS */}
        <div className="text-sm text-gray-500 flex gap-8 items-center h-10 -mt-3">
          <p>
            <span className="text-primary font-semibold text-md">{price}</span>
            /hr
          </p>
          <p className="flex items-center">
            <Car className="text-white fill-primary" />{" "}
            <span className="text-nowrap">{slots} spots</span>
          </p>
        </div>

        {/* STAR */}
        <p className=" absolute top-4 left-4 z-10 flex items-center h-6 text-xs pr-2 font-semibold bg-white rounded-lg text-accent-foreground">
          <Star className="fill-yellow-400 h-4 my-1 text-transparent" />{" "}
          {rating}
        </p>
      </div>
    </div>
  );
}
