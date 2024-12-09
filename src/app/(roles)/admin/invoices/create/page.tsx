import Form from "@/components/adminComponents/invoices/create-form";
import Breadcrumbs from "@/components/adminComponents/invoices/breadcrumbs";
import { Metadata } from "next";
import { customers } from "@/data/seed";

export const metadata: Metadata = {
  title: "Create Invoice",
};

export default async function Page() {
  // const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/admin/invoices" },
          {
            label: "Create Invoice",
            href: "/admin/invoices/create",
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
