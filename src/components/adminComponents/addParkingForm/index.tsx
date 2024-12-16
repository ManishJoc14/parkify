"use client";

import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useLoadScript } from "@react-google-maps/api";
import { parkingSpotSchema, ParkingSpotFormData } from "./parkingSpotSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// const libraries = ["places"];

export function ParkingSpotForm() {
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  //   libraries: libraries as any,
  // });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ParkingSpotFormData>({
    resolver: zodResolver(parkingSpotSchema),
    defaultValues: {
      isAvailable: false,
      amenities: ["CctvCameras"],
      vehiclesAllowed: ["Car", "Bike"],
      parkingType: "Open Space",
      rateType: "per hour",
    },
  });

  const onFormSubmit = (data: ParkingSpotFormData) => {
    console.log("Form submitted");
    console.log(data);
    // Handle form submission
  };

  const vehicleTypes = ["Car", "Bike", "Truck"] as const;
  const selectedVehicles = useWatch({
    control,
    name: "vehiclesAllowed",
  }) as (typeof vehicleTypes)[number][];

  const amenitiesType = [
    "Covered",
    "EvCharging",
    "Lighting",
    "CctvCameras",
  ] as const;
  const selectedAmenities = useWatch({
    control,
    name: "amenities",
  }) as (typeof amenitiesType)[number][];

  // if (!isLoaded) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <Card>
        <CardContent className="space-y-6 py-8">
          {/* Basic Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="spotName">Spot Name/ID</Label>
                <Input
                  id="spotName"
                  placeholder="Enter spot name or ID"
                  {...register("spotName")}
                />
                {errors.spotName && (
                  <p className="text-red-500 text-sm">
                    {errors.spotName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="parkingType">Parking Type</Label>
                <Controller
                  name="parkingType"
                  control={control}
                  defaultValue="Open Space"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select parking type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Open Space">Open Space</SelectItem>
                        <SelectItem value="Covered Garage">
                          Covered Garage
                        </SelectItem>
                        <SelectItem value="Multi-Level">Multi-Level</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.parkingType && (
                  <p className="text-red-500 text-sm">
                    {errors.parkingType.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullAddress">Full Address</Label>
              <Input
                id="fullAddress"
                placeholder="Enter full address"
                {...register("fullAddress")}
              />
              {errors.fullAddress && (
                <p className="text-red-500 text-sm">
                  {errors.fullAddress.message}
                </p>
              )}
            </div>
          </div>
          
          <Separator />

          {/* Availability */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Availability</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input id="startTime" type="time" {...register("startTime")} />
                {errors.startTime && (
                  <p className="text-red-500 text-sm">
                    {errors.startTime.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input id="endTime" type="time" {...register("endTime")} />
                {errors.endTime && (
                  <p className="text-red-500 text-sm">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Controller
                name="isAvailable"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="covered"
                    checked={field.value as boolean}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="isAvailable">Is Available</Label>
            </div>
          </div>

          <Separator />

          {/* Vehicles Allowed */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Vehicles Allowed</h3>
            <div className="space-y-2">
              <Label>Select Vehicle Types</Label>
              <div className="flex space-x-4">
                {vehicleTypes.map((vehicle) => (
                  <div key={vehicle} className="flex items-center space-x-2">
                    <Controller
                      name="vehiclesAllowed"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id={vehicle}
                          value={vehicle}
                          checked={selectedVehicles.includes(
                            vehicle as "Car" | "Bike" | "Truck"
                          )}
                          onCheckedChange={(isChecked) => {
                            if (isChecked) {
                              field.onChange([...selectedVehicles, vehicle]);
                            } else {
                              field.onChange(
                                selectedVehicles.filter((v) => v !== vehicle)
                              );
                            }
                          }}
                        />
                      )}
                    />
                    <Label htmlFor={vehicle}>{vehicle}</Label>
                  </div>
                ))}
              </div>
              {errors.vehiclesAllowed && (
                <p className="text-red-500 text-sm">
                  {errors.vehiclesAllowed.message}
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Amenities */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Amenities</h3>
            <div className="space-y-2">
              <Label>Select Available Amenities</Label>
              <div className="flex space-x-4">
                {amenitiesType.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Controller
                      name="amenities"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id={amenity}
                          value={amenity}
                          checked={selectedAmenities.includes(
                            amenity as
                              | "Covered"
                              | "EvCharging"
                              | "Lighting"
                              | "CctvCameras"
                          )}
                          onCheckedChange={(isChecked) => {
                            if (isChecked) {
                              field.onChange([...selectedAmenities, amenity]);
                            } else {
                              field.onChange(
                                selectedAmenities.filter((v) => v !== amenity)
                              );
                            }
                          }}
                        />
                      )}
                    />
                    <Label htmlFor={amenity}>{amenity}</Label>
                  </div>
                ))}
              </div>
              {errors.amenities && (
                <p className="text-red-500 text-sm">
                  {errors.amenities.message}
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="costPerUnit">Cost</Label>
                <Input
                  id="costPerUnit"
                  type="number"
                  placeholder="Enter cost"
                  {...register("costPerUnit", { valueAsNumber: true })}
                />
                {errors.costPerUnit && (
                  <p className="text-red-500 text-sm">
                    {errors.costPerUnit.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="rateType">Rate Type</Label>
                <Controller
                  name="rateType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select rate type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="per hour">Per Hour</SelectItem>
                        <SelectItem value="per day">Per Day</SelectItem>
                        <SelectItem value="per month">Per Month</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.rateType && (
                  <p className="text-red-500 text-sm">
                    {errors.rateType.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Spot Photos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Spot Photos</h3>
            <div className="space-y-2">
              <Label htmlFor="spotPhotos">Upload Photos</Label>
              <Controller
                name="spotPhotos"
                control={control}
                render={({ field }) => (
                  <Input
                    id="spotPhotos"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      const fileURLs = files.map((file) =>
                        URL.createObjectURL(file)
                      );
                      field.onChange(fileURLs);
                    }}
                  />
                )}
              />

              {errors.spotPhotos && (
                <p className="text-red-500 text-sm">
                  {errors.spotPhotos.message}
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter phone number"
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" size="lg">
          Submit
        </Button>
      </div>
    </form>
  );
}
