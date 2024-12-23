"use client";

import EditParkingSpotForm from "@/components/adminComponents/manageParkingSpots/edit-form";
import Breadcrumbs from "@/components/adminComponents/manageParkingSpots/breadcrumbs";
import { useParams } from "next/navigation";

export default function EdiParkingPage() {
  const id = useParams().id;
  const breadcrumbs = [
    { label: "Parking Spots", href: "/admin/parking-spots" },
    { label: "Edit", href: `/admin/parking-spots/${id}/edit`, active: true },
  ];

  return (
    <main className="overflow-y-auto">
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className="mt-10">
        <EditParkingSpotForm parkingSpotId={id as string} />
      </div>
    </main>
  );
}
