"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ChevronLeft, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockLocations } from "@/data/mock-locations";
import type {
  ParkingFeature,
  SortOption,
  VehicleType,
} from "@/types/definitions";
import { FiltersDialog } from "@/components/parking/filters-dialog";
import ParkingCard from "@/components/parking/parking-card";
import Link from "next/link";

const Map = dynamic(() => import("@/components/parking/map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg" />
  ),
});

export default function SearchPage() {
  const [sort, setSort] = useState<SortOption>("rate_per_hour");
  const [activeFilters, setActiveFilters] = useState<{
    vehicles: VehicleType[];
    features: ParkingFeature[];
  }>({
    vehicles: [],
    features: [],
  });

  console.log(activeFilters);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-1 sm:px-4 pb-6">
        <div className="flex flex-col lg:flex-row gap-1">
          {/* FIXME dont chnage this */}
          <div className="space-y-4 overflow-y-scroll webkit-search h-screen  flex-1 order-[2] p-4">
            <div className=" rounded-lg mb-1">
              {/* SEARCH */}
              <Button variant="ghost" className="mb-4">
                <Link href="/">
                  <p className="flex items-center gap-2">
                    <ChevronLeft />
                    <span>Back to Home</span>
                  </p>
                </Link>
              </Button>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-400" />
                <Input
                  className="pl-10 h-12"
                  placeholder="Enter location"
                  defaultValue="Kathmandu, Nepal"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 ">
              {/* FILTERS */}
              <div className="flex gap-2">
                <FiltersDialog onFiltersChange={setActiveFilters} />

                {/* SORTING */}
                <Select
                  value={sort}
                  onValueChange={(value) => setSort(value as SortOption)}
                >
                  <SelectTrigger className="w-[220px] flex-1">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="space-y-2">
                    <SelectGroup>
                      {/* Rate per hour */}
                      <SelectLabel className="font-mont-bold text-primary">
                        Rate per hour
                      </SelectLabel>
                      <SelectItem value="rate_per_hour">Low to High</SelectItem>
                      <SelectItem value="-rate_per_hour">
                        High to Low
                      </SelectItem>
                    </SelectGroup>

                    <SelectGroup>
                      {/* Average Rating */}
                      <SelectLabel className="font-mont-bold text-primary">
                        Average Rating
                      </SelectLabel>
                      <SelectItem value="average_rating">
                        Low to High
                      </SelectItem>
                      <SelectItem value="-average_rating">
                        High to Low
                      </SelectItem>
                    </SelectGroup>

                    <SelectGroup>
                      {/* Distance */}
                      <SelectLabel className="font-mont-bold text-primary">
                        Distance
                      </SelectLabel>
                      <SelectItem value="distance">Near to Far</SelectItem>
                      <SelectItem value="-distance">Far to Near</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <h2 className="text-lg font-mont-bold pt-3">
                Available Parking Spots
              </h2>
            </div>

            {/* grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 */}
            <div className="space-y-4 gap-4 overflow-y-hidden">
              {/* {mockLocations.map((location) => (
                <ParkingCard key={location.uuid} location={location} />
              ))} */}
              {mockLocations.map((location) => (
                <ParkingCard key={location.uuid} parking={location} />
              ))}
              {mockLocations.map((location) => (
                <ParkingCard key={location.uuid} parking={location} />
              ))}
            </div>
          </div>

          <div className="w-full h-full sticky flex-[2] top-4 order-[3] sm:order-[10]">
            <div className="bg-white rounded-lg shadow-sm p-4 h-screen">
              <Map locations={mockLocations} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
