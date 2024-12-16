import { ParkingSpotForm } from "@/components/adminComponents/addParkingForm";

export default function AddParking() {
  return (
    <main className="overflow-y-auto">
      <h1 className="mb-4 text-xl md:text-2xl">Add Parking</h1>

      <div className="mt-10">
        <ParkingSpotForm />
      </div>
    </main>
  );
}
