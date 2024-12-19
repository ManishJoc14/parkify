"use client";

import { Fragment, useEffect, useRef, useState } from "react";
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
import type {
  ParkingFeature,
  ParkingLocation,
  OrderingOptions,
  VehicleType,
} from "@/types/definitions";
import { FiltersDialog } from "@/components/parking/filters-dialog";
import ParkingCard from "@/components/parking/parking-card";
import Link from "next/link";
import axiosInstance from "@/lib/axiosInstance";
import ParkingCardSkeleton from "@/components/skeletons/parking-card-skeleton";
import clsx from "clsx";

// Dynamically import the Map component
const Map = dynamic(() => import("@/components/parking/map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg" />
  ),
});

export default function SearchPage() {
  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [parkings, setParkings] = useState<ParkingLocation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userPosition, setUserPosition] = useState<
    [number, number] | undefined
  >(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeFilters, setActiveFilters] = useState<{
    vehicle_type: VehicleType[];
    features: ParkingFeature[];
  }>({
    vehicle_type: [],
    features: [],
  });
  const [ordering, setOrdering] = useState<OrderingOptions>("rate_per_hour");
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault(); // Prevent scrolling the page
        setActiveIndex((prevIndex) =>
          prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
        );
      } else if (e.key === "Enter") {
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          setSearch(suggestions[activeIndex]);
          setSuggestions([]);
        }
      } else if (e.key === "Escape") {
        setSuggestions([]); // Close suggestions
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearch(suggestion);
    setSuggestions([]);
    inputRef.current?.focus();
  };

  // Set user location
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

  useEffect(() => {
    // Fetch suggestions for the search query
    const fetchSuggestions = async () => {
      if (search.trim().length > 0) {
        try {
          const res = await axiosInstance.get(
            `/public/parking-app/search-suggestions?search=${search}`
          );
          setSuggestions(res.data.suggestions || []);
        } catch (error) {
          console.error("Failed to fetch search suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    };

    // Fetch parkings based on user position and search query and filters
    const fetchParkings = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          ...(userPosition && {
            latitude: userPosition[0].toString(),
            longitude: userPosition[1].toString(),
          }),
          ...(search && { search }),
          ...(activeFilters &&
            Object.fromEntries(
              activeFilters.vehicle_type.flatMap((vehicle_type) => [
                ["vehicle_type", vehicle_type],
              ])
            )),
          ...(activeFilters &&
            Object.fromEntries(
              activeFilters.features.flatMap((feature) => [
                ["features", feature],
              ])
            )),
          ...(ordering && { ordering }),
        });

        const res = await axiosInstance.get(
          `/public/parking-app/parking-spots?${queryParams.toString()}`
        );
        setParkings(res.data.results || []);
      } catch (error) {
        console.error("Failed to fetch parking spots:", error);
        setParkings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
    fetchParkings();
  }, [userPosition, search, activeFilters, ordering]);

  console.log(activeFilters);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-1 sm:px-4 pb-6">
        <div className="flex flex-col lg:flex-row gap-1">
          {/* Left Section */}
          <div className="space-y-4 overflow-y-scroll webkit-search h-screen flex-1 order-[2] p-4">
            <div className="rounded-lg mb-1">
              {/* Back to Home */}
              <Link href="/">
                <Button variant="ghost" className="mb-4">
                  <p className="flex items-center gap-2">
                    <ChevronLeft />
                    <span>Back to Home</span>
                  </p>
                </Button>
              </Link>

              {/* Search Input */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-400" />
                <Input
                  ref={inputRef}
                  className="pl-10 h-12"
                  placeholder="Enter location or postcode"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={() => setTimeout(() => setSuggestions([]), 100)}
                />
                <div
                  className={clsx(
                    "absolute z-10 w-full border bg-white space-y-2 shadow-sm rounded-md py-4 px-4",
                    {
                      hidden: suggestions.length === 0,
                      block: suggestions.length > 0,
                    }
                  )}
                  tabIndex={-1}
                >
                  {suggestions.map((suggestion, index) => (
                    <Fragment key={index}>
                      <p
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={clsx(
                          "cursor-pointer text-sm hover:bg-green-100 p-2 rounded-md",
                          {
                            "bg-green-100": index === activeIndex,
                          }
                        )}
                      >
                        <MapPin className="h-4 w-4 inline mr-2" />
                        {suggestion}
                      </p>
                      <hr />
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Filters and Sorting */}
            <div className="flex flex-col gap-1">
              <div className="flex gap-2">
                <FiltersDialog setActiveFilters={setActiveFilters} />
                <Select
                  value={ordering}
                  onValueChange={(value) =>
                    setOrdering(value as OrderingOptions)
                  }
                >
                  <SelectTrigger className="w-[220px] flex-1">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="space-y-2">
                    <SelectGroup>
                      <SelectLabel className="font-mont-bold text-primary">
                        Rate per hour
                      </SelectLabel>
                      <SelectItem value="rate_per_hour">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="-rate_per_hour">
                        Price: High to Low
                      </SelectItem>
                    </SelectGroup>

                    <SelectGroup>
                      <SelectLabel className="font-mont-bold text-primary">
                        Average Rating
                      </SelectLabel>
                      <SelectItem value="average_rating">
                        Ratings: Low to High
                      </SelectItem>
                      <SelectItem value="-average_rating">
                        Ratings: High to Low
                      </SelectItem>
                    </SelectGroup>

                    <SelectGroup>
                      <SelectLabel className="font-mont-bold text-primary">
                        Distance
                      </SelectLabel>
                      <SelectItem value="distance">
                        Distance: Near to Far
                      </SelectItem>
                      <SelectItem value="-distance">
                        Distance: Far to Near
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <h2 className="text-lg font-mont-bold pt-3">
                Available Parking Spots
              </h2>
            </div>

            {/* Parking Cards */}
            <div className="space-y-4 gap-4 overflow-y-hidden">
              {loading ? (
                <>
                  <ParkingCardSkeleton />
                  <ParkingCardSkeleton />
                  <ParkingCardSkeleton />
                </>
              ) : parkings.length > 0 ? (
                parkings.map((parking) => (
                  <ParkingCard key={parking.uuid} parking={parking} />
                ))
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-800">No parking spots available</p>
                </div>
              )}
            </div>
          </div>

          {/* Map Section */}
          <div className="w-full h-full sticky flex-[2] top-4 order-[3] sm:order-[10]">
            <div className="bg-white rounded-lg shadow-sm p-4 h-screen">
              <Map userPosition={userPosition} locations={parkings} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
