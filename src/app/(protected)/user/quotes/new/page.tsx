"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

const initialAddNewQuoteState: AddNewQuoteState = {
  success: false,
};

export default function AddNewQuotePage() {
  const [state, dispatchAction, isPending] = useActionState(
    addNewQuote,
    initialAddNewQuoteState,
  );

  const {
    register,
    formState: { errors: clientSideErrors },
  } = useForm<NewQuoteInput>({
    mode: "onBlur",
    resolver: zodResolver(NewQuoteSchema),
  });

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
        <form
          className="w-full max-w-sm md:max-w-xl p-8 md:p-16 bg-chart-6 border rounded-md"
          action={dispatchAction}
          noValidate
        >
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Create A New Quote</FieldLegend>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="author">Author</FieldLabel>
                  <Input
                    type="text"
                    id="author"
                    placeholder="Evil Rabbit"
                    aria-describedby="author-error"
                    aria-invalid={!!state.errors?.fieldErrors?.author}
                    defaultValue={state.data?.author}
                    {...register("author")}
                  />
                  {state.errors?.fieldErrors?.author && (
                    <FieldError
                      id="author-error"
                      aria-live="polite"
                      errors={state.errors?.fieldErrors?.author}
                    >
                      {state.errors?.fieldErrors?.author}
                    </FieldError>
                  )}
                  {clientSideErrors.author && (
                    <FieldError
                      id="author-error"
                      aria-live="polite"
                      errors={[{ message: clientSideErrors.author.message }]}
                    >
                      {clientSideErrors.author.message}
                    </FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="quote">Quote</FieldLabel>
                  <Textarea
                    id="quote"
                    placeholder="Add the quote here..."
                    aria-describedby="quote-error"
                    aria-invalid={!!state.errors?.fieldErrors?.quote}
                    defaultValue={state.data?.quote}
                    {...register("quote")}
                  />
                  {state.errors?.fieldErrors?.quote && (
                    <FieldError
                      id="quote-error"
                      aria-live="polite"
                      errors={state.errors?.fieldErrors?.quote}
                    >
                      {state.errors?.fieldErrors?.quote}
                    </FieldError>
                  )}
                  {clientSideErrors.quote && (
                    <FieldError
                      id="quote-error"
                      aria-live="polite"
                      errors={[{ message: clientSideErrors.quote.message }]}
                    >
                      {clientSideErrors.quote.message}
                    </FieldError>
                  )}
                </Field>
              </FieldGroup>
            </FieldSet>
            <Field orientation="horizontal">
              <Button type="submit">Create</Button>
              <Button variant="outline" type="reset">
                Clear
              </Button>
            </Field>
          </FieldGroup>
        </form>
      )}

      {state.message ? <p className="mt-5 md:mt-10">{state.message}</p> : <></>}
    </main>
  );
}
