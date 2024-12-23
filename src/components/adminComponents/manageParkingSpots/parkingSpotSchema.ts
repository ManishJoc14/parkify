import { DayOfWeek, ParkingFeature, VehicleType } from "@/types/definitions";
import * as z from "zod";

export const parkingSpotSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be at most 255 characters"),
  coverImage: z
    .union([
      z.instanceof(File),
      z.string().url("Invalid URL for cover image"),
      z.null(),
    ])
    .optional(),
  address: z
    .string()
    .min(1, "Address is required")
    .max(500, "Address must be at most 500 characters"),
  postcode: z
    .string()
    .min(1, "Postcode is required")
    .max(20, "Postcode must be at most 20 characters"),
  description: z.string().min(1, "Description is required"),
  latitude: z.number(),
  longitude: z.number(),
  ratePerHour: z
    .string()
    .regex(/^-?\d{0,8}(?:\.\d{0,2})?$/, "Invalid rate per hour format"),
  ratePerDay: z
    .string()
    .regex(/^-?\d{0,8}(?:\.\d{0,2})?$/, "Invalid rate per day format"),
  availabilities: z
    .array(
      z.object({
        id: z.number().optional(),
        day: z.enum(Object.keys(DayOfWeek) as [keyof typeof DayOfWeek]),
        startTime: z.string().min(1, "Start time is required"),
        endTime: z.string().min(1, "End time is required"),
      })
    )
    .superRefine((availabilities, ctx) => {
      const days = availabilities.map((a) => a.day);
      const uniqueDays = new Set(days);

      if (uniqueDays.size !== days.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Duplicate days found in availabilities",
        });
      }
    }),
  features: z
    .array(
      z.object({
        id: z.number().optional(),
        feature: z.enum(
          Object.keys(ParkingFeature) as [keyof typeof ParkingFeature]
        ),
      })
    )
    .superRefine((features, ctx) => {
      const featureTypes = features.map((f) => f.feature);
      const uniqueFeatures = new Set(featureTypes);
      if (uniqueFeatures.size !== featureTypes.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Duplicate features found",
        });
      }
    }),
  vehiclesCapacity: z
    .array(
      z.object({
        id: z.number().optional(),
        vehicleType: z.enum(
          Object.keys(VehicleType) as [keyof typeof VehicleType]
        ),
        capacity: z.number().min(1, "Capacity must be at least 1"),
      })
    )
    .superRefine((vehiclesCapacity, ctx) => {
      const vehicleTypes = vehiclesCapacity.map((v) => v.vehicleType);
      const uniqueVehicleTypes = new Set(vehicleTypes);
      if (uniqueVehicleTypes.size !== vehicleTypes.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Duplicate vehicle types found",
        });
      }
    }),
});

export type ParkingSpotFormData = z.infer<typeof parkingSpotSchema>;
