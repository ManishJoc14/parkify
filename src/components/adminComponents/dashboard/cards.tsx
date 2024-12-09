import { Banknote, Clock, Users, Inbox } from "lucide-react";

const iconMap = {
  collected: Banknote,
  customers: Users,
  pending: Clock,
  invoices: Inbox,
};

// to load multiple card components in parallel we used CardWrapper
export default async function CardWrapper() {
  // const {
  //   numberOfInvoices,
  //   numberOfCustomers,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  // } = await fetchCardData();

  const numberOfInvoices = 120;
  const numberOfCustomers = 45;
  const totalPaidInvoices = 3000;
  const totalPendingInvoices = 1500;

  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "invoices" | "customers" | "pending" | "collected";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className="
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl"
      >
        {value}
      </p>
    </div>
  );
}
