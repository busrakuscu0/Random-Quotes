"use client";

import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { addNewQuote } from "./action";
import { Spinner } from "@/components/ui/spinner";
import { CheckCircleIcon } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddNewQuoteState,
  NewQuoteInput,
  NewQuoteSchema,
} from "@/types/quotes";
import QuoteForm from "@/app/QuoteForm";

const initialAddNewQuoteState: AddNewQuoteState = {
  success: false,
};

export default function AddNewQuotePage() {
  const [state, dispatchAction, isPending] = useActionState(
    addNewQuote,
    initialAddNewQuoteState,
  );

  const form = useForm<NewQuoteInput>({
    mode: "onBlur",
    resolver: zodResolver(NewQuoteSchema),
    defaultValues: {
      author: "",
      quote: "",
      category: "" as any,
    },
  });

  const onSubmit = async (data: NewQuoteInput) => {
    const formData = new FormData();
    formData.append("author", data.author);
    formData.append("quote", data.quote);
    formData.append("category", data.category);

    dispatchAction(formData);
  };

  if (isPending)
    return (
      <div className="flex justify-center mt-30 md:mt-60">
        <Button size="lg" disabled>
          <Spinner data-icon="inline-start" />
          Loading...
        </Button>
      </div>
    );

  return (
    <main className="min-h-screen flex-col items-center justify-items-center pt-20">
      {state.success ? (
        <div className="w-full max-w-sm md:max-w-xl p-8 md:p-16 flex flex-col justify-center items-center gap-6 bg-chart-6 text-secondary-foreground border rounded-md">
          <CheckCircleIcon size={32} color="#138b27" />
          <h1 className="text-2xl font-extrabold">Quote Submitted</h1>
          <p className="text-center">
            Thank you for adding a new quote! It's now sent to administrator for
            review.
          </p>
          <Button onClick={() => window.location.reload()}>
            Add Another Quote
          </Button>
        </div>
      ) : (
        <QuoteForm state={state} onSubmit={onSubmit} form={form} />
      )}
      {state.message ? <p className="mt-5 md:mt-10">{state.message}</p> : <></>}
    </main>
  );
}
