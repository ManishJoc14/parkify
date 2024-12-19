"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, Star, MapPin, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Input } from "@/components/ui/input";
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
  DetailedParkingLocation,
  VehicleType,
  ParkingFeature,
  ParkingLocation,
} from "@/types/definitions";
import Link from "next/link";
import Map from "@/components/parking/map";

const parkingLocationProps: ParkingLocation = {
  uuid: "b119eb52-fa1e-4780-bbd4-dad0e63981a3",
  name: "GB Parking",
  coverImage:
    "https://img.freepik.com/premium-photo/parking-garage-underground_63253-3690.jpg?ga=GA1.1.491433875.1733571796&semt=ais_hybrid",
  description: "This is gb parking",
  address: "Kathmandu, Nepal",
  ratePerHour: "100.00",
  latitude: 27.6860328,
  longitude: 85.258531,
  postcode: "10400",
  ratePerDay: "299.00",
  totalReviews: 1,
  averageRating: 2.0,
};

// Mock data for a detailed parking location
const extraParkingDetails = {
  description:
    "Secure and convenient parking in the heart of Kathmandu. Perfect for both short-term and long-term parking needs.",
  features: [
    ParkingFeature.CCTV,
    ParkingFeature.SECURITY_LIGHTING,
    ParkingFeature.COVERED,
  ],
  vehicleTypes: [VehicleType.SMALL, VehicleType.MEDIUM, VehicleType.SUV],
  images: [
    "https://img.freepik.com/premium-photo/parking-garage-underground_63253-3690.jpg?ga=GA1.1.491433875.1733571796&semt=ais_hybrid",
    "https://img.freepik.com/premium-photo/group-people-parking-lot_1048944-6810552.jpg?ga=GA1.1.491433875.1733571796&semt=ais_hybrid",
  ],
  availableSpots: 15,
  cancellationPolicy:
    "Free cancellation up to 24 hours before your booking start time",
};

export default function ParkingBookingPage() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [vehicleType, setVehicleType] = useState<VehicleType>();
  const [userPosition, setUserPosition] = useState<
    [number, number] | undefined
  >(undefined);

  const detailedParkingLocationData: DetailedParkingLocation = {
    ...parkingLocationProps,
    ...extraParkingDetails,
  };

  // Get user location
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-8 py-8">
        <Link href="/parking">
          <Button variant="ghost" className="mb-4">
            <p className="flex items-center gap-2">
              <ChevronLeft />
              <span>Back to parking</span>
            </p>
          </Button>
        </Link>

        {/* Map showing the parking location */}
        <div className="h-[65vh] mt-2 mb-4">
          <Map
            userPosition={userPosition}
            locations={[detailedParkingLocationData]}
          />
        </div>

        <div className="grid lg:grid-cols-[2fr,1fr] gap-8">
          <div>
            {/* NAME */}
            <h1 className="text-3xl font-mont-bold mb-4">
              {detailedParkingLocationData.name}
            </h1>

            {/* RATINGS & ADDRESS */}
            <div className="flex justify-between gap-4 mb-4">
              {/* RATINGS */}
              <div
                className="flex justify-between flex-col sm:flex-row "
                aria-label="Star Rating"
              >
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <=
                        Math.floor(detailedParkingLocationData.averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                      aria-label={
                        star <=
                        Math.floor(detailedParkingLocationData.averageRating)
                          ? "Filled Star"
                          : "Empty Star"
                      }
                    />
                  ))}
                </div>
                <span className="ml-1 text-gray-600">
                  ({detailedParkingLocationData.totalReviews} reviews)
                </span>
              </div>

              {/* ADDRESS */}
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="ml-1 font-mont-bold text-gray-500 hover:text-gray-700 transition">
                  {detailedParkingLocationData.address}
                </span>
              </div>
            </div>

            {/* IMAGES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 mb-4">
              {detailedParkingLocationData.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-video relative rounded-lg overflow-hidden hover:scale-105 transition-transform"
                >
                  <Image
                    src={image}
                    alt={`Parking Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-700 mb-6">
              {detailedParkingLocationData.description}
            </p>

            {/* FEATURES AND VEHICLE TYPES DETAILS */}
            <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
              {/* FEATURES */}
              <div>
                <h2 className="text-2xl font-mont-medium mb-4">Features</h2>
                <ul className="grid mb-6">
                  {detailedParkingLocationData.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <span className="mr-2 text-primary" aria-hidden="true">
                        ✔
                      </span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                {/* VEHICLE TYPES */}
                <h2 className="text-2xl font-mont-medium  mb-4">
                  Accepted Vehicle Types
                </h2>
                <ul className="grid mb-6">
                  {detailedParkingLocationData.vehicleTypes.map(
                    (vehicleType) => (
                      <li key={vehicleType} className="flex items-center">
                        <Car className="w-5 h-5 mr-2 text-primary" />
                        <span className="text-gray-700">{vehicleType}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* BOOKING CARD */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-mont-bold">
                  Book This Space
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Entry Time</Label>
                    <DateTimePicker value={startDate} onChange={setStartDate} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">Exit Time</Label>
                    <DateTimePicker value={endDate} onChange={setEndDate} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicle-type">Vehicle Type</Label>
                    <Select
                      value={vehicleType}
                      onValueChange={(value) =>
                        setVehicleType(value as VehicleType)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        {detailedParkingLocationData.vehicleTypes.map(
                          (type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license-plate">License Plate</Label>
                    <Input id="license-plate" placeholder="e.g., ABC-1234" />
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center font-semibold text-gray-800">
                    <span>Total Price</span>
                    <span className="text-2xl text-primary font-mont-bold">
                      £{detailedParkingLocationData.ratePerHour}/hr
                    </span>
                  </div>
                  <Button className="w-full font-mont-bold bg-primary hover:bg-primary/90 transition-colors">
                    Book Now
                  </Button>
                </form>
              </CardContent>
            </Card>
            {/* CANCELLATION POLICY */}
            <div className="mt-4 text-sm  text-gray-600 flex flex-col items-start gap-1">
              <p>{detailedParkingLocationData.cancellationPolicy}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
