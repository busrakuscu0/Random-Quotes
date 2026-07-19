"use server";

import { auth0 } from "@/lib/auth0";
import * as z from "zod";
import { AddNewQuoteState, NewQuoteSchema } from "@/types/quotes";

export async function addNewQuote(
  _currentState: AddNewQuoteState,
  formData: FormData,
): Promise<AddNewQuoteState> {
  const session = await auth0.getSession();

  if (!session) {
    return {
      success: false,
      message: "Please log in to add a new quote.",
    };
  }

  const rawData = {
    author: String(formData.get("author") ?? ""),
    quote: String(formData.get("quote") ?? ""),
  };

  const validationOutput = NewQuoteSchema.safeParse(rawData);

  if (!validationOutput.success) {
    const validationErrors = z.flattenError(validationOutput.error);

    return {
      success: false,
      errors: validationErrors,
      data: rawData,
    };
  } else {
    return {
      success: true,
      data: validationOutput.data,
    };
  }
}
