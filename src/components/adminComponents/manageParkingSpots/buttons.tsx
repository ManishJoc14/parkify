import { Pen, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export function CreateParkingSpot() {
  return (
    <Link
      href="/admin/parking-spots/create"
      className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-mont-medium text-white transition-colors hover:bg-primary/90"
    >
      <span className="hidden md:block">Create Spot</span>{" "}
      <Plus className="h-4" />
    </Link>
  );
}

export function UpdateParkingSpot({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/parking-spots/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <Pen className="w-4" />
    </Link>
  );
}

export function DeleteParkingSpot({ id }: { id: string }) {
  return (
    <>
      <form>
        {/* <form action={deleteInvoiceWithId}> */}
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <p className="hidden">{id}</p>
          <span className="sr-only">Delete</span>
          <Trash2 className="w-4" />
        </button>
      </form>
    </>
  );
}
