import * as z from "zod";

export const parkingSpotSchema = z.object({
  spotName: z.string().min(1, "Spot Name/ID is required"),
  parkingType: z.enum(["Open Space", "Covered Garage", "Multi-Level"]),
  fullAddress: z.string().min(1, "Full Address is required"),
  startTime: z.string().min(1, "Start Time is required"),
  endTime: z.string().min(1, "End Time is required"),
  isAvailable: z.boolean(),
  vehiclesAllowed: z
    .array(z.enum(["Car", "Bike", "Truck"]))
    .min(1, "Select at least one vehicle type"),
  amenities: z
    .array(z.enum(["Covered", "EvCharging", "Lighting", "CctvCameras"]))
    .min(1, "Select at least one amenity"),
  costPerUnit: z.number().min(0, "Cost must be a positive number"),
  rateType: z.enum(["per hour", "per day", "per month"]),
  spotPhotos: z.array(z.string()).optional(),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
});

export type ParkingSpotFormData = z.infer<typeof parkingSpotSchema>;
