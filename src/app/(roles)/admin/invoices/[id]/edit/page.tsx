import Form from "@/components/adminComponents/invoices/edit-form";
import Breadcrumbs from "@/components/adminComponents/invoices/breadcrumbs";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { customers } from "@/data/seed";

import { InvoiceFormData } from "@/data/invoices";

export const metadata: Metadata = {
  title: "Edit Invoice",
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  // FIXME --- fetch invoice by id
  // const [invoice, customers] = await Promise.all([
  //   // fetchInvoiceById(id),
  //   // fetchCustomers(),
  // ]);

  const invoice = InvoiceFormData.find((inv) => inv.customer_id === id);

  if (!invoice) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/admin/invoices" },
          {
            label: "Edit Invoice",
            href: `/admin/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
