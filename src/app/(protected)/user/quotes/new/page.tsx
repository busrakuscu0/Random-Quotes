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
import { useActionState, useContext, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/types/quotes";
import { useRouter, useSearchParams } from "next/navigation";
import { QuotesContext } from "@/app/QuotesContext";

const initialAddNewQuoteState: AddNewQuoteState = {
  success: false,
};

export default function AddNewQuotePage() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const router = useRouter();

  const { quotes, handleQuoteEdit } = useContext(QuotesContext);

  const [state, dispatchAction, isPending] = useActionState(
    addNewQuote,
    initialAddNewQuoteState,
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors: clientSideErrors },
  } = useForm<NewQuoteInput>({
    mode: "onBlur",
    resolver: zodResolver(NewQuoteSchema),
  });

  useEffect(() => {
    if (editId && quotes.length > 0) {
      const quoteToEdit = quotes.find(
        (q) => q._id === editId || q._id === editId,
      );
      if (quoteToEdit) {
        reset({
          author: quoteToEdit.author,
          quote: quoteToEdit.quote,
          category: quoteToEdit.category,
        });
      }
    }
  }, [editId, quotes, reset]);

  const onSubmit = async (data: NewQuoteInput) => {
    if (editId) {
      handleQuoteEdit(editId, {
        author: data.author,
        quote: data.quote,
        category: data.category,
      });
      router.push("/");
    } else {
      const formData = new FormData();
      formData.append("author", data.author);
      formData.append("quote", data.quote);
      formData.append("category", data.category);

      dispatchAction(formData);
    }
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
        <form
          className="w-full max-w-sm md:max-w-xl p-8 md:p-16 bg-chart-6 border rounded-md"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <input type="hidden" name="id" value={editId || ""} />
          <FieldGroup>
            <FieldSet>
              <FieldLegend>
                {editId ? "Edit Quote" : "Create A New Quote"}
              </FieldLegend>
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

                  {clientSideErrors.author ? (
                    <FieldError
                      id="author-error"
                      aria-live="polite"
                      errors={[{ message: clientSideErrors.author.message }]}
                    >
                      {clientSideErrors.author.message}
                    </FieldError>
                  ) : (
                    state.errors?.fieldErrors?.author && (
                      <FieldError
                        id="author-error"
                        aria-live="polite"
                        errors={state.errors?.fieldErrors?.author}
                      >
                        {state.errors?.fieldErrors?.author}
                      </FieldError>
                    )
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

                  {clientSideErrors.quote ? (
                    <FieldError
                      id="quote-error"
                      aria-live="polite"
                      errors={[{ message: clientSideErrors.quote.message }]}
                    >
                      {clientSideErrors.quote.message}
                    </FieldError>
                  ) : (
                    state.errors?.fieldErrors?.quote && (
                      <FieldError
                        id="quote-error"
                        aria-live="polite"
                        errors={state.errors?.fieldErrors?.quote}
                      >
                        {state.errors?.fieldErrors?.quote}
                      </FieldError>
                    )
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="category">Tag</FieldLabel>
                  <Select name="category" defaultValue={state.data?.category}>
                    <SelectTrigger
                      id="category"
                      aria-describedby="category-error"
                      aria-invalid={!!state.errors?.fieldErrors?.category}
                      {...register("category")}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {state.errors?.fieldErrors?.category && (
                    <FieldError
                      id="category-error"
                      aria-live="polite"
                      errors={state.errors?.fieldErrors?.category}
                    >
                      {state.errors?.fieldErrors?.category}
                    </FieldError>
                  )}
                </Field>
              </FieldGroup>
            </FieldSet>
            <Field orientation="horizontal">
              <Button type="submit">{editId ? "Update" : "Create"}</Button>
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
