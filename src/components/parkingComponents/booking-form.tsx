import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ParkingDetailed, VehicleType } from "@/types/definitions";
import {
  calculateAmount,
  generateParkingToken,
  getVehicleTypeKey,
  isValidTime,
} from "@/lib/utils";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify";
import Image from "next/image";
import { useAuth } from "@/context/authContext";
import { useParams, useRouter } from "next/navigation";

export interface BookingFormProps {
  id: number;
  parkingDetailed: ParkingDetailed;
}

export default function BookingForm({ id, parkingDetailed }: BookingFormProps) {
  const defaultStartTime = new Date();
  const defaultEndTime = new Date(
    defaultStartTime.getTime() + 2 * 60 * 60 * 1000
  );

  const { user, fetchUser } = useAuth();
  const router = useRouter();
  const { uuid } = useParams();

  const startTimeRef = useRef<HTMLInputElement | null>(null);
  const endTimeRef = useRef<HTMLInputElement | null>(null);

  const [formState, setFormState] = useState({
    parkingSpot: id,
    amount: "0",
    startTime: defaultStartTime.toISOString(),
    endTime: defaultEndTime.toISOString(),
    vehicle: "",
    vehicleNo: "",
  });

  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [tokenImage, setTokenImage] = useState<string | null>(null);

  const openDateTimePicker = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleInputChange = (
    field: string,
    value: Date | string | undefined
  ) => {
    if (!value) return;

    const updatedState = { ...formState, [field]: value };

    // Ensure endTime is always after startTime
    if (field === "startTime" || field === "endTime") {
      updatedState.amount = calculateAmount(
        parkingDetailed,
        updatedState.startTime,
        updatedState.endTime
      ) as string;
    }

    setFormState(updatedState);
  };

  useEffect(() => {
    if (user) return;
    if (
      !(
        localStorage.getItem("accessToken") &&
        localStorage.getItem("refreshToken")
      )
    )
      return;
    fetchUser();
  }, [fetchUser, user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to book a parking spot");
      localStorage.setItem("redirectBackToParking", `/parking/${uuid}`);
      router.push("/login");
      return;
    }

    const isValid = isValidTime(
      formState.startTime.toLocaleString(),
      formState.endTime.toLocaleString(),
      parkingDetailed
    );

    if (!isValid) return;

    try {
      const res = await axiosInstance.post(
        "/public/parking-app/create-booking",
        {
          parkingSpot: formState.parkingSpot,
          amount: formState.amount,
          vehicleNo: formState.vehicleNo,
          vehicle: formState.vehicle,
          startTime: formState.startTime.toLocaleString(),
          endTime: formState.endTime.toLocaleString(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (res.status === 201) {
        toast.success("Parking spot booked successfully");
        const tokenImage = generateParkingToken(
          res.data,
          formState.amount,
          formState.vehicleNo,
          formState.vehicle as VehicleType
        );

        setTokenImage(tokenImage);
        setIsBookingSuccess(true);
      }
    } catch (error) {
      console.log("Error in booking parking spot", error);
      toast.error("Failed to book parking spot");
    }
  };

  return (
    <Card className="sticky mt-6 md:mt-0 top-6">
      <CardHeader className="p-6 pb-0">
        <CardTitle className="text-xl font-mont-bold">
          Book Your Parking
        </CardTitle>
      </CardHeader>
      <hr className="my-4" />
      <CardContent className="px-6 pb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {isBookingSuccess && tokenImage ? (
            <div className="mt-4 text-center">
              <Image
                src={tokenImage}
                height={600}
                width={400}
                alt="Parking Token"
              />
              <Separator className="my-4" />
              <Button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = tokenImage;
                  link.download = `Parking_Token_${formState.parkingSpot}.png`; // File name for the download
                  link.click();
                }}
                className="w-full font-mont-medium text-lg py-6"
              >
                Download Parking Token
              </Button>
            </div>
          ) : (
            <>
              <div onClick={() => openDateTimePicker(startTimeRef)}>
                <Label className="text-md font-mont-medium">Entry Time</Label>
                <input
                  ref={startTimeRef}
                  type="datetime-local"
                  value={formState.startTime.slice(0, 16)}
                  onChange={(e) =>
                    handleInputChange("startTime", e.target.value)
                  }
                  className="mt-1 text-sm block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div onClick={() => openDateTimePicker(endTimeRef)}>
                <Label htmlFor="endTime" className="text-md font-mont-medium">
                  Exit Time
                </Label>
                <input
                  ref={endTimeRef}
                  id="endTime"
                  type="datetime-local"
                  value={formState.endTime.slice(0, 16)}
                  onChange={(e) => handleInputChange("endTime", e.target.value)}
                  className="mt-1 text-sm block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <Label className="text-md font-mont-medium">Vehicle Type</Label>
                <Select
                  onValueChange={(value) => handleInputChange("vehicle", value)}
                  value={formState.vehicle}
                >
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    {parkingDetailed.vehiclesCapacity.map((vehicle) => (
                      <SelectItem
                        key={getVehicleTypeKey(vehicle.vehicleType)}
                        value={getVehicleTypeKey(vehicle.vehicleType) || ""}
                      >
                        {vehicle.vehicleType}
                        {vehicle.capacity > 0
                          ? ` (${vehicle.capacity} available)`
                          : ` (Full)`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-lg mb-2 font-mont-medium">
                  License Plate
                </Label>
                <Input
                  value={formState.vehicleNo}
                  onChange={(e) =>
                    handleInputChange("vehicleNo", e.target.value)
                  }
                  className="mt-1"
                  placeholder="Enter your license plate"
                />
              </div>
              <Separator />
              <div className="flex justify-between items-center text-md font-mont-medium py-2">
                <span>Total Price</span>
                <span className="text-md font-mont-bold">
                  £{formState.amount}
                  <span className="text-primary text-sm"> total</span>
                </span>
              </div>
              <Button
                type="submit"
                className="w-full font-mont-medium text-lg py-6"
              >
                Book Now
              </Button>
            </>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
