"use client";

import QuoteForm from "@/app/QuoteForm";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { NewQuoteInput, NewQuoteSchema } from "@/types/quotes";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export default function EditQuoteClient({
  id,
  initialData,
}: {
  id: string;
  initialData: any;
}) {
  const router = useRouter();

  const form = useForm<NewQuoteInput>({
    mode: "onBlur",
    resolver: zodResolver(NewQuoteSchema),
    defaultValues: {
      author: initialData.author,
      quote: initialData.quote,
      category: initialData.category,
    },
  });

  const onSubmit = async (data: NewQuoteInput) => {
    try {
      const response = await fetch(`/api/quotes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Update failed!");

      toast.success("Quote updated successfully!");
      router.push("/");
    } catch (error) {
      toast.error("An error occurred while updating the quote.");
    }
  };

  const dummyState = { errors: null, data: null, success: false };

  return (
    <QuoteForm editId={id} state={dummyState} onSubmit={onSubmit} form={form} />
  );
}
