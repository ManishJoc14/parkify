import { Car, MapPin, Star } from "lucide-react";
import Image from "next/image";

interface ServiceCardLargeProps {
  image: string;
  title: string;
  distance: string;
  price: string;
  rating: number;
  slots: number;
  location: string;
}

export default function ServiceCardLarge({
  image,
  title,
  distance,
  price,
  rating,
  slots,
  location,
}: ServiceCardLargeProps) {
  return (
    <div className="relative flex flex-col items-start ms-auto me-auto w-full max-w-sm p-2 border bg-white rounded-xl hover:scale-105 transition-all">
      <Image
        src={image}
        alt={title}
        height={176}
        width={176}
        className="h-44 w-full rounded-md object-cover"
      />

      {/* DETAILS */}
      <div className=" pl-2 flex flex-col mt-4 w-full">
        <div className="flex flex-col sm:flex-row sm:gap-2">
          {" "}
          <span className="sm:order-1 text-primary text-xs bg-accent h-6 w-fit px-2 py-1 rounded-lg">
            Rental{" "}
          </span>
          {/* TITLE */}
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
        </div>

        {/* LOCATION and DISTANCE */}
        <p className="flex items-center mt-2 text-nowrap text-sm sm:text-base -ml-1 font-medium text-muted-foreground">
          <MapPin className="text-white fill-primary" />
          {location} | <span className="text-nowrap ml-1">{distance}</span>
        </p>

        <hr className="h-1 w-full my-4 " />

        {/* PRICE and SPOTS and Duration */}
        <div className="text-sm sm:text-base text-gray-500 flex gap-8 items-center h-10 -mt-3">
          <p>
            <span className="text-primary font-semibold">{price}</span>
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
