"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, Star, MapPin, Calendar, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  VehicleType,
  ParkingDetailed,
  ParkingFeature,
} from "@/types/definitions";
import Link from "next/link";
import Map from "@/components/parking/map";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";
import { getDayInNumber, timeAgo } from "@/lib/utils";

const GetVehicleTypeIcon = ({ vehicleType }: { vehicleType: VehicleType }) => {
  switch (vehicleType) {
    case VehicleType.SMALL:
      return <p>🚗</p>;
    case VehicleType.MEDIUM:
      return <p>🚙</p>;
    case VehicleType.SUV:
      return <p>🚘</p>;
    case VehicleType.BIKE:
      return <p>🚌</p>;
    case VehicleType.TRUCK:
      return <p>🚛</p>;
    case VehicleType.MINIBUS:
      return <p>🚐</p>;
    case VehicleType.VAN:
      return <p>🚚</p>;
    default:
      return <p>🚗</p>;
  }
};

const GetFeatureTypeIcon = ({
  parkingFeature,
}: {
  parkingFeature: ParkingFeature;
}) => {
  switch (parkingFeature) {
    case ParkingFeature.CCTV:
      return <p>📹</p>;
    case ParkingFeature.EV_CHARGING:
      return <p>🔌</p>;
    case ParkingFeature.SECURITY_LIGHTING:
      return <p>💡</p>;
    case ParkingFeature.HANDICAP_ACCESSIBLE:
      return <p>♿</p>;
    case ParkingFeature.COVERED:
      return <p>🏠</p>;
    case ParkingFeature.GUARDS:
      return <p>👮</p>;
    default:
      <p>✅</p>;
  }
};

