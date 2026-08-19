"use client";

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
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";

export default function QuoteForm({ editId, state, onSubmit, form }: any) {
  const {
    register,
    control,
    trigger,
    reset,
    handleSubmit,
    formState: { errors: clientSideErrors },
  } = form;

  return (
    <form
      className="w-full max-w-sm md:max-w-xl p-8 md:p-16 bg-chart-6 border rounded-md"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <input type="hidden" value={editId || ""} {...register("quoteId")} />
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
              <Controller
                control={control}
                name="category"
                defaultValue={state.data?.category}
                render={({ field }) => (
                  <Select
                    name="category"
                    value={field.value}
                    key={field.value}
                    onValueChange={(value: any) => {
                      field.onChange(value);
                      trigger("category");
                    }}
                    onOpenChange={(open: any) => {
                      if (!open) {
                        trigger("category");
                      }
                    }}
                  >
                    <SelectTrigger
                      id="category"
                      aria-describedby="category-error"
                      aria-invalid={
                        !!state.errors?.fieldErrors?.category ||
                        !!clientSideErrors.category
                      }
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
                )}
              />

              {(clientSideErrors.category ||
                state.errors?.fieldErrors?.category) && (
                <FieldError
                  id="category-error"
                  aria-live="polite"
                  errors={
                    clientSideErrors.category
                      ? [{ message: clientSideErrors.category.message }]
                      : state.errors?.fieldErrors?.category
                  }
                >
                  {clientSideErrors.category?.message ||
                    state.errors?.fieldErrors?.category}
                </FieldError>
              )}
            </Field>
          </FieldGroup>
        </FieldSet>
        <Field orientation="horizontal">
          <Button type="submit">{editId ? "Update" : "Create"}</Button>
          <Button variant="outline" type="button" onClick={() => reset()}>
            Clear
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
