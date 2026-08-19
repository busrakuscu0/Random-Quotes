"use server";

import { auth0 } from "@/lib/auth0";
import { toggleLikeInQuote, deleteUserQuote } from "@/services/quoteService";
import { revalidatePath } from "next/cache";

export async function toggleLikeAction(quoteId: string) {
  const session = await auth0.getSession();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  await toggleLikeInQuote(quoteId, session.user.sub);

  revalidatePath("/");
}

export async function deleteQuoteAction(quoteId: string) {
  const session = await auth0.getSession();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const result = await deleteUserQuote(quoteId, session.user.sub);

  if (result.deletedCount === 0) {
    throw new Error("Quote not found or you are not authorized to delete it.");
  }

  revalidatePath("/");
}
