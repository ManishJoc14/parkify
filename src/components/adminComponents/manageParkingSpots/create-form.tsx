"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { DayOfWeek, ParkingFeature, VehicleType } from "@/types/definitions";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify";
import Image from "next/image";
import { Trash2 } from "lucide-react";

export default function CreateParkingSpotForm() {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null
  );
  const [previewImage, setPreviewImage] = useState<null | string>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ParkingSpotFormData>({
    resolver: zodResolver(parkingSpotSchema),
    defaultValues: {
      name: "",
      address: "",
      postcode: "",
      description: "",
      ratePerHour: "0",
      ratePerDay: "0",
      features: [],
      availabilities: [{ day: "MON", startTime: "", endTime: "" }],
      vehiclesCapacity: [{ vehicleType: "SMALL", capacity: 1 }],
    },
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
          setValue("latitude", latitude);
          setValue("longitude", longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, [setValue]);

  const {
    fields: availabilityFields,
    append: appendAvailability,
    remove: removeAvailability,
  } = useFieldArray({
    control,
    name: "availabilities",
  });

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: "features",
  });

  const {
    fields: vehicleFields,
    append: appendVehicle,
    remove: removeVehicle,
  } = useFieldArray({
    control,
    name: "vehiclesCapacity",
  });

  console.log(errors);
  const onSubmit = async (data: ParkingSpotFormData) => {
    console.log(data);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "coverImage" && value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          Object.entries(item).forEach(([itemKey, itemValue]) => {
            formData.append(
              `${key}[${index}][${itemKey}]`,
              itemValue as string
            );
          });
        });
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      const res = await axiosInstance.post(
        "/admin/parking-spot-app/parking-spots",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (res.status === 201) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error in creating parking spot", error);
      toast.error("Failed to create parking spot");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardContent className="space-y-10 py-8">
          {/* Basic Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-mont-bold">Basic Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="font-mont-medium" htmlFor="name">
                    Name
                  </Label>
                  <Input id="name" {...register("name")} />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="font-mont-medium" htmlFor="address">
                    Address
                  </Label>
                  <Input id="address" {...register("address")} />
                  {errors.address && (
                    <p className="text-red-500 text-sm">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="font-mont-medium" htmlFor="postcode">
                    Postcode
                  </Label>
                  <Input id="postcode" {...register("postcode")} />
                  {errors.postcode && (
                    <p className="text-red-500 text-sm">
                      {errors.postcode.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-mont-medium" htmlFor="coverImage">
                  Cover Image
                </Label>

                {previewImage && (
                  <div className="relative w-full h-48">
                    <Image
                      layout="fill"
                      src={previewImage as string}
                      alt="Cover"
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                )}
                <Input
                  id="coverImage"
                  type="file"
                  accept="image/*,.jpg,.jpeg,.png,.gif"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setValue("coverImage", file);
                      setPreviewImage(URL.createObjectURL(file));
                    }
                  }}
                />
                {errors.coverImage && (
                  <p className="text-red-500 text-sm">
                    {errors.coverImage.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-mont-medium" htmlFor="description">
                Description
              </Label>
              <Textarea
                id="description"
                rows={5}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="font-mont-medium">Location</Label>
              {userPosition ? (
                <p>
                  <span className="font-mont-medium text-sm">Latitude</span>:{" "}
                  {userPosition[0]},{" "}
                  <span className="font-mont-medium text-sm">Longitude</span>:{" "}
                  {userPosition[1]}
                </p>
              ) : (
                <p>Fetching location...</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-mont-bold">Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-mont-medium" htmlFor="ratePerHour">
                  Rate per Hour
                </Label>
                <Input id="ratePerHour" {...register("ratePerHour")} />
                {errors.ratePerHour && (
                  <p className="text-red-500 text-sm">
                    {errors.ratePerHour.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="font-mont-medium" htmlFor="ratePerDay">
                  Rate per Day
                </Label>
                <Input id="ratePerDay" {...register("ratePerDay")} />
                {errors.ratePerDay && (
                  <p className="text-red-500 text-sm">
                    {errors.ratePerDay.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-mont-bold">Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(ParkingFeature).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={featureFields.some((f) => f.feature === key)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        appendFeature({
                          feature: key as keyof typeof ParkingFeature,
                        });
                      } else {
                        const index = featureFields.findIndex(
                          (f) => f.feature === key
                        );
                        if (index !== -1) {
                          removeFeature(index);
                        }
                      }
                    }}
                  />
                  <Label className="font-mont-medium" htmlFor={key}>
                    {value}
                  </Label>
                </div>
              ))}
            </div>
            {errors.features && (
              <p className="text-red-500 text-sm">
                Duplicate features found:
                {errors?.features?.root?.message}
              </p>
            )}
          </div>

          <Separator />

          {/* Availabilities */}
          <div className="space-y-4">
            <h3 className="text-lg font-mont-bold">Availabilities</h3>
            {availabilityFields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
              >
                <div className="space-y-2">
                  <Label
                    className="font-mont-medium"
                    htmlFor={`availabilities.${index}.day`}
                  >
                    Day
                  </Label>
                  <Controller
                    name={`availabilities.${index}.day`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(DayOfWeek).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    className="font-mont-medium"
                    htmlFor={`availabilities.${index}.startTime`}
                  >
                    Start Time
                  </Label>
                  <Input
                    id={`availabilities.${index}.startTime`}
                    type="time"
                    {...register(`availabilities.${index}.startTime`)}
                  />
                  {errors.availabilities && (
                    <p className="text-red-500 text-sm">
                      {errors?.availabilities?.[index]?.startTime?.message ??
                        ""}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    className="font-mont-medium"
                    htmlFor={`availabilities.${index}.endTime`}
                  >
                    End Time
                  </Label>
                  <Input
                    id={`availabilities.${index}.endTime`}
                    type="time"
                    {...register(`availabilities.${index}.endTime`)}
                  />
                  {errors.availabilities && (
                    <p className="text-red-500 text-sm">
                      {errors?.availabilities?.[index]?.endTime?.message ?? ""}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeAvailability(index)}
                    disabled={availabilityFields.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              className="font-mont-medium text-white"
              type="button"
              onClick={() =>
                appendAvailability({
                  day: "MON",
                  startTime: "",
                  endTime: "",
                })
              }
            >
              Add More Availability
            </Button>
            {errors.availabilities && (
              <p className="text-red-500 text-sm">
                {errors?.availabilities?.root?.message}
              </p>
            )}
          </div>

          <Separator />

          {/* Vehicles Capacity */}
          <div className="space-y-4">
            <h3 className="text-lg font-mont-bold">Vehicles Capacity</h3>
            {vehicleFields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
              >
                <div className="space-y-2">
                  <Label
                    className="font-mont-medium"
                    htmlFor={`vehiclesCapacity.${index}.vehicleType`}
                  >
                    Vehicle Type
                  </Label>
                  <Controller
                    name={`vehiclesCapacity.${index}.vehicleType`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(VehicleType).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    className="font-mont-medium"
                    htmlFor={`vehiclesCapacity.${index}.capacity`}
                  >
                    Capacity
                  </Label>
                  <Input
                    id={`vehiclesCapacity.${index}.capacity`}
                    type="number"
                    {...register(`vehiclesCapacity.${index}.capacity`, {
                      valueAsNumber: true,
                    })}
                  />
                  {errors.vehiclesCapacity && (
                    <p className="text-red-500 text-sm">
                      {errors?.vehiclesCapacity?.[index]?.capacity?.message ??
                        ""}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeVehicle(index)}
                    disabled={vehicleFields.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              className="font-mont-medium text-white"
              type="button"
              onClick={() => {
                appendVehicle({
                  vehicleType: "SMALL",
                  capacity: 1,
                });
              }}
            >
              Add More Vehicle Capacity
            </Button>
            {errors?.vehiclesCapacity && (
              <p className="text-red-500 text-sm">
                {errors?.vehiclesCapacity?.root?.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="font-mont-medium text-white" type="submit" size="lg">
          Submit
        </Button>
      </div>
    </form>
  );
}
