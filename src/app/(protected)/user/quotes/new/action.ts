"use server";

import { auth0 } from "@/lib/auth0";
import { AddNewQuoteState } from "./page";
import * as z from "zod";

const NewQuote = z.object({
  author: z
    .string()
    .trim()
    .min(2, { message: "Author name should be at least 2 characters long." })
    .max(50, {
      message:
        "Author name should be 50 characters long maximum.Please try to shorter name.",
    }),
  quote: z
    .string()
    .trim()
    .min(5, { message: "Quote should be at least 5 characters long." })
    .max(300, {
      message:
        "Quote should be 300 characters long maximum.Please try to shorter quote.",
    }),
});

export async function addNewQuote(
  currentState: AddNewQuoteState,
  formData: FormData,
) {
  const session = await auth0.getSession();

  if (!session) {
    return {
      success: false,
      message: "Please log in to add a new quote.",
    };
  }

  const rawData = {
    author: formData.get("author"),
    quote: formData.get("quote"),
  };

  const validationOutput = NewQuote.safeParse(rawData);
  return {
    success: false,
  };
}
