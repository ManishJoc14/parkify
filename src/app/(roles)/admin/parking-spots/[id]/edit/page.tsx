"use client";

import Breadcrumbs from "@/components/adminComponents/manageParkingSpots/breadcrumbs";
import { useParams } from "next/navigation";
import CreateFormSkeleton from "@/components/adminComponents/skeletons";
import dynamic from "next/dynamic";

const DynamicEditParkingSpotForm = dynamic(
  () =>
    import("@/components/adminComponents/manageParkingSpots/edit-form").then(
      (mod) => mod.default
    ),
  {
    ssr: false,
    loading: () => <CreateFormSkeleton />,
  }
);

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
        <DynamicEditParkingSpotForm parkingSpotId={id as string} />
      </div>
    </main>
  );
}
