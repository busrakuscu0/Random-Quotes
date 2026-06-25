"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";

export default async function AddNewQuotePage() {
  const [state, dispatchAction, isPending] = useActionState(reducerAction, initialState, permalink?);

  
  return (
    <main className="min-h-screen flex items-start justify-center pt-20">
      <form className="w-full max-w-md">
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
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="quote">Quote</FieldLabel>
                <Textarea
                  id="quote"
                  placeholder="Add the quote here..."
                  className="resize-none"
                />
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
    </main>
  );
}
