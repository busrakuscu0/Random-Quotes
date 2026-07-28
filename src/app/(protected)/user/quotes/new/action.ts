"use server";

import { auth0 } from "@/lib/auth0";
import * as z from "zod";
import { AddNewQuoteState, NewQuoteSchema } from "@/types/quotes";
import { Collections, getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";

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
    const db = await getDb();
    const col = db.collection(Collections.quotes);
    const now = new Date();

    if (quoteId) {
      await col.updateOne(
        { _id: new Object(quoteId) },
        {
          $set: {
            quote: validationOutput.data.quote,
            author: validationOutput.data.author,
            category: rawData.category,
            updatedAt: now,
            adminApproved: false,
          },
        },
      );
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

      await col.insertOne(newQuote);
    }

    revalidatePath("/");

    return {
      success: true,
      data: validationOutput.data,
    };
  }
}
