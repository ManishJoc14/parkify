import { VehicleType } from "@/types/definitions";
import * as z from "zod";

export const bookingFormSchema = z.object({
  parkingSpot: z.number(),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  amount: z
    .string()
    .regex(/^-?\d{0,8}(?:\.\d{0,2})?$/, "Invalid amount format"),
  vehicleNo: z.string().min(1, "Vehicle number is required"),
  vehicle: z.enum(Object.keys(VehicleType) as [keyof typeof VehicleType]),
});

export type BookingFormSchema = z.infer<typeof bookingFormSchema>;
