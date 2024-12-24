import BookingsPage from "@/components/adminComponents/Bookings/bookingsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  return (
    <main>
      <h1 className="mb-4 text-xl font-mont-medium md:text-2xl">Bookings</h1>
      <BookingsPage />
    </main>
  );
}
