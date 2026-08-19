"use client";

import QuoteForm from "@/app/QuoteForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { NewQuoteInput, NewQuoteSchema } from "@/types/quotes";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function EditQuotePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<NewQuoteInput>({
    mode: "onBlur",
    resolver: zodResolver(NewQuoteSchema),
    defaultValues: {
      author: "",
      quote: "",
      category: "" as any,
    },
  });

  useEffect(() => {
    if (!id) return;

    async function fetchQuote() {
      try {
        const response = await fetch("/api/quotes");
        const data = await response.json();
        const quoteToEdit = data.quotes.find((q: any) => q._id === id);

        if (quoteToEdit) {
          form.reset({
            author: quoteToEdit.author,
            quote: quoteToEdit.quote,
            category: quoteToEdit.category,
          });
        }
      } catch (error) {
        toast.error("Failed to load quote data.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchQuote();
  }, [id, form]);

  const onSubmit = async (data: NewQuoteInput) => {
    if (!id) return;

    try {
      const response = await fetch(`/api/quotes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Update failed!");
      }

      toast.success("Quote updated successfully!");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("An error occurred while updating the quote.");
    }
  };

  const dummyState = { errors: null, data: null, success: false };

  if (isLoading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center pt-20">
        <Spinner />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex-col items-center justify-items-center pt-20">
      <QuoteForm
        editId={id}
        state={dummyState}
        onSubmit={onSubmit}
        form={form}
      />
    </main>
  );
}
