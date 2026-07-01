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
import { Quote } from "@/quotes";

export interface AddNewQuoteState {
  success: boolean;
  errors?: any;
  message?: string;
  data?: Partial<Quote>;
}

const initialAddNewQuoteState: AddNewQuoteState = {
  success: false,
};

export default function AddNewQuotePage() {
  const [state, dispatchAction, isPending] = useActionState(
    addNewQuote,
    initialAddNewQuoteState,
  );

  if (isPending) return <p>Loading...</p>;

  return (
    <main className="min-h-screen flex-col items-center justify-items-center pt-20">
      {state.success ? (
        <>
          <h1>
            Thank you for adding a new quote! It's now sent to administrator for
            review.
          </h1>
          <p>Click here to add another quote.</p>
        </>
      ) : (
        <form className="w-full max-w-md" action={dispatchAction}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Create A New Quote</FieldLegend>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="author">Author</FieldLabel>
                  <Input
                    type="text"
                    id="author"
                    name="author"
                    placeholder="Evil Rabbit"
                    aria-describedby="author-error"
                    required
                    aria-invalid={!!state.errors?.fieldErrors?.author}
                    defaultValue={state.data?.author}
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
                </Field>

                <Field>
                  <FieldLabel htmlFor="quote">Quote</FieldLabel>
                  <Textarea
                    id="quote"
                    name="quote"
                    placeholder="Add the quote here..."
                    className="resize-none"
                    aria-describedby="quote-error"
                    required
                    aria-invalid={!!state.errors?.fieldErrors?.quote}
                    defaultValue={state.data?.quote}
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
