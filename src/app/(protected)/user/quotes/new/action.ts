"use server";

import { auth0 } from "@/lib/auth0";
import * as z from "zod";
import { AddNewQuoteState, NewQuoteSchema } from "@/types/quotes";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { createQuote, updateUserQuote } from "@/services/quoteService";

export async function addNewQuote(
  _currentState: AddNewQuoteState,
  formData: FormData,
): Promise<AddNewQuoteState> {
  const session = await auth0.getSession();
  const user = session?.user;

  if (!session || !user) {
    return {
      success: false,
      message: "Please log in to add a new quote.",
    };
  }

  const quoteId = String(formData.get("id") ?? "");

  const rawData = {
    author: String(formData.get("author") ?? ""),
    quote: String(formData.get("quote") ?? ""),
    category: String(formData.get("category") ?? ""),
  };

  const validationOutput = NewQuoteSchema.safeParse(rawData);

  if (!validationOutput.success) {
    const validationErrors = z.flattenError(validationOutput.error);

    return {
      success: false,
      errors: validationErrors,
      data: rawData as unknown as z.infer<typeof NewQuoteSchema>,
    };
  } else {
    const now = new Date();

    if (quoteId) {
      if (!ObjectId.isValid(quoteId)) {
        return {
          success: false,
          message: "Invalid quote ID.",
        };
      }
      await updateUserQuote(quoteId, user.sub, {
        quote: validationOutput.data.quote,
        author: validationOutput.data.author,
        category: rawData.category,
        adminApproved: false,
      });
    } else {
      const newQuote = {
        quote: validationOutput.data.quote,
        author: validationOutput.data.author,
        category: rawData.category,
        createdBy: user.sub,
        adminApproved: false,
        createdAt: now,
        updatedAt: now,
      };

      await createQuote(newQuote);
    }

    revalidatePath("/");

    return {
      success: true,
      data: validationOutput.data,
    };
  }
}
