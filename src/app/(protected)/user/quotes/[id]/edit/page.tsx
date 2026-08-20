import { notFound } from "next/navigation";
import EditQuoteClient from "../EditQuoteClient";

export default async function EditQuotePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const response = await fetch("/api/quotes");
  const data = await response.json();
  const quoteToEdit = data.quotes.find((q: any) => q._id === id);

  if (!quoteToEdit) {
    return notFound();
  }

  return (
    <main className="min-h-screen flex-col items-center justify-items-center pt-20">
      <EditQuoteClient id={id} initialData={quoteToEdit} />
    </main>
  );
}