export default function ParkingBookingPage() {
  const id = useParams().id;
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [vehicleType, setVehicleType] = useState<VehicleType>();
  const [userPosition, setUserPosition] = useState<
    [number, number] | undefined
  >(undefined);
  const [parkingDetailed, setParkingDetailed] =
    useState<ParkingDetailed | null>(null);

  useEffect(() => {
    async function fetchParkingDetails() {
      try {
        const res = await axiosInstance.get(
          `/public/parking-app/parking-spots/${id}`
        );
        setParkingDetailed(res.data);
      } catch (error) {
        console.error("Error fetching parking details:", error);
      }
    }
    fetchParkingDetails();
  }, [id]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);

  if (!parkingDetailed) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image section START */}
      <div className="relative w-full h-[70vh]">
        <Image
          src={
            parkingDetailed.coverImage ||
            "/placeholder.svg?height=600&width=1200"
          }
          alt={parkingDetailed.name}
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-mont-bold text-white mb-2">
              {parkingDetailed.name}
            </h1>
            <div className="flex items-center text-md text-white">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{parkingDetailed.address}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Cover Image section END */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* BACK BUTTON START */}
        <Link href="/parking">
          <Button variant="ghost" className="mb-8">
            <ChevronLeft className="mr-2 h-5 w-5" />
            Back to parking
          </Button>
        </Link>
        {/* BACK BUTTON END */}

        <div className="grid lg:grid-cols-[1fr,400px] gap-2">
          <ScrollArea className="h-full sm:pr-6">
            <div className="space-y-8">
              <Card className="overflow-hidden">
                <CardHeader className="p-6">
                  <Tabs defaultValue="details">
                    <TabsList className="grid w-full grid-cols-4 mb-6">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="features">Features</TabsTrigger>
                      <TabsTrigger value="availability">
                        Availability
                      </TabsTrigger>
                      <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-2xl font-mont-bold">
                            {parkingDetailed.name}
                          </span>
                          <span className="text-sm inline-flex">
                            <MapPin className="h-4 w-4 mr-2" />
                            {parkingDetailed.address}
                          </span>
                        </div>
                        <span className="font-mont-bold text-lg">
                          £{parkingDetailed.ratePerHour}
                          <span className="text-primary text-sm">/hr</span>
                        </span>
                      </div>
                      <hr className="my-3" />

                      <p className="text-gray-700 text-lg mb-8">
                        {parkingDetailed.description}
                      </p>
                      <h3 className="font-mont-medium text-lg mb-2">
                        Vehicle Capacity
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {parkingDetailed.vehiclesCapacity.map(
                          (vehicle, index) => (
                            <div
                              key={index}
                              className="flex items-center bg-gray-100 hover:bg-gray-200 transition-all rounded-lg p-4"
                            >
                              <GetVehicleTypeIcon
                                vehicleType={vehicle.vehicleType as VehicleType}
                              />
                              <span className="text-sm pl-1">
                                {vehicle.vehicleType} ({vehicle.capacity})
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="features">
                      <div className="grid sm:grid-cols-2 gap-4">
                        {parkingDetailed.features.map((feat, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-gray-100 hover:bg-gray-200 transition-all rounded-lg p-4"
                          >
                            <GetFeatureTypeIcon
                              parkingFeature={feat.feature as ParkingFeature}
                            />
                            <span className="text-sm  pl-1">
                              {feat.feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="availability">
                      <div className="grid sm:grid-cols-2 gap-4">
                        {parkingDetailed.availabilities.map((slot, index) => (
                          <div
                            key={index}
                            className={clsx(
                              "flex flex-col justify-center bg-gray-100 hover:bg-gray-200 transition-all rounded-lg p-4",
                              {
                                "bg-green-300":
                                  getDayInNumber(slot.day) ===
                                  new Date().getDay(),
                              }
                            )}
                          >
                            <div className="flex items-center mt-1">
                              <Calendar className="w-5 h-5 mr-2 text-primary" />
                              <span className="text-lg font-mont-medium">
                                {slot.day}
                              </span>
                            </div>
                            <div className="flex items-center mt-1">
                              <Clock className="w-5 h-5 mr-2 text-gray-500" />
                              <span className="text-gray-600">
                                {slot.startTime} - {slot.endTime}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="reviews">
                      <div className="space-y-4">
                        {/* NOTE - header for reviews  */}
                        {/* <div>
                          <div className="flex flex-col justify-center">
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-5 w-5 ${
                                    star <=
                                    Math.floor(parkingDetailed.averageRating)
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "fill-gray-200 text-gray-200"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <h3>
                            <span className="font-mont-medium">
                              Total Reviews:{" "}
                            </span>
                            {parkingDetailed.totalReviews}
                          </h3>
                          <h3>
                            <span className="font-mont-medium">
                              Average Rating:{" "}
                            </span>
                            {parkingDetailed.averageRating.toFixed(1)}{" "}
                          </h3>
                        </div> 
                        <hr /> */}
                        <div className="flex flex-col gap-4 justify-start">
                          {parkingDetailed.reviews.map((review, index) => (
                            <Card
                              key={review.reviewer.uuid}
                              className="w-full order-2 mx-auto shadow-none border-none relative"
                            >
                              <CardContent className="p-0 z-10 bg-white hover:bg-gray-100 py-2 transition-all relative rounded-lg">
                                <div className="space-y-4">
                                  <div className="flex flex-col gap-2 sm:flex-row items-center space-y-2">
                                    {/* IMAGE */}
                                    <div className="relative h-16 w-16 flex-shrink-0">
                                      <Image
                                        src={
                                          review.reviewer.photo ||
                                          "/placeholder.svg?height=64&width=64"
                                        }
                                        alt={"User"}
                                        fill
                                        className="rounded-full object-cover"
                                      />
                                    </div>

                                    {/* NAME and STARS */}
                                    <div className="ml-2 transition-all">
                                      <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <Star
                                            key={star}
                                            className={`h-5 w-5 ${
                                              star <= Math.floor(review.rating)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "fill-gray-200 text-gray-200"
                                            }`}
                                          />
                                        ))}
                                      </div>
                                      <h3 className="font-mont-medium">
                                        {review.reviewer.fullName ||
                                          "Anonymous"}
                                      </h3>

                                      <p className="text-xs text-gray-400">
                                        {timeAgo(review.createdAt)}
                                      </p>
                                      <p className="text-gray-600 tracking-light mt-2 text-md ">
                                        {review.comments}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                              <hr
                                className={clsx("block mt-4", {
                                  hidden:
                                    parkingDetailed.reviews.length - 1 ===
                                    index,
                                })}
                              />
                            </Card>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardHeader>
                <CardContent className="pt-2 px-6"></CardContent>
              </Card>

              {/* MAP CARD START */}
              <Card>
                <CardContent className="p-0">
                  <div className="h-[70vh]">
                    <Map userPosition={userPosition} />
                  </div>
                </CardContent>
              </Card>
              {/* MAP CARD END */}
            </div>
          </ScrollArea>

          {/* BOOKING FORM  */}
          <div>
            <Card className="sticky mt-6 md:mt-0 top-6">
              <CardHeader className="p-6 pb-0">
                <CardTitle className="text-xl font-mont-bold">
                  Book Your Parking
                </CardTitle>
              </CardHeader>
              <hr className="my-4" />
              <CardContent className="px-6 pb-6">
                <form className="space-y-4">
                  <div>
                    <Label className="text-md font-mont-medium">
                      Entry Time
                    </Label>
                    <DateTimePicker
                      className="mt-1"
                      value={startDate}
                      onChange={setStartDate}
                    />
                  </div>
                  <div>
                    <Label className="text-md font-mont-medium">
                      Exit Time
                    </Label>
                    <DateTimePicker
                      className="mt-1"
                      value={endDate}
                      onChange={setEndDate}
                    />
                  </div>
                  <div>
                    <Label className="text-md font-mont-medium">
                      Vehicle Type
                    </Label>
                    <Select
                      value={vehicleType}
                      onValueChange={(value) =>
                        setVehicleType(value as VehicleType)
                      }
                    >
                      <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        {parkingDetailed.vehiclesCapacity.map(
                          (vehicle, index) => (
                            <SelectItem key={index} value={vehicle.vehicleType}>
                              {vehicle.vehicleType}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-lg mb-2 font-mont-medium">
                      License Plate
                    </Label>
                    <Input
                      className="mt-1"
                      placeholder="Enter your license plate"
                    />
                  </div>
                  <div className="flex items-center space-x-2 pb-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium  font-mont-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the terms and conditions
                    </label>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center text-md font-mont-medium py-2">
                    <span>Total Price</span>
                    <span className="text-md font-mont-bold">
                      £{parkingDetailed.ratePerHour}
                      <span className="text-primary text-sm">/hr</span>
                    </span>
                  </div>
                  <Button
                    type="submit"
                    className="w-full font-mont-medium text-lg py-6"
                  >
                    Book Now
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
