import { getQuoteById } from "@/services/quoteService";
import EditQuoteClient from "./EditQuoteClient";
import { notFound } from "next/navigation";

export default async function EditQuotePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const quoteToEdit = await getQuoteById(id);

  if (!quoteToEdit) {
    return notFound();
  }

  return (
    <main className="min-h-screen flex-col items-center justify-items-center pt-20">
      <EditQuoteClient id={id} initialData={quoteToEdit} />
    </main>
  );
}
