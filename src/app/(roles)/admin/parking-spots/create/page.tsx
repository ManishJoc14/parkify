"use client";

import Breadcrumbs from "@/components/adminComponents/manageParkingSpots/breadcrumbs";
import CreateFormSkeleton from "@/components/adminComponents/skeletons";
import dynamic from "next/dynamic";

const DynamicCreateParkingSpotForm = dynamic(
  () =>
    import("@/components/adminComponents/manageParkingSpots/create-form").then(
      (mod) => mod.default
    ),
  {
    ssr: false,
    loading: () => <CreateFormSkeleton />,
  }
);

export default function CreateParkingPage() {
  const breadcrumbs = [
    { label: "Parking Spots", href: "/admin/parking-spots" },
    { label: "Create", href: "/admin/parking-spots/create", active: true },
  ];
  return (
    <main className="overflow-y-auto">
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className="mt-10">
        <DynamicCreateParkingSpotForm />
      </div>
    </main>
  );
}
