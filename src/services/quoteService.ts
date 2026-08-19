import { Collections, getDb } from "@/lib/db";
import { Quote } from "@/types/quotes";
import { ObjectId } from "mongodb";

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

export async function getAllQuotes() {
  const db = await getDb();

  return await db.collection<Quote>(Collections.quotes).find({}).toArray();
}

export async function getLikedQuotes(userId: string) {
  const db = await getDb();

  return await db
    .collection(Collections.quotes)
    .find({ likedBy: userId })
    .toArray();
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
