import { Pen, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export function CreateParkingSpot() {
  return (
    <Link
      href="/admin/add-parking"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Add Parking Spot</span>{" "}
      <Plus className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateParkingSpot({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/parking-spots/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <Pen className="w-5" />
    </Link>
  );
}

export function DeleteParkingSpot({ id }: { id: string }) {
  // ----------------------------------------------------------------------
  // FIXME - Fetch data from API
  // server action => export async function deleteInvoice(id: string){}
  // const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  // ----------------------------------------------------------------------
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
