import CreateParkingSpotForm from "@/components/adminComponents/manageParkingSpots/create-form";
import Breadcrumbs from "@/components/adminComponents/manageParkingSpots/breadcrumbs";

export default function CreateParkingPage() {
  const breadcrumbs = [
    { label: "Parking Spots", href: "/admin/parking-spots" },
    { label: "Create", href: "/admin/parking-spots/create", active: true },
  ];
  return (
    <main className="overflow-y-auto">
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className="mt-10">
        <CreateParkingSpotForm />
      </div>
    </main>
  );
}
