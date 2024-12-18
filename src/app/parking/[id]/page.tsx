"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, Star, MapPin, Clock, Car } from "lucide-react";
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
} from "@/types/definitions";
import Link from "next/link";

// Mock data for a detailed parking location
const mockDetailedLocation: DetailedParkingLocation = {
  uuid: "b119eb52-fa1e-4780-bbd4-dad0e63981a3",
  name: "GB Parking",
  coverImage:
    "https://img.freepik.com/premium-photo/parking-garage-underground_63253-3690.jpg?ga=GA1.1.491433875.1733571796&semt=ais_hybrid",
  description:
    "Secure and convenient parking in the heart of Kathmandu. Perfect for both short-term and long-term parking needs.",
  address: "Kathmandu, Nepal",
  ratePerHour: "100.00",
  latitude: 81.78,
  longitude: 98.45,
  postcode: "10400",
  ratePerDay: "299.00",
  totalReviews: 45,
  averageRating: 4.5,
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

//FIXME  fetch the parking details using the ID from params
export default function ParkingBookingPage() {
  // const params = useParams();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [vehicleType, setVehicleType] = useState<VehicleType>();

  const parking = mockDetailedLocation;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button variant="outline" className="mb-4">
          <Link href="/parking">
            <p className="flex items-center gap-2">
              <ChevronLeft />
              <span>Back to parking</span>
            </p>
          </Link>
        </Button>

        <div className="grid lg:grid-cols-[2fr,1fr] gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">{parking.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 font-semibold">
                  {parking.averageRating.toFixed(1)}
                </span>
                <span className="ml-1 text-gray-600">
                  ({parking.totalReviews} reviews)
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="ml-1">{parking.address}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {parking.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-video relative rounded-lg overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`${parking.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <p className="text-gray-700 mb-6">{parking.description}</p>

            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="grid grid-cols-2 gap-2 mb-6">
              {parking.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 mr-2 text-emerald-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-semibold mb-4">
              Accepted vehicle types
            </h2>
            <ul className="grid grid-cols-2 gap-2 mb-6">
              {parking.vehicleTypes.map((vehicleType) => (
                <li key={vehicleType} className="flex items-center">
                  <Car className="w-5 h-5 mr-2 text-emerald-500" />
                  {vehicleType}
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Cancellation policy</h2>
            <p className="text-gray-700 mb-6">{parking.cancellationPolicy}</p>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Book this space</CardTitle>
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
                        {parking.vehicleTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license-plate">License Plate</Label>
                    <Input
                      id="license-plate"
                      placeholder="Enter your license plate"
                    />
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Price</span>
                    <span className="text-2xl">£{parking.ratePerHour}/hr</span>
                  </div>
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                    Book Now
                  </Button>
                </form>
              </CardContent>
            </Card>
            <div className="mt-4 text-sm text-gray-600">
              <Clock className="inline-block mr-1 h-4 w-4" />
              {parking.availableSpots} spots available
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
