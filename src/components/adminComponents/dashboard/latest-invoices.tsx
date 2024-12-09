import clsx from "clsx";
import { CircleArrowUp } from "lucide-react";
import Image from "next/image";

export default async function LatestInvoices() {
  // ----------------------------------------------------------------------
  // FIXME - Fetch data from API
  // const latestInvoices = await fetchLatestInvoices();
  // ----------------------------------------------------------------------

  const latestInvoices = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      amount: "$200.00",
      image_url: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      amount: "$150.00",
      image_url: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Sam Wilson",
      email: "sam.wilson@example.com",
      amount: "$300.00",
      image_url: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      amount: "$250.00",
      image_url: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: 5,
      name: "Bob Brown",
      email: "bob.brown@example.com",
      amount: "$100.00",
      image_url: "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ];
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className=" mb-4 text-xl md:text-2xl">Latest Invoices</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white px-6">
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  "flex flex-row items-center justify-between py-4",
                  {
                    "border-t": i !== 0,
                  }
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p
                  className="truncate text-sm font-medium md:text-base"
                >
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CircleArrowUp className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
