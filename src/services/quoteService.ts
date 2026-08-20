import { Collections, getDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import { cache } from "react";

export async function createQuote(quoteData: any) {
  const db = await getDb();

  return await db.collection(Collections.quotes).insertOne(quoteData);
}

export async function updateUserQuote(
  quoteId: string,
  userId: string,
  updateData: any,
) {
  const db = await getDb();

  return await db
    .collection(Collections.quotes)
    .updateOne(
      { _id: new ObjectId(quoteId), createdBy: userId },
      { $set: { ...updateData, updatedAt: new Date() } },
    );
}

export async function deleteUserQuote(quoteId: string, userId: string) {
  const db = await getDb();

  return await db.collection(Collections.quotes).deleteOne({
    _id: new ObjectId(quoteId),
    createdBy: userId,
  });
}

export const getAllQuotes = cache(async () => {
  const db = await getDb();
  const quotes = await db.collection(Collections.quotes).find({}).toArray();

  return quotes.map((quote) => ({
    ...quote,
    _id: quote._id.toString(),
  }));
});

export const getLikedQuotes = cache(async (userId: string) => {
  const db = await getDb();

  const quotes = await db
    .collection(Collections.quotes)
    .find({ likedBy: userId })
    .toArray();

  return quotes.map((quote) => ({
    ...quote,
    _id: quote._id.toString(),
  }));
});

export async function getQuoteById(id: string) {
  const db = await getDb();

  const quote = await db.collection(Collections.quotes).findOne({
    _id: new ObjectId(id),
  });

  if (!quote) return null;

  return {
    ...quote,
    _id: quote._id.toString(),
  };
}

export async function toggleLikeInQuote(quoteId: string, userId: string) {
  const db = await getDb();
  const col = db.collection(Collections.quotes);

  const quote = await col.findOne({ _id: new ObjectId(quoteId) });
  if (!quote) throw new Error("Quote not found");

  const likedBy = quote.likedBy || [];
  const hasLiked = likedBy.includes(userId);

  if (hasLiked) {
    return await col.updateOne(
      { _id: new ObjectId(quoteId) },
      { $pull: { likedBy: userId } as any },
    );
  } else {
    return await col.updateOne(
      { _id: new ObjectId(quoteId) },
      { $addToSet: { likedBy: userId } },
    );
  }
}
